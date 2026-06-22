# DevInsight — Architecture

Written by: Vidyasagar Aithal
Date: June 2026

---

## 1. What Does This App Do?

DevInsight is a dashboard that lets any developer search and explore
GitHub activity visually. A user can search any GitHub username and
see their profile, repositories, commits, contributors, and language
breakdown — all in one place. Unlike GitHub's own interface, DevInsight
presents this data in an interactive, filterable, and comparable format
designed for quick developer research.

---

## 2. Routes

| Route                           | Page Component  | What it shows                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /                               | HomePage        | Has a search bar to let the user to search by userName to fetch the gitHub profile and navigates to the userProfilePage on a successful gitHub userName found.                                                                                                                                                                                                                                                                                           |
| /user/:userName                 | UserProfilePage | It displays the userDetails such as name, designation, place, repo count, followers count, following and total stars. It also lists the top three repositories with an option to view all repos which would redirect to ReposTablePage.                                                                                                                                                                                                                  |
| /user/:userName/repos           | ReposTablePage  | Lists all the repositories attached to the user with columns such as repo name, language, starts count, forks, last updated and visibility. The list displays the items that could fit the viewport the rest are displayed using pagination. The user can click on page numbers to navigate to next or previous pages also can use previous and next button to navigate between the pages. The user will have the option to filter by name and language. |
| /user/:userName/repos/:repoName | RepoDetailPage  | It displays the detailed analysis of the individual selected repository like a language details, commits, and contributors.                                                                                                                                                                                                                                                                                                                              |
| /compare                        | ComparePage     | Compare two users next to each other                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

## 3. Tech Stack and Why

### React + TypeScript

TypeScript gives us type safety at compile time — while writing code,
the editor catches type mismatches before they become runtime bugs.
For an app that consumes external API data, having typed responses
means every component knows exactly what shape the data has.

### React Router v7 (Declarative mode)

We use Declarative mode — the classic BrowserRouter + Routes + Route
pattern. We chose this over Data mode because we are using React Query
for all data fetching, so we do not need the router to manage loaders.
Framework mode is for server-side rendering, which this app does not need.

### TanStack Query v5

Our app makes 10+ API calls across 5 pages. Managing loading, error,
caching, and retry logic manually with useEffect and useState would
mean 50+ lines of boilerplate repeated in every component. React Query
gives us all of that in a single useQuery hook: automatic caching,
background refetching, deduplication, and retry on failure.

### Zustand

We use Zustand for client-side state (bookmarks, recent searches)
instead of reading and writing localStorage directly. localStorage is
not reactive — saving a bookmark on the Profile page would not
automatically update the nav sidebar because React doesn't know
localStorage changed. Zustand is a reactive store — any component
subscribed to it re-renders automatically when state changes. We use
Zustand's persist middleware to sync to localStorage behind the scenes,
so state survives page refresh without manual read/write code.

### Zod

TypeScript validates our code at compile time but cannot check what
actually arrives from the network at runtime. GitHub's API returns
untyped JSON — if the shape changes unexpectedly, TypeScript would
not catch it. Zod validates the response shape when it arrives and
throws a clear error if it does not match. It also generates our
TypeScript types via z.infer, so we define the data shape once and
get both runtime validation and compile-time type safety from it.

### Vite

We are using vite as the build tool. In development, Vite uses
native ES modules and only transforms files on demand, making the
dev server start near-instantly regardless of project size. Webpack
bundles the entire app upfront, which gets slower as the codebase grows.
For production, Vite uses Rollup for optimised bundling.

## 4. State Management — What Goes Where

### Server State → React Query

Any data that comes from the GitHub API.
We do NOT put API responses in useState or Zustand.

List of queries this app will have:

| queryKey                           | API Endpoint                                           | Used on page                           |
| ---------------------------------- | ------------------------------------------------------ | -------------------------------------- |
| ["User", userName]                 | GET /users/:userName                                   | Profile page                           |
| ["Repos", userName, page]          | GET /users/:userName/repos                             | Repo list                              |
| ["Repo", owner, repoName]          | GET /repos/:owner/:repoName                            | Repo Details                           |
| ["Commits", owner, repoName, page] | GET /repos/:owner/:repoName/commits?per_page=10&page=1 | Commits list in Repo details page      |
| ["Contributors", owner, repoName]  | GET /repos/:owner/:repoName/contributors               | Contributors list in Repo details page |
| ["Languages", owner, repoName]     | GET /repos/:owner/:repoName/languages                  | Langues details in Repo details page   |

### Client State → Zustand

The below table lists local client states, that are persisted in Zustand

| State                | Store              | Persisted to localStorage?  |
| -------------------- | ------------------ | --------------------------- |
| Bookmarked usernames | bookmarkStore      | Yes — survives page refresh |
| Recent searches      | searchHistoryStore | Yes — shown on HomePage     |

### Local Component State → useState

| State            | Component      | Why local and not global                                                    |
| ---------------- | -------------- | --------------------------------------------------------------------------- |
| selectedLanguage | ReposTable     | Only ReposTable needs this. No other page cares which language is selected. |
| repoNameFilter   | ReposTable     | Local search input, scoped to this table only.                              |
| searchInput      | HomePage       | Temporary input before navigation fires. Gone when user leaves the page.    |
| activeTab        | RepoDetailPage | Which tab is active. Only RepoDetailPage cares.                             |
| currentPage      | ReposTable     | Pagination page. Resets when user navigates away — intentional.             |

## 5. Data Flow — How a Page Loads

### Profile Page (/user/:userName)

1. User types "VSAithal" and presses Enter on HomePage
2. useNavigate() fires → URL changes to /user/VSAithal
3. React Router unmounts HomePage, mounts UserProfilePage
4. UserProfilePage reads userName from useParams()
5. useQuery(["User", userName]) fires. React Query checks the cache.
   If no entry exists, fetches the fresh data.
   While fetching, isLoading is true — Skeleton components shown.
6. On success, isLoading becomes false. ProfileCard renders with
   real data — avatar, name, bio, location, stats.
7. useQuery(["Repos", userName]) fires in parallel with step 5.
   While loading, a ReposPreview skeleton shows 3 placeholder rows.
8. On success, top 3 repos render as cards with name, language badge,
   and star count. A "View all repos →" button navigates to
   /user/VSAithal/repos on click.

### Repos Table Page (/user/:userName/repos)

1. Page mounts. React Router reads userName from useParams().
2. currentPage state is initialised to 1 via useState.
3. useQuery(["Repos", userName, currentPage]) fires.
   React Query checks cache — if entry exists for this page, serves it instantly.
   If not, fetches GET /users/:userName/repos?per_page=10&page=1.
   While fetching, isLoading is true — table skeleton shown.
4. On success, 10 repos render in the table with columns:
   name, language, stars, forks, last updated, visibility.
5. User clicks page 2 → currentPage state updates to 2
   → queryKey changes to ["Repos", userName, 2]
   → React Query checks cache for page 2
   → If not cached, fetches page 2 from API
   → Going back to page 1 is instant — already cached.
6. User types in repo name filter → repoNameFilter state updates
   → useMemo refilters the already-fetched list
   → No API call fired — client-side only.
7. User selects a language → selectedLanguage state updates
   → useMemo refilters the same fetched list
   → No API call fired — GitHub API does not support language filtering.

### Repo Detail Page (/user/:userName/repos/:repoName)

1. Page mounts. React Router reads userName and repoName from useParams().
2. Four parallel useQuery calls fire simultaneously:
   - ["Repo", userName, repoName] → GET /repos/:owner/:repoName
   - ["Languages", userName, repoName] → GET /repos/:owner/:repoName/languages
   - ["Commits", userName, repoName, 1] → GET /repos/:owner/:repoName/commits
   - ["Contributors", userName, repoName] → GET /repos/:owner/:repoName/contributors
3. While any query is loading, Skeleton placeholders shown.
4. Repo info (name, description, stars, forks) renders from ["Repo"] query.
5. Language breakdown bar renders from ["Languages"] query.
6. Tabs component renders — default tab is Commits.
7. CommitsList renders from ["Commits"] query.
8. User clicks "Load more" → useInfiniteQuery fetches next page of commits,
   appends to existing list. No loading spinner — existing commits stay visible.
9. User clicks Contributors tab → ContributorsList renders from
   ["Contributors"] query (already cached, no refetch).

### Compare Page (/compare)

1. Page mounts with two empty search inputs.
2. User types first username → firstInput state updates (local useState).
3. User types second username → secondInput state updates (local useState).
4. User clicks Compare → both usernames are set in confirmed state.
5. useQueries([query1, query2]) fires both fetches simultaneously in parallel.
   Each query follows the same pattern as the Profile page fetch.
   React Query checks the cache for each username independently —
   if either was previously visited, it serves from cache instantly.
6. While either query is loading, a skeleton placeholder shown for that card.
7. On success, both ProfileCards render side by side.
   Stats are compared — green highlights the higher value for each metric.
8. If one username does not exist, that card shows an error state
   while the other card renders normally — independent error handling.

## 6. Client-Side vs Server-Side Filtering

Decision rule:

- Does the filter change what the API returns? → Server-side (put in queryKey)
- Does the filter only change how we display already-fetched data? → Client-side (useMemo only)

Applied to this app:

- Language filter → client-side. GitHub API doesn't support it, and
  max 100 repos fits easily in memory.
- Repo name search → client-side. Same reasons.
- Pagination (page number) → server-side. Different pages return
  different data from the API, so page must be in the queryKey.

## 7. QueryKey Design Rules

The queryKey is React Query's cache identifier. If the key is the same,
React Query returns cached data. If the key is different, it fetches fresh data.

**The rule:** Every variable that the queryFn uses to build the URL must
be included in the queryKey.

**Correct example:**
queryKey: ["Repos", userName, page]
queryFn: () => fetch(`/users/${userName}/repos?page=${page}`)
→ When page changes from 1 to 2, the key changes → new fetch fires.
→ Going back to page 1 → key matches cached entry → instant, no spinner.

**Broken example:**
queryKey: ["Repos", userName] ← page not in key
queryFn: () => fetch(`/users/${userName}/repos?page=${page}`)
→ When page changes to 2, key is unchanged → React Query returns
cached page 1 data → user sees wrong data with no indication.

**Client-side filter variables do NOT go in the queryKey:**
queryKey: ["Repos", userName, page] ← selectedLanguage not here
→ Language filter lives in useMemo, not in queryFn.
→ Changing language never triggers a refetch — correct behaviour.

## 8. core-ui Components Needed

| Component | Needed for                            | Build before          |
| --------- | ------------------------------------- | --------------------- |
| Badge     | Language tags, visibility labels      | Week 3 — API layer    |
| Skeleton  | Loading states on Profile page        | Week 4 — Profile page |
| Table     | Repos table with sorting + pagination | Week 5 — Repos table  |
| Select    | Language filter dropdown              | Week 5 — Repos table  |
| Tabs      | Commits/Contributors on Repo Detail   | Week 7 — Repo detail  |

---

## 9. API Authentication Strategy

### Development

The GitHub personal access token is stored in .env.local which is
gitignored and never committed. Vite exposes it via import.meta.env.VITE_GITHUB_TOKEN.
This is safe locally because the file never leaves the developer's machine.

### Production

We do NOT ship the token to the browser. Any variable prefixed with VITE\_
is bundled into the compiled JavaScript output and is visible to anyone
who opens DevTools → Sources on the deployed app.

Decision: ship without a token. GitHub allows 60 requests/hour per IP
address for unauthenticated users. Each visitor has their own independent
quota — one user's usage does not affect another's. For a portfolio demo
this is sufficient.

When the 403 status is returned, the UI shows a clear message:
"GitHub API rate limit reached. Please wait and try again."

Future enhancement: proxy requests through a Vercel serverless function.
The token lives as a server-side environment variable, never in the
browser bundle. This raises the limit to 5,000 requests/hour for the
Vercel server IP (shared across all users).

### Rate Limiting

1. For Unauthenticated users : 60 requests per hour per IP address
2. When limit is hit: API returns HTTP 403
3. show a warning banner in the UI when remaining requests drop below 10

---

## 10. Key Decisions and Why

### Why React Query instead of useEffect + useState?

We use React Query instead of useState + useEffect, since our application makes 10+ API requests throughout multiple pages, we would have to manually handle/introduce loading, error, caching, and retry logics for each of them and we end up creating 50+ boilerplate code everywhere. Since react query handles each one of them gracefully with solid caching and retrying logics makes it as the best choice.

### Why client-side filtering for language, not server-side?

We are handling the filtering logic on the client side rather than server side for the repoList page. Firstly, the gitHub api does not support filtering the reposList by language or repoName, and moreover we are not applying the filtering logic for the whole list but only on the fetched items, which makes it apt to go with client-side filtering.

### Why Zustand for bookmarks instead of localStorage directly?

localStorage is not reactive. If the Profile page writes a bookmark
directly to localStorage, the nav sidebar does not re-render — React
has no way to know localStorage changed. The user would have to
refresh the page to see the update.

Zustand is a reactive store. Any component subscribed to it
re-renders automatically when state changes. Bookmarking on the
Profile page instantly updates the sidebar with no refresh needed.

We also use Zustand's persist middleware to write to localStorage
behind the scenes, so bookmarks survive a page refresh. This gives
us both reactivity (Zustand) and persistence (localStorage), without
writing any manual read/write code.

### Why no token in production?

As a first step, we ship it without the key. GitHub allows 60 requests/hour per IP
address for unauthenticated users. Each visitor has their own independent
quota — one user's usage does not affect another's.

---

## 11. Folder Structure

```
apps/devinsight/src/
├── api/              GitHub API fetch functions (fetchUser, fetchRepos, etc.)
│                     Separated so fetching logic is reused across hooks
│                     without duplication. No React code lives here.
│
├── features/         Feature-sliced structure — each folder owns its
│   ├── profile/      hooks, components, and types for one feature.
│   ├── repos/        Easier to navigate than a flat components folder.
│   └── compare/      All profile-related code is in one place.
│
├── hooks/            Shared custom hooks used across multiple features.
│                     Example: useDebounce (repos filter + compare search).
│                     Feature-specific hooks stay inside their feature folder.
│
├── components/       Shared presentational components with no data fetching.
│                     Example: PageHeader, Breadcrumb, RateLimitBanner.
│                     Distinct from features/ — no useQuery calls here.
│
├── pages/            Route-level components. Thin wrappers only.
│                     Read URL params via useParams() and pass to features.
│                     No business logic — that lives in features/.
│
├── store/            Zustand store definitions.
│   ├── bookmarkStore.ts      Persisted to localStorage via persist middleware.
│   └── searchHistoryStore.ts Persisted to localStorage via persist middleware.
│
└── types/            Shared Zod schemas and inferred TypeScript types.
    └── github.ts     GitHubUser, GitHubRepo, GitHubCommit, etc.
                      Lives here (not colocated) because the same types
                      are used across profile, compare, and bookmarks.
```
