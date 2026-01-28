import { Box, Typography, Card, CardContent } from '@mui/material'

export default function Customers() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Customers Management
      </Typography>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Customers page - More features coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
