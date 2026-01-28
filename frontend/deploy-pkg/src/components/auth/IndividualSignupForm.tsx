import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

interface SignupFormProps {
  onSubmit: (contact: string, contactType: 'email' | 'mobile') => void
  isLoading?: boolean
}

export default function SignupForm({ onSubmit, isLoading = false }: SignupFormProps) {
  const [contactType, setContactType] = useState<'email' | 'mobile'>('email')
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile.replace(/\D/g, ''))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!contact.trim()) {
      setError(`Please enter your ${contactType}`)
      return
    }

    if (contactType === 'email' && !validateEmail(contact)) {
      setError('Please enter a valid email address')
      return
    }

    if (contactType === 'mobile' && !validateMobile(contact)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    onSubmit(contact, contactType)
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

            {/* Header */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Join Magic Bus and get started
              </Typography>
            </Box>

            {/* Contact Type Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Register with:
              </Typography>
              <ToggleButtonGroup
                value={contactType}
                exclusive
                onChange={(e, newType) => {
                  if (newType) {
                    setContactType(newType)
                    setContact('')
                    setError('')
                  }
                }}
                fullWidth
                sx={{
                  '& .MuiToggleButton-root': {
                    flex: 1,
                  },
                }}
              >
                <ToggleButton value="email" aria-label="email">
                  <EmailIcon sx={{ mr: 1 }} />
                  Email
                </ToggleButton>
                <ToggleButton value="mobile" aria-label="mobile">
                  <PhoneIcon sx={{ mr: 1 }} />
                  Mobile
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

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
                label={contactType === 'email' ? 'Email Address' : 'Mobile Number'}
                placeholder={
                  contactType === 'email' ? 'you@example.com' : '10-digit mobile number'
                }
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value)
                  setError('')
                }}
                type={contactType === 'email' ? 'email' : 'tel'}
                disabled={isLoading}
                sx={{ mb: 3 }}
                variant="outlined"
                size="medium"
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
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>

            {/* Footer Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Typography
                  component="a"
                  href="/auth/sign-in"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
