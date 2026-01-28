import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface ErrorMessage {
  id: string
  title: string
  message: string
  type: 'error' | 'warning' | 'info'
  timestamp: number
}

interface ErrorContextType {
  errors: ErrorMessage[]
  addError: (title: string, message: string, type?: 'error' | 'warning' | 'info') => void
  removeError: (id: string) => void
  clearErrors: () => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<ErrorMessage[]>([])

  const addError = useCallback(
    (title: string, message: string, type: 'error' | 'warning' | 'info' = 'error') => {
      const id = `${Date.now()}-${Math.random()}`
      const newError: ErrorMessage = {
        id,
        title,
        message,
        type,
        timestamp: Date.now(),
      }
      setErrors((prev) => [...prev, newError])

      // Auto-remove after 5 seconds
      setTimeout(() => {
        removeError(id)
      }, 5000)
    },
    []
  )

  const removeError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== id))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useError() {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within ErrorProvider')
  }
  return context
}
