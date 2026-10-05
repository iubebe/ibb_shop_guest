import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'

const CSRF_HEADER = 'X-CSRF-Token'
const SAFE_METHODS = new Set(['get', 'head', 'options'])

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  withCredentials: true,
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

// The backend requires a signed CSRF token on every unsafe request. Fetch it
// once (it also sets the matching cookie) and reuse it.
let csrfToken: Promise<string> | null = null

function loadCsrfToken() {
  csrfToken ??= axios
    .get<{ csrfToken: string }>('/auth/csrf', { baseURL: env.apiUrl, withCredentials: true })
    .then((res) => res.data.csrfToken)
    .catch((error: unknown) => {
      csrfToken = null
      throw error
    })
  return csrfToken
}

apiClient.interceptors.request.use(async (config) => {
  if (!SAFE_METHODS.has((config.method ?? 'get').toLowerCase())) {
    config.headers.set(CSRF_HEADER, await loadCsrfToken())
  }
  return config
})

type RetriableConfig = InternalAxiosRequestConfig & { _csrfRetried?: boolean }

function errorMessage(data: unknown, fallback: string) {
  const message = (data as { message?: string | string[] } | undefined)?.message
  return Array.isArray(message) ? message.join(', ') : (message ?? fallback)
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!(error instanceof AxiosError)) return Promise.reject(error)

    const config = error.config as RetriableConfig | undefined
    const data: unknown = error.response?.data
    // Token expired or cookie lost: fetch a new one and retry once.
    if (error.response?.status === 403 && config && !config._csrfRetried && /csrf/i.test(errorMessage(data, ''))) {
      config._csrfRetried = true
      csrfToken = null
      return apiClient.request(config)
    }
    return Promise.reject(new ApiError(errorMessage(data, error.message), error.response?.status ?? null, data))
  },
)
