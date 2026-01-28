import axios, { AxiosError, AxiosResponse } from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

// Define the error response type from backend
export interface ApiErrorResponse {
  success: false
  message: string
  error: string
  errors?: any[]
}

export interface ApiSuccessResponse<T> {
  success: true
  [key: string]: any
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiErrorResponse
  status: number
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor with error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle different error types
    if (!error.response) {
      // Network error or no response from server
      const errorObj = {
        success: false,
        message:
          error.message === 'timeout of 15000ms exceeded'
            ? 'Request timeout - server is not responding'
            : 'Network error - please check your connection',
        error: 'NETWORK_ERROR',
      }
      return Promise.reject(errorObj)
    }

    // Server returned error response
    const responseData = error.response.data as ApiErrorResponse
    return Promise.reject(responseData)
  }
)

// Utility function for safe API calls with error handling
export async function apiCall<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      ...config,
    })

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    const apiError = error as ApiErrorResponse
    return {
      error: apiError,
      status: 0,
    }
  }
}

export default apiClient
