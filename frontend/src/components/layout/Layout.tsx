import { Box, AppBar, Toolbar, Typography, Container, useMediaQuery, useTheme, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '100%',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            {/* Hamburger Menu for Mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleToggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <img 
                src="/assets/magic-bus-logo.png" 
                alt="Magic Bus Logo" 
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  display: { xs: 'none', sm: 'block' } 
                }}
              >
                Magic Bus Dashboard
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
