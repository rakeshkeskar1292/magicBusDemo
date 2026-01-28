import { Box, Button, Card, CardContent, Grid, Typography, Chip, Stack, Divider } from '@mui/material'

interface ReviewFormProps {
  data: any
  onNext: (data: any) => void
  isLoading: boolean
}

export default function ReviewForm({
  data,
  onNext,
  isLoading,
}: ReviewFormProps) {
  const handleSubmit = () => {
    onNext({})
  }

  const SectionCard = ({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Review Your Information
      </Typography>

      {/* Personal Details */}
      <SectionCard title="Personal Details">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.firstName} {data.lastName}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Phone
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Gender
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
              {data.gender}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Date of Birth
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {new Date(data.dateOfBirth).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.city}, {data.state} - {data.pincode}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Address
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.address}
            </Typography>
          </Grid>

          {data.aadhar && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Aadhar Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.aadhar}
              </Typography>
            </Grid>
          )}

          {data.pan && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                PAN Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.pan}
              </Typography>
            </Grid>
          )}
        </Grid>
      </SectionCard>

      {/* Education Details */}
      <SectionCard title="Education Details">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              10th Education
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.education10th} - {data.score10th}
            </Typography>
          </Grid>

          {data.education12th && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                12th Education
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.education12th} - {data.score12th}
              </Typography>
            </Grid>
          )}

          {data.graduationDegree && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Graduation
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {data.graduationDegree} in {data.graduationField} ({data.graduationScore})
              </Typography>
            </Grid>
          )}
        </Grid>
      </SectionCard>

      {/* Skills & Languages */}
      <SectionCard title="Skills & Languages">
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Technical & Professional Skills
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {data.skills.map((skill: string) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Languages Known
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {data.languagesKnown.map((lang: string) => (
              <Chip
                key={lang}
                label={lang}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Box>

        {data.certifications.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Certifications
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {data.certifications.map((cert: string) => (
                <Chip
                  key={cert}
                  label={cert}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </SectionCard>

      <Divider sx={{ my: 3 }} />

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" disabled={isLoading}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          size="large"
        >
          {isLoading ? 'Submitting...' : 'Submit & Onboard Candidate'}
        </Button>
      </Box>
    </Box>
  )
}
