import { Button as PrimitiveButton } from '@components/primitives/button'
import { forwardRef } from 'react'
import type { ButtonProps } from './types'
import { Spinner } from '@components/Spinner'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, disabled, ...rest }, ref) => (
    <PrimitiveButton
      ref={ref}
      {...rest}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading && <Spinner />}
      {children}
    </PrimitiveButton>
  ),
)

Button.displayName = 'Button'
