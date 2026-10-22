import { useQuery } from '@tanstack/react-query'
import { fetchGitHubUser } from '../../api/github'

export const useGitHubUser = (userName: string | null) => {
  const {
    data: gitHubUserAccount,
    isLoading: isGitHubUserLoading,
    error: gitHubUserFetchError,
    isFetching: isGitHubUserFetching,
    isError: isGitHubUserError,
  } = useQuery({
    queryKey: ['User', userName],
    queryFn: () => fetchGitHubUser(userName!),
    enabled: !!userName,
  })

  return {
    gitHubUserAccount,
    isGitHubUserLoading,
    gitHubUserFetchError,
    isGitHubUserError,
    isGitHubUserFetching,
  }
}
