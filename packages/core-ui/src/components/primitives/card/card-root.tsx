import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type CardRootProps = React.ComponentPropsWithoutRef<'div'>

export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'ds-rounded-lg ds-border ds-border-border ds-bg-card ds-text-card-foreground ds-shadow-sm',
        className,
      )}
      {...props}
    />
  ),
)

CardRoot.displayName = 'CardRoot'
