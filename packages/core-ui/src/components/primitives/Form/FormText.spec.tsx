import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { FormDescription } from './FormDescription'
import { FormMessage } from './FormMessage'

describe('core-ui/Form text primitives', () => {
  it('renders description and message', () => {
    render(
      <>
        <FormDescription>Help text</FormDescription>
        <FormMessage>Error text</FormMessage>
      </>,
    )
    expect(screen.getByText('Help text')).toBeInTheDocument()
    expect(screen.getByText('Error text')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FormDescription>Help</FormDescription>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
