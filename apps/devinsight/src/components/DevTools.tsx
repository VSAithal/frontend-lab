import { lazy, Suspense } from 'react'

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((module) => ({
    default: module.ReactQueryDevtools,
  })),
)

export const DevTools = () => {
  if (!import.meta.env.DEV) return null

  return (
    <Suspense fallback={null}>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  )
}
