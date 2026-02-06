import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders an input textbox by default', () => {
    render(<Input aria-label="Name" />)
    const inputElement = screen.getByLabelText('Name')
    expect(inputElement).toBeInTheDocument()
  })
  it('forwards props like placeholder', () => {
    render(<Input aria-label="Email" placeholder="you@example.com" />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Input aria-label="Username" onChange={onChange} />)
    await user.type(screen.getByRole('textbox', { name: /username/i }), 'john')

    expect(onChange).toHaveBeenCalled()
  })
  it('is disabled when disabled is true', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="Disabled input" disabled />)

    const input = screen.getByRole('textbox', { name: /disabled input/i })
    expect(input).toBeDisabled()

    await user.type(input, 'test')
    expect((input as HTMLInputElement).value).toBe('')
  })
  it('has no accessibility violations', async () => {
    const { container } = render(<Input aria-label="Accessible input" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
