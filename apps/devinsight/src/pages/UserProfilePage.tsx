import { useParams } from 'react-router'
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

  const isRetryable = (message: string) => {
    const lower = message.toLowerCase()
    return (
      !lower.includes('not found') &&
      !lower.includes('rate limit') &&
      !lower.includes('authentication failed')
    )
  }

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
      <h1>User Profile Page</h1>
      <p>Welcome, {gitHubUserAccount?.name || gitHubUserAccount?.login}!</p>
    </div>
  )
}
