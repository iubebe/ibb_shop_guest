import axios, { AxiosError } from 'axios'
import { env } from '@/config/env'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

/** Normalized error thrown by every api call, so UI never touches AxiosError. */
export class ApiError extends Error {
  readonly status: number | null
  readonly data: unknown

  constructor(message: string, status: number | null, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      const data: unknown = error.response?.data
      const message =
        (data as { message?: string } | undefined)?.message ?? error.message
      return Promise.reject(new ApiError(message, error.response?.status ?? null, data))
    }
    return Promise.reject(error)
  },
)
