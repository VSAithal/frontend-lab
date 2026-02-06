import type { SVGAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { Prettify } from '../../utils/typeHelper'

export const spinnerVariants = cva('ds-animate-spin', {
  variants: {
    size: {
      xs: 'ds-size-2',
      sm: 'ds-size-4',
      md: 'ds-size-6',
      lg: 'ds-size-8',
      xl: 'ds-size-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SpinnerProps = Prettify<
  SVGAttributes<SVGSVGElement> & VariantProps<typeof spinnerVariants>
>
