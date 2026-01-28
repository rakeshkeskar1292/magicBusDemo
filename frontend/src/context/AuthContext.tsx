import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  candidateId: string | null
  registrationMethod: 'email' | 'phone' | null
  registrationContact: string | null
  firstName: string | null
  lastName: string | null
  dateOfBirth: string | null
  setCandidateData: (data: Partial<AuthContextType>) => void
  clearCandidateData: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [candidateId, setCandidateId] = useState<string | null>(
    localStorage.getItem('candidateId')
  )
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone' | null>(
    (localStorage.getItem('registrationMethod') as 'email' | 'phone') || null
  )
  const [registrationContact, setRegistrationContact] = useState<string | null>(
    localStorage.getItem('registrationContact')
  )
  const [firstName, setFirstName] = useState<string | null>(
    localStorage.getItem('firstName')
  )
  const [lastName, setLastName] = useState<string | null>(
    localStorage.getItem('lastName')
  )
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(
    localStorage.getItem('dateOfBirth')
  )

  const setCandidateData = (data: Partial<AuthContextType>) => {
    if (data.candidateId !== undefined) {
      setCandidateId(data.candidateId)
      if (data.candidateId) {
        localStorage.setItem('candidateId', data.candidateId)
      } else {
        localStorage.removeItem('candidateId')
      }
    }
    if (data.registrationMethod !== undefined) {
      setRegistrationMethod(data.registrationMethod)
      if (data.registrationMethod) {
        localStorage.setItem('registrationMethod', data.registrationMethod)
      } else {
        localStorage.removeItem('registrationMethod')
      }
    }
    if (data.registrationContact !== undefined) {
      setRegistrationContact(data.registrationContact)
      if (data.registrationContact) {
        localStorage.setItem('registrationContact', data.registrationContact)
      } else {
        localStorage.removeItem('registrationContact')
      }
    }
    if (data.firstName !== undefined) {
      setFirstName(data.firstName)
      if (data.firstName) {
        localStorage.setItem('firstName', data.firstName)
      } else {
        localStorage.removeItem('firstName')
      }
    }
    if (data.lastName !== undefined) {
      setLastName(data.lastName)
      if (data.lastName) {
        localStorage.setItem('lastName', data.lastName)
      } else {
        localStorage.removeItem('lastName')
      }
    }
    if (data.dateOfBirth !== undefined) {
      setDateOfBirth(data.dateOfBirth)
      if (data.dateOfBirth) {
        localStorage.setItem('dateOfBirth', data.dateOfBirth)
      } else {
        localStorage.removeItem('dateOfBirth')
      }
    }
  }

  const clearCandidateData = () => {
    setCandidateId(null)
    setRegistrationMethod(null)
    setRegistrationContact(null)
    setFirstName(null)
    setLastName(null)
    setDateOfBirth(null)
    localStorage.removeItem('candidateId')
    localStorage.removeItem('registrationMethod')
    localStorage.removeItem('registrationContact')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('dateOfBirth')
  }

  return (
    <AuthContext.Provider
      value={{
        candidateId,
        registrationMethod,
        registrationContact,
        firstName,
        lastName,
        dateOfBirth,
        setCandidateData,
        clearCandidateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
