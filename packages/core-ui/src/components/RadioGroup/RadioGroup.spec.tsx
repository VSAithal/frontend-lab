import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { RadioGroup } from './RadioGroup'

describe('core-ui/RadioGroup', () => {
  it('renders options as radios', () => {
    render(
      <RadioGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />,
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('allows selecting an option', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />,
    )

    const radios = screen.getAllByRole('radio')
    await user.click(radios[1])

    expect(radios[1]).toHaveAttribute('data-state', 'checked')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RadioGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
