import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Grid,
  Chip,
  Stack,
  Typography,
  Alert,
} from '@mui/material'

interface SkillsFormProps {
  data: any
  onNext: (data: any) => void
  isLoading: boolean
}

const PREDEFINED_SKILLS = [
  'JavaScript',
  'Python',
  'Java',
  'React',
  'Node.js',
  'SQL',
  'HTML/CSS',
  'C++',
  'Data Analysis',
  'Excel',
  'Communication',
  'Leadership',
  'Problem Solving',
  'Digital Marketing',
  'Mobile Development',
]

const PREDEFINED_LANGUAGES = [
  'English',
  'Hindi',
  'Marathi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Bengali',
  'Punjabi',
]

export default function SkillsForm({
  data,
  onNext,
  isLoading,
}: SkillsFormProps) {
  const [formData, setFormData] = useState({
    skills: data.skills || [],
    languagesKnown: data.languagesKnown || [],
    certifications: data.certifications || [],
  })

  const [skillInput, setSkillInput] = useState('')
  const [certInput, setCertInput] = useState('')

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill),
    }))
  }

  const handleAddLanguage = (language: string) => {
    if (!formData.languagesKnown.includes(language)) {
      setFormData((prev) => ({
        ...prev,
        languagesKnown: [...prev.languagesKnown, language],
      }))
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languagesKnown: prev.languagesKnown.filter((l: string) => l !== language),
    }))
  }

  const handleAddCertification = (cert: string) => {
    const trimmed = cert.trim()
    if (trimmed && !formData.certifications.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, trimmed],
      }))
      setCertInput('')
    }
  }

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c: string) => c !== cert),
    }))
  }

  const handleSubmit = () => {
    onNext(formData)
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Skills Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Technical & Professional Skills
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="Type a skill (e.g., JavaScript)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddSkill(skillInput)
                  e.preventDefault()
                }
              }}
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              onClick={() => handleAddSkill(skillInput)}
              disabled={!skillInput.trim()}
            >
              Add
            </Button>
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Suggested Skills:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {PREDEFINED_SKILLS.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => handleAddSkill(skill)}
                variant={
                  formData.skills.includes(skill) ? 'filled' : 'outlined'
                }
                color={formData.skills.includes(skill) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Skills:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
            {formData.skills.map((skill: string) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Languages Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Languages Known
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {PREDEFINED_LANGUAGES.map((language) => (
              <Chip
                key={language}
                label={language}
                onClick={() => handleAddLanguage(language)}
                variant={
                  formData.languagesKnown.includes(language)
                    ? 'filled'
                    : 'outlined'
                }
                color={
                  formData.languagesKnown.includes(language)
                    ? 'primary'
                    : 'default'
                }
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Languages:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
            {formData.languagesKnown.map((language: string) => (
              <Chip
                key={language}
                label={language}
                onDelete={() => handleRemoveLanguage(language)}
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Certifications Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Certifications (Optional)
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="Type a certification (e.g., AWS Certified)"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCertification(certInput)
                  e.preventDefault()
                }
              }}
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              onClick={() => handleAddCertification(certInput)}
              disabled={!certInput.trim()}
            >
              Add
            </Button>
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Added Certifications:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
            {formData.certifications.map((cert: string) => (
              <Chip
                key={cert}
                label={cert}
                onDelete={() => handleRemoveCertification(cert)}
                color="success"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" disabled={isLoading}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
            size="large"
          >
            Review & Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
