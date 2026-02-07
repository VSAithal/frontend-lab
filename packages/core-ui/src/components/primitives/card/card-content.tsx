import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardContentProps = React.ComponentPropsWithoutRef<'div'>

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('ds-p-6 ds-pt-0', className)} {...props} />
  ),
)

CardContent.displayName = 'CardContent'
