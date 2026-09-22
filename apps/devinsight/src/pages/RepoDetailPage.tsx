import { useParams } from 'react-router'

export const RepoDetailPage = () => {
  const { userName, repoName } = useParams()
  return (
    <div>
      <h1>Repo Detail Page</h1>
      <p>
        Details for {repoName} owned by {userName}
      </p>
    </div>
  )
}
