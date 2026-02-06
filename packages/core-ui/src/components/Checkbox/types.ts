import { ReactNode } from 'react'
import type { Prettify } from '../../utils/typeHelper'
import type { CheckboxPrimitiveRoot } from '../primitives/checkbox'

export type CheckboxProps = Prettify<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitiveRoot> & {
    /**
     * Label rendered next to the checkbox
     */
    label?: ReactNode
    /**
     * Optional description text
     */
    description?: ReactNode
  }
>
