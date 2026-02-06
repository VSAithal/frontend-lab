import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@utils/cnHelper'

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
>

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'ds-text-sm ds-font-medium ds-leading-none',
      'peer-disabled:ds-cursor-not-allowed peer-disabled:ds-opacity-70',
      className,
    )}
    {...props}
  />
))

Label.displayName = 'Label'
