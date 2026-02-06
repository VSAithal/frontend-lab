import { forwardRef } from 'react'
import { CheckboxProps } from './types'
import { CheckboxPrimitiveRoot } from '../primitives/checkbox'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ label, description, className, ...props }, ref) => {
  const checkbox = (
    <CheckboxPrimitiveRoot ref={ref} className={className} {...props} />
  )
  if (!label && !description) {
    return checkbox
  }

  return (
    <label className="ds-flex ds-cursor-pointer ds-items-start ds-gap-3">
      {checkbox}
      <div className="ds-grid ds-gap-1">
        {label && <span className="ds-text-sm ds-font-medium">{label}</span>}
        {description && (
          <span className="ds-text-xs ds-text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
