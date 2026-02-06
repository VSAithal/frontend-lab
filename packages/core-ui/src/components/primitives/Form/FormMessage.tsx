import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type FormMessageProps = React.ComponentPropsWithoutRef<'p'>

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('ds-text-xs ds-text-destructive', className)}
    {...props}
  />
))

FormMessage.displayName = 'FormMessage'
