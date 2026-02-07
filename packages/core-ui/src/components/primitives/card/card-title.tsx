import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardTitleProps = React.ComponentPropsWithoutRef<'h3'>

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'ds-text-lg ds-font-semibold ds-leading-none ds-tracking-tight',
        className,
      )}
      {...props}
    />
  ),
)

CardTitle.displayName = 'CardTitle'
