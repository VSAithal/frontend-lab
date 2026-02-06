import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe } from 'vitest'
import { Spinner } from '.'

describe('Spinner', () => {
  describe('As a user I expect that the spinner component is accessible', () => {
    it('should be accessible according to jest-axe', async () => {
      const { container } = render(<Spinner />)
      const result = await axe(container)

      expect(result).toHaveNoViolations()
    })
    it('should have a role of status and aria-label of Loading', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')

      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute('aria-label', 'Loading')
    })
    it('should be possible to set a custom aria-label', () => {
      const ariaLabel = 'Login in progress'
      render(<Spinner aria-label={ariaLabel} />)
      const spinner = screen.getByRole('status')

      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute('aria-label', ariaLabel)
    })
    it('should be possible to set aria-live', () => {
      const ariaLive = 'polite'
      render(<Spinner aria-live={ariaLive} />)
      const spinner = screen.getByRole('status')

      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute('aria-live', ariaLive)
    })
  })
})
