import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type InputGroupProps = React.ComponentPropsWithoutRef<'div'>
export const InputGroup = ({ className, ...props }: InputGroupProps) => (
  <div
    className={cn(
      'ds-flex ds-h-10 ds-w-full ds-items-center ds-rounded-md ds-border ds-border-input ds-bg-background ds-text-sm',
      'ds-ring-offset-background focus-within:ds-ring-2 focus-within:ds-ring-ring focus-within:ds-ring-offset-2',
      'has-[:disabled]:ds-cursor-not-allowed has-[:disabled]:ds-opacity-50',
      className,
    )}
    {...props}
  />
)

export type InputGroupInputProps = React.ComponentPropsWithoutRef<'input'>
export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'ds-flex-1 ds-bg-transparent ds-px-3 ds-py-2 ds-text-sm',
      'placeholder:ds-text-muted-foreground',
      'focus:ds-outline-none focus:ds-ring-0',
      'disabled:ds-cursor-not-allowed',
      className,
    )}
    {...props}
  />
))
InputGroupInput.displayName = 'InputGroupInput'

export type InputGroupAddonProps = React.ComponentPropsWithoutRef<'div'> & {
  position?: 'left' | 'right'
}
export const InputGroupAddon = ({
  className,
  position = 'left',
  ...props
}: InputGroupAddonProps) => (
  <div
    className={cn(
      'ds-flex ds-h-full ds-items-center ds-text-muted-foreground',
      position === 'left' ? 'ds-pl-3' : 'ds-pr-3',
      '[&>svg]:ds-size-4',
      className,
    )}
    {...props}
  />
)
