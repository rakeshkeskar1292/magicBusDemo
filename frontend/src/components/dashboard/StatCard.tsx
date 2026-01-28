import { Card, CardContent, Typography, Box } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

interface StatCardProps {
  title: string
  value: string
  change: string
}

export default function StatCard({ title, value, change }: StatCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ my: 2 }}>
          {value}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: isPositive ? 'success.main' : 'error.main',
          }}
        >
          <TrendingUpIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
