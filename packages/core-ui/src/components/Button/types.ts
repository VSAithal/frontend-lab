import type { Prettify } from '../../utils/typeHelper'
import type { ButtonProps as PrimitiveButtonProps } from "../primitives/button"
import type { ReactNode } from 'react'

export type ButtonProps = Prettify<
  PrimitiveButtonProps & {
    /**
     * The content to be displayed inside the button. This can be a string, an icon, or any other React node.
     */
    children: ReactNode
    /**
     * If true, the button will be in a loading state, display a spinner, and be disabled.
     * @default false
     */
    isLoading?: boolean
  }
>
