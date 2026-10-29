import { Link, useParams } from 'react-router'
import { useGitHubUser } from '../features/profile/useGitHubUser'
import { Button } from '@vsaithal/core-ui'
import { ErrorMessage } from '../components/ErrorMessage'
import { MoveLeft, MoveRight } from 'lucide-react'
import { useGitHubUserRepos } from '../features/profile/useGitHubUserRepos'
import { ProfileSkeleton } from '../features/profile/ProfileSkeleton'
import { ProfileCard } from '../features/profile/ProfileCard'
import { ReposPreview } from '../features/profile/ReposPreview'
import { ReposSkeleton } from '../features/profile/ReposSkeleton'

const isRetryable = (message: string) => {
  const lower = message.toLowerCase()
  return (
    !lower.includes('not found') &&
    !lower.includes('rate limit') &&
    !lower.includes('authentication failed')
  )
}

export const UserProfilePage = () => {
  const { userName } = useParams()

  const {
    gitHubUserData,
    isGitHubUserLoading,
    gitHubUserFetchError,
    isGitHubUserError,
    refetchGitHubUser,
  } = useGitHubUser(userName || null)

  const {
    gitHubUserRepos,
    isGitHubUserReposLoading,
    gitHubUserReposFetchError,
    isGitHubUserReposError,
    refetchRepos,
  } = useGitHubUserRepos(gitHubUserData?.login || null)

  if (isGitHubUserLoading) {
    return (
      <div>
        <ProfileSkeleton />
        <ReposSkeleton />
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
  if (!gitHubUserData)
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No user data available. Please check the username and try again.
      </p>
    )

  return (
    <div>
      <ProfileCard gitHubUserAccount={gitHubUserData} />
      {/* Repos section */}
      {isGitHubUserReposLoading && <ReposSkeleton />}
      {gitHubUserReposFetchError && isGitHubUserReposError && (
        <ErrorMessage
          message={gitHubUserReposFetchError.message}
          onRetry={refetchRepos}
        />
      )}
      {gitHubUserRepos && (
        <ReposPreview gitHubUserRepos={gitHubUserRepos.slice(0, 3)} />
      )}

      {/* Back navigation */}
      <div className="flex justify-between items-center mt-4 p-1">
        <Link to="/">
          <Button variant="secondary" size="base">
            <MoveLeft className="mr-2 size-4" />
            Back to search
          </Button>
        </Link>
        {gitHubUserRepos && gitHubUserRepos.length > 0 && (
          <Link to={`/user/${userName}/repos`}>
            <Button variant="secondary" size="base">
              View All Repositories
              <MoveRight className="ml-2 size-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
