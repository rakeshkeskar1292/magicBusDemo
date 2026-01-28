import { useState, useEffect } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import PersonalDetailsForm from '@components/onboarding/PersonalDetailsForm'
import EducationDetailsForm from '@components/onboarding/EducationDetailsForm'
import SkillsForm from '@components/onboarding/SkillsForm'
import ReviewForm from '@components/onboarding/ReviewForm'
import { useAuth } from '@context/AuthContext'

type OnboardingStep = 'personal' | 'education' | 'skills' | 'review'

interface OnboardingData {
  candidateId?: number

  // Personal Details
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  pincode: string
  aadhar: string
  pan: string
  bankAccount: string

  // Education Details
  education10th: string
  score10th: string
  education12th: string
  score12th: string
  graduationDegree: string
  graduationField: string
  graduationScore: string

  // Skills
  skills: string[]
  languagesKnown: string[]
  certifications: string[]
  
  // Read-only flags
  isFirstNameReadOnly: boolean
  isLastNameReadOnly: boolean
  isDateOfBirthReadOnly: boolean
  isPhoneReadOnly: boolean
  isEmailReadOnly: boolean
}

const STEPS: OnboardingStep[] = ['personal', 'education', 'skills', 'review']

export default function Onboarding() {
  const { candidateId, registrationMethod, registrationContact, firstName: ctxFirstName, lastName: ctxLastName, dateOfBirth: ctxDateOfBirth, setCandidateData } = useAuth()
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: ctxFirstName || '',
    lastName: ctxLastName || '',
    email: registrationMethod === 'email' ? registrationContact || '' : '',
    phone: registrationMethod === 'phone' ? registrationContact || '' : '',
    dateOfBirth: ctxDateOfBirth || '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhar: '',
    pan: '',
    bankAccount: '',
    education10th: '',
    score10th: '',
    education12th: '',
    score12th: '',
    graduationDegree: '',
    graduationField: '',
    graduationScore: '',
    skills: [],
    languagesKnown: [],
    certifications: [],
    isFirstNameReadOnly: !!ctxFirstName,
    isLastNameReadOnly: !!ctxLastName,
    isDateOfBirthReadOnly: !!ctxDateOfBirth,
    isPhoneReadOnly: registrationMethod === 'phone',
    isEmailReadOnly: registrationMethod === 'email',
  })

  // Fetch candidate data on mount
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        setIsLoading(true)
        const id = candidateId || localStorage.getItem('candidateId')
        
        if (!id) {
          setFetchError('Candidate ID not found. Please start from signup.')
          return
        }

        const response = await fetch(`/api/candidates/${id}`)
        if (response.ok) {
          const data = await response.json()
          const firstName = data.firstName || ctxFirstName || ''
          const lastName = data.lastName || ctxLastName || ''
          const dateOfBirth = data.dateOfBirth || ctxDateOfBirth || ''
          
          // Store fetched data in context
          setCandidateData({
            candidateId: id,
            firstName,
            lastName,
            dateOfBirth,
          })

          setFormData((prev) => ({
            ...prev,
            firstName,
            lastName,
            dateOfBirth,
            email: registrationMethod === 'email' ? registrationContact || data.email || '' : data.email || '',
            phone: registrationMethod === 'phone' ? registrationContact || data.phoneNumber || '' : data.phoneNumber || '',
            isFirstNameReadOnly: true,
            isLastNameReadOnly: true,
            isDateOfBirthReadOnly: true,
            isPhoneReadOnly: registrationMethod === 'phone',
            isEmailReadOnly: registrationMethod === 'email',
          }))
        }
      } catch (err) {
        console.error('Error fetching candidate data:', err)
        // Don't treat as error - user can still continue with signup
      } finally {
        setIsLoading(false)
      }
    }

    fetchCandidateData()
  }, [candidateId, registrationMethod, registrationContact, ctxFirstName, ctxLastName, ctxDateOfBirth, setCandidateData])

  const handleNext = async (stepData: Partial<OnboardingData>) => {
    setError('')
    setFormData((prev) => ({ ...prev, ...stepData }))

    if (activeStep < STEPS.length - 1) {
      setActiveStep((prev) => prev + 1)
    } else {
      // Submit form
      await handleSubmit(stepData)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1))
  }

  const handleSubmit = async (finalStepData: Partial<OnboardingData>) => {
    setIsLoading(true)
    try {
      const finalData = { ...formData, ...finalStepData }

      // Get candidateId from localStorage (set after OTP verification)
      const candidateId = finalData.candidateId || localStorage.getItem('candidateId')
      if (!candidateId) {
        throw new Error('Candidate ID not found. Please start from signup.')
      }

      // Step 1: Save Personal Details
      let personalResponse = await fetch('/api/signup/personal-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId: Number(candidateId),
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          email: finalData.email,
          phone: finalData.phone,
          dateOfBirth: finalData.dateOfBirth,
          gender: finalData.gender,
          address: finalData.address,
          city: finalData.city,
          state: finalData.state,
          pincode: finalData.pincode,
          aadhar: finalData.aadhar,
          pan: finalData.pan,
          bankAccount: finalData.bankAccount,
        }),
      })

      if (!personalResponse.ok) {
        const errorData = await personalResponse.json()
        throw new Error(errorData.message || 'Failed to save personal details')
      }

      // Step 2: Save Education Details
      let educationResponse = await fetch('/api/signup/education-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId: Number(candidateId),
          education10th: finalData.education10th,
          score10th: finalData.score10th,
          education12th: finalData.education12th,
          score12th: finalData.score12th,
          graduationDegree: finalData.graduationDegree,
          graduationField: finalData.graduationField,
          graduationScore: finalData.graduationScore,
        }),
      })

      if (!educationResponse.ok) {
        const errorData = await educationResponse.json()
        throw new Error(errorData.message || 'Failed to save education details')
      }

      // Step 3: Save Skills and Languages
      let skillsResponse = await fetch('/api/signup/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId: Number(candidateId),
          skills: finalData.skills.map((skill: string) => ({
            skillName: skill,
            proficiencyLevel: 'INTERMEDIATE',
          })),
          languages: finalData.languagesKnown.map((language: string) => ({
            languageName: language,
            proficiencyLevel: 'INTERMEDIATE',
          })),
        }),
      })

      if (!skillsResponse.ok) {
        const errorData = await skillsResponse.json()
        throw new Error(errorData.message || 'Failed to save skills and languages')
      }

      // Step 4: Complete Signup
      let completeResponse = await fetch(`/api/signup/complete?candidateId=${candidateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!completeResponse.ok) {
        const errorData = await completeResponse.json()
        throw new Error(errorData.message || 'Failed to complete signup')
      }

      setSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !formData.firstName) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>Loading your profile...</Typography>
        </Box>
      </Box>
    )
  }

  if (success) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
              ✓ Profile Completed Successfully!
            </Typography>
            <Typography color="textSecondary">
              Redirecting to dashboard...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            We need more details from you
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'textSecondary' }}>
            So we understand and can help you better.
          </Typography>

          {fetchError && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {fetchError}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Personal Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Education</StepLabel>
            </Step>
            <Step>
              <StepLabel>Skills</StepLabel>
            </Step>
            <Step>
              <StepLabel>Review & Submit</StepLabel>
            </Step>
          </Stepper>

          {/* Form Content */}
          <Box sx={{ minHeight: 400, mb: 3 }}>
            {activeStep === 0 && (
              <PersonalDetailsForm
                data={formData}
                onNext={handleNext}
                isLoading={isLoading}
              />
            )}
            {activeStep === 1 && (
              <EducationDetailsForm
                data={formData}
                onNext={handleNext}
                isLoading={isLoading}
              />
            )}
            {activeStep === 2 && (
              <SkillsForm
                data={formData}
                onNext={handleNext}
                isLoading={isLoading}
              />
            )}
            {activeStep === 3 && (
              <ReviewForm
                data={formData}
                onNext={handleNext}
                isLoading={isLoading}
              />
            )}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0 || isLoading}
              onClick={handleBack}
            >
              Back
            </Button>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => (window.location.href = '/customers')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              {/* Form button handled by child components */}
            </Box>
          </Box>

          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
