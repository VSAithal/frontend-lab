import * as React from 'react'
import { cn } from '../../utils/cnHelper'

export type InputProps = React.ComponentPropsWithRef<'input'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'ds-flex ds-h-9 ds-w-full ds-rounded-md ds-border ds-border-input ds-bg-background ds-px-3 ds-py-2 ds-text-sm',
          'placeholder:ds-text-muted-foreground',
          'focus-visible:ds-outline-none focus-visible:ds-ring-1 focus-visible:ds-ring-ring',
          'disabled:ds-cursor-not-allowed disabled:ds-opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
