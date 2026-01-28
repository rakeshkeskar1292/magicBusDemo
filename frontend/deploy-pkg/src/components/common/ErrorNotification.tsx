import { Alert, Box, IconButton, Snackbar, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useError } from '@context/ErrorContext'

export default function ErrorNotification() {
  const { errors, removeError } = useError()

  return (
    <Stack spacing={2} sx={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      {errors.map((error) => (
        <Alert
          key={error.id}
          severity={error.type === 'error' ? 'error' : error.type === 'warning' ? 'warning' : 'info'}
          action={
            <IconButton size="small" color="inherit" onClick={() => removeError(error.id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            minWidth: 300,
            maxWidth: 500,
            boxShadow: 2,
            animation: 'slideIn 0.3s ease-in-out',
            '@keyframes slideIn': {
              from: {
                transform: 'translateX(600px)',
                opacity: 0,
              },
              to: {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Box>
            <strong>{error.title}</strong>
            <Box sx={{ fontSize: '0.875rem', mt: 0.5 }}>{error.message}</Box>
          </Box>
        </Alert>
      ))}
    </Stack>
  )
}
