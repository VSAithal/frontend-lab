import type { Prettify } from '../../utils/typeHelper'
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

export type RadioOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioGroupProps = Prettify<
  Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    'children'
  > & {
    options?: RadioOption[]
    itemClassName?: string
  }
>
