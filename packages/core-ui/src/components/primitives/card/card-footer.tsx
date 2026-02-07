import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardFooterProps = React.ComponentPropsWithoutRef<'div'>

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'ds-flex ds-flex-col ds-gap-3 ds-p-6 ds-pt-0 sm:ds-flex-row sm:ds-items-center sm:ds-justify-end',
        className,
      )}
      {...props}
    />
  ),
)

CardFooter.displayName = 'CardFooter'
