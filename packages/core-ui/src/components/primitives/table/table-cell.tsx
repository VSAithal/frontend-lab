import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableCellProps = React.ComponentPropsWithoutRef<'td'>

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        {...props}
        className={cn('ds-p-3 ds-align-middle', className)}
      />
    )
  },
)

TableCell.displayName = 'TableCell'
