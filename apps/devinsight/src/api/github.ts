import {
  GitHubRepoSchema,
  GitHubUserSchema,
  type GitHubRepo,
  type GitHubUser,
} from '../types/github'
import {
  BASE_URL,
  BASIC_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from './constants'
import { getHeaders, getRateLimitMessage } from './helpers'

export const fetchGitHubUser = async (
  userName: string,
): Promise<GitHubUser> => {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}/users/${userName}`, {
      headers: getHeaders(),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new Error(NETWORK_ERROR_MESSAGE, { cause: error })
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication failed. Please check your token.')
    }
    if (response.status === 403) {
      throw new Error(getRateLimitMessage(response.headers))
    }
    if (response.status === 404) {
      throw new Error('User not found. Please check the username and try again')
    }

    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch {
      // JSON parsing failed — use the default error message
    }
    throw new Error(errorMessage)
  }

  const raw = await response.json()
  const result = GitHubUserSchema.safeParse(raw)
  if (!result.success) {
    throw new Error(`Unexpected API response: ${result.error.message}`)
  }

  return result.data
}

export const fetchGitHubUserRepos = async (
  userName: string,
  page: number = 1,
  signal?: AbortSignal,
): Promise<GitHubRepo[]> => {
  let response: Response
  try {
    response = await fetch(
      `${BASE_URL}/users/${userName}/repos?per_page=10&page=${page}`,
      {
        headers: getHeaders(),
        signal,
      },
    )
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new Error(NETWORK_ERROR_MESSAGE, { cause: error })
  }
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication failed. Please check your token.')
    }
    if (response.status === 403) {
      throw new Error(getRateLimitMessage(response.headers))
    }
    if (response.status === 404) {
      throw new Error(
        'User not found. Please check the username and try again.',
      )
    }

    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch {
      // JSON parsing failed — use the default error message
    }
    throw new Error(errorMessage)
  }

  const raw = await response.json()
  const result = GitHubRepoSchema.array().safeParse(raw)

  if (!result.success) {
    throw new Error(`Unexpected API response: ${result.error.message}`)
  }
  return result.data
}
