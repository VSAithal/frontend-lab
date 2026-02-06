import { forwardRef } from 'react'
import { Input as PrimitiveInput } from '../primitives/input'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => <PrimitiveInput ref={ref} {...props} />,
)

Input.displayName = 'Input'
