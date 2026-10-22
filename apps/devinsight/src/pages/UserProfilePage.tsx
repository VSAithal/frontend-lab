import { useParams } from 'react-router'
import { useGitHubUser } from '../features/profile/useGitHubUser'
import { Spinner } from '@vsaithal/core-ui'

export const UserProfilePage = () => {
  const { userName } = useParams()

  const {
    gitHubUserAccount,
    isGitHubUserLoading,
    gitHubUserFetchError,
    isGitHubUserError,
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
      <div className="flex justify-center py-4">
        <p>Error fetching user data: {gitHubUserFetchError.message}</p>
      </div>
    )
  }

  if (!gitHubUserAccount || Object.keys(gitHubUserAccount).length === 0)
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
