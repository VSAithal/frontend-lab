import { GitFork, NotebookPen, Star } from 'lucide-react'
import type { GitHubRepo } from '../../types/github'

export const ReposPreview = ({
  gitHubUserRepos,
}: {
  gitHubUserRepos: GitHubRepo[]
}) => {
  if (gitHubUserRepos.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-4">No public repositories yet.</p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {gitHubUserRepos.map((repo) => (
          <div
            key={repo.name}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                <Star className="inline-block w-4 h-4 mr-1" />
                {repo.stargazers_count}
              </span>
              <span className="text-sm text-gray-500">
                <GitFork className="inline-block w-4 h-4 mr-1" />{' '}
                {repo.forks_count}
              </span>
              <span className="text-sm text-gray-500">
                <NotebookPen className="inline-block w-4 h-4 mr-1" />{' '}
                {repo.language || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
