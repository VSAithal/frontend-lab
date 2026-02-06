import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('core-ui/Button', () => {
  it('renders its children', () => {
    render(<Button>Click Me</Button>)
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click Me</Button>)
    await user.click(screen.getByRole('button', { name: /click me/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Click Me
      </Button>,
    )

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('is disabled and aria-busy when isLoading is true', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button isLoading onClick={handleClick}>
        Click Me
      </Button>,
    )

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
  it('defaults type="button"', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button', { name: /click/i })).toHaveAttribute(
      'type',
      'button',
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
