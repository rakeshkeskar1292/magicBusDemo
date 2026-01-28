import { Box, Typography, Card, CardContent } from '@mui/material'

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Settings page - More features coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
