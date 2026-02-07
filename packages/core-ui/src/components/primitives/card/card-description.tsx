import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardDescriptionProps = React.ComponentPropsWithoutRef<'p'>

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('ds-text-sm ds-text-muted-foreground', className)}
    {...props}
  />
))

CardDescription.displayName = 'CardDescription'
