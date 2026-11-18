import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableRootProps = React.ComponentPropsWithoutRef<'table'> & {
  containerClassName?: string
}

export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'ds-relative ds-w-full ds-overflow-auto',
          containerClassName,
        )}
      >
        <table
          ref={ref}
          {...props}
          className={cn('ds-w-full ds-caption-bottom ds-text-sm', className)}
        />
      </div>
    )
  },
)

TableRoot.displayName = 'TableRoot'
