import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils/cnHelper'

const buttonVariants = cva(
  'ds-inline-flex ds-items-center ds-justify-center ds-gap-2 ds-whitespace-nowrap ds-rounded-md ds-text-sm ds-font-medium ds-transition-colors focus-visible:ds-outline-none focus-visible:ds-ring-1 disabled:ds-pointer-events-none disabled:ds-opacity-50 [&_svg]:ds-pointer-events-none [&_svg]:ds-size-4 [&_svg]:ds-shrink-0',
  {
    variants: {
      variant: {
        primary:
          'ds-bg-primary ds-text-primary-foreground ds-shadow hover:ds-bg-primary/90',
        destructive:
          'ds-bg-destructive ds-text-destructive-foreground ds-shadow-sm hover:ds-bg-destructive/90',
        outline:
          'ds-border ds-border-input ds-bg-background ds-shadow-sm hover:ds-bg-accent hover:ds-text-accent-foreground',
        secondary:
          'ds-bg-secondary ds-text-secondary-foreground ds-shadow-sm hover:ds-bg-secondary/90',
        ghost: 'hover:ds-bg-accent/90 hover:ds-text-accent-foreground',
        link: 'ds-text-primary ds-underline-offset-4 hover:ds-underline',
      },
      size: {
        base: 'ds-h-9 ds-px-4 ds-py-2',
        sm: 'ds-h-8 ds-rounded-md ds-px-3 ds-text-xs',
        lg: 'ds-h-10 ds-rounded-md ds-px-8',
        icon: 'ds-h-9 ds-w-9',
      },
      rounded: {
        base: 'ds-rounded-md',
        fullRounded: 'ds-rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
      rounded: 'base',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, rounded, asChild = false, type, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...(!asChild ? { type: type ?? 'button' } : {})}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
