import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      {...props}
      className={cn('[&_tr:last-child]:ds-border-0', className)}
    />
  )
})

TableBody.displayName = 'TableBody'
