import { Skeleton } from '@vsaithal/core-ui'

export const ReposSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <RepoCardSkeleton />
      <RepoCardSkeleton />
      <RepoCardSkeleton />
    </div>
  )
}

const RepoCardSkeleton = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {/* repo name */}
      <Skeleton className="h-5 w-3/4 mb-2" />
      {/* description */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      {/* stats row */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
