import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableHeaderProps = React.ComponentPropsWithoutRef<'thead'>
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      {...props}
      className={cn('[&_tr]:ds-border-b', className)}
    />
  )
})
TableHeader.displayName = 'TableHeader'
