import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type FormDescriptionProps = React.ComponentPropsWithoutRef<'p'>

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('ds-text-xs ds-text-muted-foreground', className)}
    {...props}
  />
))

FormDescription.displayName = 'FormDescription'
