import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { UserProfilePage } from './pages/UserProfilePage'
import { ReposTablePage } from './pages/ReposTablePage'
import { RepoDetailPage } from './pages/RepoDetailPage'
import { ComparePage } from './pages/ComparePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userName" element={<UserProfilePage />} />
        <Route path="/user/:userName/repos" element={<ReposTablePage />} />
        <Route
          path="/user/:userName/repos/:repoName"
          element={<RepoDetailPage />}
        />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  )
}
