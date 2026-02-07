import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardHeaderProps = React.ComponentPropsWithoutRef<'div'>

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('ds-flex ds-flex-col ds-space-y-1.5 ds-p-6', className)}
      {...props}
    />
  ),
)

CardHeader.displayName = 'CardHeader'
