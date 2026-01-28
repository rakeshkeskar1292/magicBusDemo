import { useState, useEffect } from 'react'
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
  LinearProgress,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'
import { useAuth } from '@context/AuthContext'

interface OTPVerificationProps {
  contactType: 'email' | 'mobile'
  contact: string
  onVerify: (otp: string) => void
  onEdit: () => void
  isLoading?: boolean
}

const OTP_RESEND_TIME = 30 // seconds

export default function OTPVerification({
  contactType,
  contact,
  onVerify,
  onEdit,
  isLoading = false,
}: OTPVerificationProps) {
  const { setCandidateData } = useAuth()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_TIME)
  const [canResend, setCanResend] = useState(false)

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!otp.trim()) {
      setError('Please enter the OTP')
      return
    }

    if (otp.length < 4) {
      setError('OTP must be at least 4 digits')
      return
    }

    // Save registration method and contact to context
    setCandidateData({
      registrationMethod: contactType === 'email' ? 'email' : 'phone',
      registrationContact: contact,
    })

    // Let backend validate the OTP
    onVerify(otp)
  }

  const handleResend = () => {
    setOtp('')
    setError('')
    setCanResend(false)
    setResendTimer(OTP_RESEND_TIME)
  }

  const maskedContact =
    contactType === 'email'
      ? contact.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      : `****${contact.slice(-4)}`

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
                Verify Your {contactType === 'email' ? 'Email' : 'Phone'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                We've sent an OTP to:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  wordBreak: 'break-all',
                }}
              >
                {maskedContact}
              </Typography>
            </Box>

            {/* OTP Progress Indicator */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="textSecondary">
                OTP expires in: {resendTimer}s
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(resendTimer / OTP_RESEND_TIME) * 100}
                sx={{ mt: 1 }}
              />
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
                label="Enter OTP"
                placeholder="0000"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setOtp(val)
                  setError('')
                }}
                inputProps={{
                  maxLength: 4,
                  style: {
                    fontSize: '1.5rem',
                    letterSpacing: '0.5rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  },
                }}
                disabled={isLoading}
                sx={{
                  mb: 2,
                  '& input': {
                    textAlign: 'center',
                  },
                }}
                type="text"
                inputMode="numeric"
                variant="outlined"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading || otp.length !== 4}
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LockIcon sx={{ mr: 1 }} />
                    Verify OTP
                  </>
                )}
              </Button>
            </form>

            {/* Resend OTP */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              {canResend ? (
                <Button
                  onClick={handleResend}
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    color: 'primary.main',
                  }}
                >
                  Resend OTP
                </Button>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Resend OTP in {resendTimer}s
                </Typography>
              )}
            </Box>

            {/* Edit Contact */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                onClick={onEdit}
                variant="text"
                size="small"
                sx={{
                  textTransform: 'none',
                }}
              >
                Use different {contactType}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
