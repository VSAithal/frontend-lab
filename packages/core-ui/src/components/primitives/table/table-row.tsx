import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableRowProps = React.ComponentPropsWithoutRef<'tr'>

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        {...props}
        className={cn(
          'ds-border-b ds-border-border ds-transition-colors hover:ds-bg-gray-100',
          className,
        )}
      />
    )
  },
)

TableRow.displayName = 'TableRow'
