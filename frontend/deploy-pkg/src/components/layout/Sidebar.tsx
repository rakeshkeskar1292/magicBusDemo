import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const DRAWER_WIDTH = 280
const MINI_DRAWER_WIDTH = 72

const menuItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { label: 'Customers', icon: PeopleIcon, path: '/customers' },
  { label: 'Settings', icon: SettingsIcon, path: '/settings' },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleNavigate = (path: string) => {
    navigate(path)
    if (isMobile) {
      onClose()
    }
  }

  // Full drawer content (for mobile and expanded desktop)
  const fullDrawer = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        p: 2,
      }}
    >
      {/* Close button for mobile */}
      {isMobile && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={onClose} aria-label="close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
        </>
      )}
      
      {/* Logo for sidebar */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <img 
          src="/assets/magic-bus-logo.png" 
          alt="Magic Bus Logo" 
          style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
        />
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigate(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  // Mini drawer content (icons only for collapsed desktop)
  const miniDrawer = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Mini Logo */}
      <Box sx={{ mb: 3 }}>
        <img 
          src="/assets/magic-bus-logo.png" 
          alt="Magic Bus Logo" 
          style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
        />
      </Box>
      
      <List sx={{ width: '100%' }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ justifyContent: 'center' }}>
            <Tooltip title={item.label} placement="right" arrow>
              <ListItemButton 
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  mx: 1,
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <item.icon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  // Mobile: Slide-in drawer overlay
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
          },
        }}
      >
        {fullDrawer}
      </Drawer>
    )
  }

  // Desktop: Full sidebar when open, mini sidebar when collapsed
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {open ? fullDrawer : miniDrawer}
    </Drawer>
  )
}
