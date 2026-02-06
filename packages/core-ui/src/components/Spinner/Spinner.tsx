import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cnHelper'
import { spinnerVariants, type SpinnerProps } from './types'

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
    )
  },
)
