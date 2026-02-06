import { forwardRef } from 'react'
import {
  RadioGroup as PrimitiveRadioGroup,
  RadioGroupItem,
} from '../primitives/radio-group'
import type { RadioGroupProps } from './types'
import { cn } from '../../utils/cnHelper'

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, className, itemClassName, ...props }, ref) => {
    return (
      <PrimitiveRadioGroup ref={ref} className={className} {...props}>
        {options?.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'ds-flex ds-cursor-pointer ds-items-start ds-gap-3',
              opt.disabled && 'ds-cursor-not-allowed ds-opacity-60',
            )}
          >
            <RadioGroupItem
              value={opt.value}
              disabled={opt.disabled}
              className={itemClassName}
            />
            <div className="ds-grid ds-gap-1">
              <span className="ds-text-sm ds-font-medium">{opt.label}</span>
              {opt.description && (
                <span className="ds-text-xs ds-text-muted-foreground">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </PrimitiveRadioGroup>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
