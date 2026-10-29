import { Skeleton } from '@vsaithal/core-ui'

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="h-4 w-32 mt-2" />
      <Skeleton className="h-4 w-64 mt-4" />
      <Skeleton className="h-4 w-40 mt-2" />
      <Skeleton className="h-4 w-36 mt-2" />
      <Skeleton className="h-4 w-44 mt-4" />
      <div className="flex gap-4 mt-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="w-40 h-9" />
    </div>
  )
}
