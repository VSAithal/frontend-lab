# GitHub API reference

Base URL: https://api.github.com
Referred to as {{BASE_URL}} throughout this document.
Auth: None required for public data (60 requests/hour limit — see Rate Limiting section below)

---

## Rate Limiting

- Unauthenticated: 60 requests per hour per IP address
- Check remaining: every API response includes the header `X-RateLimit-Remaining`
- When limit is hit: API returns HTTP 403
- Our handling: show a warning banner in the UI when remaining requests drop below 10

---

## Get {{BASE_URL}}/users/:userName

Used on: Profile Page
Example: {{BASE_URL}}/users/VSAithal

Fields we use:

| Field        | Used for                                  | UI component       |
| ------------ | ----------------------------------------- | ------------------ |
| name         | Display name                              | Header title       |
| avatar_url   | Profile picture                           | Image              |
| bio          | Description / current position under name | Sub heading        |
| login        | Username shown in breadcrumb              | Anchor (@VSAithal) |
| location     | User location                             | Sub heading        |
| company      | Company name                              | Sub heading        |
| email        | User email (optional — not always public) | Sub heading        |
| html_url     | Link to user's GitHub account             | Anchor tag         |
| public_repos | Stat count                                | Stat card          |
| followers    | Stat count                                | Stat card          |
| following    | Stat count                                | Stat card          |

---

## GET {{BASE_URL}}/users/:userName/repos

Used on: Repositories table page and Profile page (top repos preview)
Example:{{BASE_URL}}/users/VSAithal/repos?per_page=10&page=1
Main component: Table (headless TanStack Table wrapper from core-ui)

Query params we use:

| Param     | Purpose                    | Example value                       |
| --------- | -------------------------- | ----------------------------------- |
| per_page  | How many repos per page    | 10                                  |
| page      | Which page number to fetch | 1                                   |
| sort      | Sort field                 | pushed, created, updated, full_name |
| direction | Sort direction             | asc, desc                           |

Fields we use:

| Field            | Used for                                          | UI component    |
| ---------------- | ------------------------------------------------- | --------------- |
| name             | Repo name, links to repo detail page              | Text / anchor   |
| description      | Short summary shown under repo name in table      | Text            |
| language         | Primary language                                  | Badge component |
| stargazers_count | Stars column                                      | Text            |
| forks_count      | Forks column                                      | Text            |
| updated_at       | Last updated column (raw: "2026-02-02T15:22:22Z") | Formatted text  |
| visibility       | Public or private                                 | Badge component |
| html_url         | External link to GitHub repo                      | Anchor tag      |

---

## GET {{BASE_URL}}/repos/:userName/:repoName

Used on: Repo detail page
Example: {{BASE_URL}}/repos/VSAithal/core-ui

This page makes four separate API calls in parallel.
Each section below is one call.

<!--
  Quick note on pagination defaults:
  All four endpoints below default to 30 results per page.
  Control with query params:
    - per_page — number of results (max 100)
    - page     — page number to fetch (default 1)
  Example: {{BASE_URL}}/repos/VSAithal/core-ui/commits?per_page=10&page=1
-->

---

### 1. General repo info

Endpoint: {{BASE_URL}}/repos/:userName/:repoName
Example: {{BASE_URL}}/repos/VSAithal/core-ui

Fields we use:

| Field            | Used for                 | UI component |
| ---------------- | ------------------------ | ------------ |
| name             | Repo name in page header | Text         |
| description      | Repo description         | Sub heading  |
| stargazers_count | Stars count              | Badge / stat |
| forks_count      | Forks count              | Badge / stat |

---

### 2. Language breakdown

Endpoint: {{BASE_URL}}/repos/:userName/:repoName/languages
Example: {{BASE_URL}}/repos/VSAithal/core-ui/languages

Description: Returns the languages used in the repo.
Values are bytes of code written in each language — not percentages.
We calculate percentages ourselves.

Response shape (object, not an array):

```json
{
  "TypeScript": 45210,
  "CSS": 8430,
  "HTML": 3200
}
```

Percentage calculation:

```
total = sum of all values
percentage of TypeScript = (45210 / total) * 100
```

UI: Progress bar showing each language as a coloured segment.

---

### 3. Contributors

Endpoint: {{BASE_URL}}/repos/:userName/:repoName/contributors
Example: {{BASE_URL}}/repos/VSAithal/core-ui/contributors

Description: Lists contributors sorted by number of commits, descending.

Fields we use:

| Field         | Used for                              | UI component        |
| ------------- | ------------------------------------- | ------------------- |
| login         | Contributor username                  | Text                |
| avatar_url    | Contributor profile picture           | Image               |
| contributions | Commit count, also used for bar width | Text + progress bar |

---

### 4. Commits

Endpoint: {{BASE_URL}}/repos/:userName/:repoName/commits
Example: {{BASE_URL}}/repos/VSAithal/core-ui/commits

Description: Lists commits to the repository, most recent first.
Uses infinite scroll — we load more commits as the user scrolls down (useInfiniteQuery).

Fields we use:

| Field              | Used for                                           | UI component   |
| ------------------ | -------------------------------------------------- | -------------- |
| commit.message     | Commit title                                       | Text           |
| commit.author.name | Author name                                        | Text           |
| commit.author.date | Date authored                                      | Formatted text |
| author.avatar_url  | Author profile picture (can be null — handle this) | Image          |
| sha                | Commit ID — display first 7 characters only        | Code text      |

Note on sha: the raw value is 40 characters (e.g. "a3f92c1d8e4b...").
Always display only the first 7: `sha.slice(0, 7)` → "a3f92c1"

---

## Compare Page

Used on: Compare page
Reuses: GET {{BASE_URL}}/users/:userName — called twice, in parallel

No new endpoints needed for this page.
Two separate useQuery calls run at the same time, one per username.
This is the parallel queries pattern in React Query (useQueries).

Example:

- User 1: {{BASE_URL}}/users/VSAithal
- User 2: {{BASE_URL}}/users/gaearon
  Both resolve independently. The comparison UI renders once both are complete.
