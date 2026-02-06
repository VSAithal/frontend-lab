import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '../../utils/cnHelper'

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('ds-grid ds-gap-2', className)}
    {...props}
  />
))
RadioGroup.displayName = 'RadioGroup'

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'ds-aspect-square ds-h-4 ds-w-4 ds-rounded-full ds-border ds-border-primary ds-text-primary ds-shadow',
      'focus-visible:ds-outline-none focus-visible:ds-ring-1 focus-visible:ds-ring-ring',
      'disabled:ds-cursor-not-allowed disabled:ds-opacity-50',
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="ds-flex ds-items-center ds-justify-center">
      <Circle className="ds-h-2.5 ds-w-2.5 ds-fill-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
