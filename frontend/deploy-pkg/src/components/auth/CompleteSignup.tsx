import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAuth } from '@context/AuthContext'

interface CompleteSignupProps {
  contact: string
  contactType: 'email' | 'mobile'
  onSubmit: (userData: { fullName: string; dateOfBirth: string; contact: string; contactType: string }) => void
  isLoading?: boolean
}

export default function CompleteSignup({
  contact,
  contactType,
  onSubmit,
  isLoading = false,
}: CompleteSignupProps) {
  const { setCandidateData } = useAuth()
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim()) {
      setError('Please enter your full name')
      return
    }

    if (fullName.trim().length < 3) {
      setError('Full name must be at least 3 characters')
      return
    }

    if (!dateOfBirth) {
      setError('Please select your date of birth')
      return
    }

    // Parse first and last name from full name
    const parts = fullName.trim().split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ')

    // Store in context
    setCandidateData({
      firstName,
      lastName,
      dateOfBirth,
    })

    onSubmit({
      fullName: fullName.trim(),
      dateOfBirth,
      contact,
      contactType,
    })
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Card
          sx={{
            width: '100%',
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img 
                src="/assets/magic-bus-logo.png" 
                alt="Magic Bus Logo" 
                style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
              />
            </Box>

            {/* Success Icon */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CheckCircleIcon
                sx={{
                  fontSize: 60,
                  color: 'success.main',
                  mb: 2,
                }}
              />
            </Box>

            {/* Header */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Almost There!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Let us know your name to complete your profile
              </Typography>
            </Box>

            {/* Verified Contact Display */}
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2">
                ✓ {contactType === 'email' ? 'Email' : 'Mobile'} verified successfully
              </Typography>
            </Alert>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  setError('')
                }}
                disabled={isLoading}
                sx={{ mb: 3 }}
                variant="outlined"
                size="medium"
              />

              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value)
                  setError('')
                }}
                disabled={isLoading}
                sx={{ mb: 3 }}
                variant="outlined"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <PersonAddIcon sx={{ mr: 1 }} />
                    Complete Registration
                  </>
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                Your account will be created with {contactType} verified
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
