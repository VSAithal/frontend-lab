import { Link, useParams } from 'react-router'
import { useGitHubUser } from '../features/profile/useGitHubUser'
import { Spinner } from '@vsaithal/core-ui'
import { ErrorMessage } from '../components/ErrorMessage'

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
      <div className="flex justify-center py-4">
        <Spinner />
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
    <div>
      {/* Display user profile information */}
      <h1>{gitHubUserAccount.name ?? gitHubUserAccount.login}'s Profile</h1>

      {/* Avatar */}
      <img
        src={gitHubUserAccount.avatar_url}
        alt={`Avatar for ${gitHubUserAccount.login}`}
        width="100"
        height="100"
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
      <div>
        <p> {gitHubUserAccount.public_repos} public repositories</p>
        <p> {gitHubUserAccount.followers} followers</p>
        <p> {gitHubUserAccount.following} following</p>
      </div>

      {/* Back navigation */}
      <Link to="/">← Back to search</Link>
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
