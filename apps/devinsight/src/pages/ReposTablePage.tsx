import { useParams } from 'react-router'

export const ReposTablePage = () => {
  const { userName } = useParams()
  return (
    <div>
      <h1>Repos Table Page</h1>
      <p>Repos for {userName}</p>
    </div>
  )
}
