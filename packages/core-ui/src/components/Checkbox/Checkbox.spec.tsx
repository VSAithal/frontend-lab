import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { Checkbox } from './Checkbox'

describe('core-ui/Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('toggles checked state when clicked (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Checkbox />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('renders label and description when provided', () => {
    render(
      <Checkbox
        label="Accept terms"
        description="You must accept to continue"
      />,
    )

    expect(screen.getByText('Accept terms')).toBeInTheDocument()
    expect(screen.getByText('You must accept to continue')).toBeInTheDocument()
  })

  it('clicking label toggles the checkbox (when label/description exist)', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Accept terms" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await user.click(screen.getByText('Accept terms'))
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('is disabled when disabled is true', async () => {
    const user = userEvent.setup()
    render(<Checkbox disabled />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-disabled') // Radix sets this
    // aria-disabled may or may not be present; data-disabled is reliable for Radix.

    await user.click(checkbox)
    // should remain unchecked
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <Checkbox
          label="Accept terms"
          description="You must accept to continue"
        />
      </div>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
