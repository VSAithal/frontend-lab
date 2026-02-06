import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '../../utils/cnHelper'

const CheckboxPrimitiveRoot = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'ds-peer ds-grid ds-h-4 ds-w-4 ds-shrink-0 ds-place-content-center',
      'ds-rounded-sm ds-border ds-border-primary',
      'focus-visible:ds-outline-none focus-visible:ds-ring-1 focus-visible:ds-ring-ring',
      'disabled:ds-cursor-not-allowed disabled:ds-opacity-50',
      'data-[state=checked]:ds-bg-primary data-[state=checked]:ds-text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="ds-grid ds-place-content-center">
      <Check className="ds-h-3 ds-w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

CheckboxPrimitiveRoot.displayName = 'CheckboxPrimitive'

export { CheckboxPrimitiveRoot }
