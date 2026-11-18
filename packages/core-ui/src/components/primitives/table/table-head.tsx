import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableHeadProps = React.ComponentPropsWithoutRef<'th'>

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        {...props}
        className={cn(
          'ds-h-10 ds-px-3 ds-text-left ds-align-middle ds-font-medium ds-text-muted-foreground',
          className,
        )}
      />
    )
  },
)

TableHead.displayName = 'TableHead'
