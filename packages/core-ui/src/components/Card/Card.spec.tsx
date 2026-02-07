import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'

const CardFixture = () => (
  <Card data-testid="card">
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content</p>
    </CardContent>
    <CardFooter>
      <button type="button">Primary action</button>
      <button type="button">Secondary action</button>
    </CardFooter>
  </Card>
)

describe('core-ui/Card', () => {
  it('renders title, description, content, and footer', () => {
    render(<CardFixture />)

    expect(
      screen.getByRole('heading', { name: /card title/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/card description/i)).toBeInTheDocument()
    expect(screen.getByText(/card content/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /primary action/i }))
      .toBeInTheDocument()
    expect(screen.getByRole('button', { name: /secondary action/i }))
      .toBeInTheDocument()
  })

  it('merges className on the card root', () => {
    render(<Card data-testid="card" className="custom-class" />)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('has no accessibility violations in the default composition', async () => {
    const { container } = render(<CardFixture />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
