import * as React from 'react'
import { cn } from '@utils/cnHelper'

export type FormHelperProps = React.ComponentPropsWithoutRef<'div'>

export const FormHelper = ({ className, ...props }: FormHelperProps) => (
  <div className={cn('ds-grid ds-gap-1', className)} {...props} />
)
