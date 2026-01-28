import { useState } from 'react'
import SignupForm from '@components/auth/IndividualSignupForm'
import OTPVerification from '@components/auth/OTPVerification'
import CompleteSignup from '@components/auth/CompleteSignup'
import { useError } from '@context/ErrorContext'
import { useAuth } from '@context/AuthContext'
import { apiCall, ApiErrorResponse } from '@services/api'

type SignupStep = 'contact' | 'otp' | 'profile'

interface SignupData {
  contact: string
  contactType: 'email' | 'mobile'
  fullName?: string
  dateOfBirth?: string
  candidateId?: number
}

export default function IndividualSignup() {
  const { addError } = useError()
  const { setCandidateData } = useAuth()
  const [currentStep, setCurrentStep] = useState<SignupStep>('contact')
  const [signupData, setSignupData] = useState<SignupData>({
    contact: '',
    contactType: 'email',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleApiError = (error: any) => {
    const apiError = error as ApiErrorResponse
    addError(
      'Error',
      apiError.message || 'An unexpected error occurred. Please try again.'
    )
  }

  const handleSendOTP = async (contact: string, contactType: 'email' | 'mobile') => {
    setIsLoading(true)
    try {
      // Convert contactType to backend format (EMAIL or PHONE)
      const backendContactType = contactType === 'email' ? 'EMAIL' : 'PHONE'
      
      console.log('Sending OTP request:', { contact, contactType: backendContactType })
      const result = await apiCall('POST', '/signup/send-otp', {
        contact,
        contactType: backendContactType,
      })

      console.log('OTP response:', result)

      if (result.error) {
        console.error('OTP Error:', result.error)
        handleApiError(result.error)
        return
      }

      console.log('Moving to OTP step')
      setSignupData({
        contact,
        contactType,
      })
      setCurrentStep('otp')
    } catch (error) {
      console.error('OTP Exception:', error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true)
    try {
      console.log('Verifying OTP:', otp)
      const result = await apiCall('POST', '/signup/verify-otp', {
        contact: signupData.contact,
        otpCode: otp,
      })

      console.log('OTP verification response:', result)

      if (result.error) {
        console.error('OTP Verification Error:', result.error)
        handleApiError(result.error)
        return
      }

      // Extract candidateId from response
      const candidateId = result.data?.candidateId
      if (candidateId) {
        setSignupData({
          ...signupData,
          candidateId,
        })
        // Store candidateId in localStorage and context
        localStorage.setItem('candidateId', String(candidateId))
        setCandidateData({
          candidateId: String(candidateId),
        })
      }

      console.log('OTP verified, moving to profile step')
      setCurrentStep('profile')
    } catch (error) {
      console.error('OTP Verification Exception:', error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteSignup = async (userData: {
    fullName: string
    dateOfBirth: string
    contact: string
    contactType: string
  }) => {
    setIsLoading(true)
    try {
      // Save profile details (name and DOB) to backend
      const profileResult = await apiCall('POST', '/signup/profile-details', {
        candidateId: signupData.candidateId,
        firstName: userData.fullName.split(' ')[0],
        lastName: userData.fullName.split(' ').slice(1).join(' '),
        dateOfBirth: userData.dateOfBirth,
      })

      if (profileResult.error) {
        handleApiError(profileResult.error)
        return
      }

      // Then mark signup as complete using query parameter
      const completeResult = await apiCall(
        'POST',
        `/signup/complete?candidateId=${signupData.candidateId}`
      )

      if (completeResult.error) {
        handleApiError(completeResult.error)
        return
      }

      setSignupData({
        ...signupData,
        fullName: userData.fullName,
        dateOfBirth: userData.dateOfBirth,
      })

      setSuccessMessage(
        `Welcome, ${userData.fullName}! Your account has been created successfully.`
      )

      // Redirect to onboarding after 2 seconds to complete profile
      setTimeout(() => {
        window.location.href = '/onboard'
      }, 2000)
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditContact = () => {
    setCurrentStep('contact')
    setSignupData({
      contact: '',
      contactType: 'email',
    })
  }

  // Show success message
  if (successMessage) {
    return (
      <div className="success-page">
        <h1>{successMessage}</h1>
      </div>
    )
  }

  // Render based on current step
  switch (currentStep) {
    case 'contact':
      return <SignupForm onSubmit={handleSendOTP} isLoading={isLoading} />

    case 'otp':
      return (
        <OTPVerification
          contactType={signupData.contactType}
          contact={signupData.contact}
          onVerify={handleVerifyOTP}
          onEdit={handleEditContact}
          isLoading={isLoading}
        />
      )

    case 'profile':
      return (
        <CompleteSignup
          contact={signupData.contact}
          contactType={signupData.contactType}
          onSubmit={handleCompleteSignup}
          isLoading={isLoading}
        />
      )

    default:
      return null
  }
}
