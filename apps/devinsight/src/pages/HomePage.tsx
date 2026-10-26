import { useState } from 'react'
import { useNavigate } from 'react-router'

export const HomePage = () => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      navigate(`/user/${trimmed}`)
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
