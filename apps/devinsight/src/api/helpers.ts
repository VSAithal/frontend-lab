export const getHeaders = (): HeadersInit => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  return token ? { Authorization: `Bearer ${token}` } : {}
}
export const getRateLimitMessage = (headers: Headers): string => {
  const resetTime = headers.get('x-ratelimit-reset')
  if (resetTime) {
    const time = new Date(parseInt(resetTime) * 1000).toLocaleTimeString()
    return `API rate limit exceeded. Resets at ${time}.`
  }
  return 'API rate limit exceeded. Please try again later.'
}
