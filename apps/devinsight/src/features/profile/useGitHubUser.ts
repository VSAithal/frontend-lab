import { useQuery } from '@tanstack/react-query'
import { fetchGitHubUser } from '../../api/github'

export const useGitHubUser = (userName: string | null) => {
  const {
    data: gitHubUserData,
    isLoading: isGitHubUserLoading,
    error: gitHubUserFetchError,
    isFetching: isGitHubUserFetching,
    isError: isGitHubUserError,
    refetch: refetchGitHubUser,
  } = useQuery({
    queryKey: ['User', userName],
    queryFn: () => fetchGitHubUser(userName!),
    enabled: !!userName,
  })

  return {
    gitHubUserData,
    isGitHubUserLoading,
    gitHubUserFetchError,
    isGitHubUserError,
    isGitHubUserFetching,
    refetchGitHubUser,
  }
}
