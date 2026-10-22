import type { GitHubRepo, GitHubUser } from '../types/github'
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
    let errorMessage = BASIC_ERROR_MESSAGE

    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch (error) {
      if (response.status === 403) {
        const rateLimitErrorMessage = getRateLimitMessage(response.headers)
        throw new Error(rateLimitErrorMessage)
      } else if (response.status === 404) {
        throw new Error('User not found')
      } else {
        throw new Error(errorMessage)
      }
    }
    throw new Error(errorMessage)
  }
  const data: GitHubUser = await response.json()
  return data
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
    let errorMessage = BASIC_ERROR_MESSAGE
    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch (error) {
      if (response.status === 403) {
        const rateLimitErrorMessage = getRateLimitMessage(response.headers)
        throw new Error(rateLimitErrorMessage)
      } else if (response.status === 404) {
        throw new Error(
          'User not found. Please check the username and try again.',
        )
      } else {
        throw new Error(errorMessage)
      }
    }
    throw new Error(errorMessage)
  }
  const data: GitHubRepo[] = await response.json()
  return data
}
