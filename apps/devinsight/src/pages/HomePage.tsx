import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@vsaithal/core-ui'
import { Search } from 'lucide-react'
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
      <div className="ds-flex ds-gap-2 ds-items-center">
        <InputGroup>
          <InputGroupAddon position="left">
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter GitHub username"
          />
        </InputGroup>
        <Button onClick={handleSearch} variant="primary" size="base">
          Search
        </Button>
      </div>
    </div>
  )
}
