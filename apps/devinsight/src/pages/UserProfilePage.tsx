import { useParams } from 'react-router'

export const UserProfilePage = () => {
  const { userName } = useParams()
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Welcome, {userName}!</p>
    </div>
  )
}
