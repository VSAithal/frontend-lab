import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'

describe('core-ui/Skeleton', () => {
  it('renders a div', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
  it('renders with the correct className including additional classes', () => {
    const { container } = render(<Skeleton className="test-class" />)
    expect(container.querySelector('div')).toHaveClass(
      'ds-animate-pulse ds-rounded-md ds-bg-gray-300 test-class',
    )
  })
  it('has aria-hidden set to true', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('div')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
  it('has no accessibility violations', async () => {
    const { container } = render(<Skeleton />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
