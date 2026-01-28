import { Box, Typography } from '@mui/material'

export default function TrendChart() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Monthly Trend
      </Typography>
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
        }}
      >
        <Typography color="textSecondary">Chart placeholder</Typography>
      </Box>
    </Box>
  )
}
