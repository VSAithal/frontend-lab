import { useQuery } from '@tanstack/react-query'
import { fetchGitHubUserRepos } from '../../api/github'

export const useGitHubUserRepos = (userName: string | null) => {
  const {
    data: gitHubUserRepos,
    isLoading: isGitHubUserReposLoading,
    error: gitHubUserReposFetchError,
    isFetching: isGitHubUserReposFetching,
    isError: isGitHubUserReposError,
    refetch: refetchRepos,
  } = useQuery({
    queryKey: ['UserRepos', userName],
    queryFn: ({ signal }) => fetchGitHubUserRepos(userName!, 1, signal),
    enabled: !!userName,
  })
  return {
    gitHubUserRepos,
    isGitHubUserReposLoading,
    gitHubUserReposFetchError,
    isGitHubUserReposError,
    isGitHubUserReposFetching,
    refetchRepos,
  }
}
