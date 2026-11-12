import { cn } from '@utils/cnHelper'
import * as React from 'react'

export type TableCaptionProps = React.ComponentPropsWithoutRef<'caption'>

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      {...props}
      className={cn('ds-mt-4 ds-text-sm ds-text-muted-foreground', className)}
    />
  )
})

TableCaption.displayName = 'TableCaption'
