import { cn } from '@utils/cnHelper'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('ds-animate-pulse ds-rounded-md ds-bg-gray-300', className)}
      {...props}
      aria-hidden={true}
    />
  )
}

Skeleton.displayName = 'Skeleton'
