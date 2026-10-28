import { Link, useParams } from 'react-router'
import { useGitHubUser } from '../features/profile/useGitHubUser'
import { Button, Skeleton } from '@vsaithal/core-ui'
import { ErrorMessage } from '../components/ErrorMessage'
import { MoveLeft } from 'lucide-react'

export const UserProfilePage = () => {
  const { userName } = useParams()

  const {
    gitHubUserAccount,
    isGitHubUserLoading,
    gitHubUserFetchError,
    isGitHubUserError,
    refetchGitHubUser,
  } = useGitHubUser(userName || null)

  if (isGitHubUserLoading) {
    return (
      <div className="flex flex-col gap-2 items-center py-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="h-4 w-32 mt-2" />
        <Skeleton className="h-4 w-64 mt-4" />
        <Skeleton className="h-4 w-40 mt-2" />
        <Skeleton className="h-4 w-36 mt-2" />
        <Skeleton className="h-4 w-44 mt-4" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="w-40 h-9" />
      </div>
    )
  }

  if (isGitHubUserError && gitHubUserFetchError) {
    return (
      <ErrorMessage
        message={gitHubUserFetchError.message}
        onRetry={
          isRetryable(gitHubUserFetchError.message)
            ? refetchGitHubUser
            : undefined
        }
      />
    )
  }

  if (!gitHubUserAccount)
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No user data available. Please check the username and try again.
      </p>
    )

  return (
    <div className="flex flex-col gap-2 items-center py-4">
      {/* Display user profile information */}
      <h1>{gitHubUserAccount.name ?? gitHubUserAccount.login}'s Profile</h1>

      {/* Avatar */}
      <img
        src={gitHubUserAccount.avatar_url}
        alt={`Avatar for ${gitHubUserAccount.login}`}
        className="h-24 w-24 rounded-full"
      />

      <p>@{gitHubUserAccount.login}</p>

      {/* Bio */}
      {gitHubUserAccount.bio && <p>Bio: {gitHubUserAccount.bio}</p>}

      {/* Location */}
      {gitHubUserAccount.location && (
        <p>Location: {gitHubUserAccount.location}</p>
      )}

      {/* Company */}
      {gitHubUserAccount.company && <p>Company: {gitHubUserAccount.company}</p>}

      {/* External GitHub Profile Link */}

      <a
        href={gitHubUserAccount.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/{gitHubUserAccount.login}
      </a>

      {/* stars */}
      <div className="flex gap-4 mt-4">
        <p> {gitHubUserAccount.public_repos} public repositories</p>
        <p> {gitHubUserAccount.followers} followers</p>
        <p> {gitHubUserAccount.following} following</p>
      </div>

      {/* Back navigation */}
      <Link to="/">
        <Button variant="secondary" size="base">
          <MoveLeft className="mr-2 size-4" />
          Back to search
        </Button>
      </Link>
    </div>
  )
}

const isRetryable = (message: string) => {
  const lower = message.toLowerCase()
  return (
    !lower.includes('not found') &&
    !lower.includes('rate limit') &&
    !lower.includes('authentication failed')
  )
}
