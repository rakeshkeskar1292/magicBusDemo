import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { ErrorProvider } from '@context/ErrorContext'
import { AuthProvider } from '@context/AuthContext'
import ErrorNotification from '@components/common/ErrorNotification'
import Layout from '@components/layout/Layout'
import Dashboard from '@pages/Dashboard'
import Customers from '@pages/Customers'
import Settings from '@pages/Settings'
import IndividualSignup from '@pages/auth/IndividualSignup'
import Onboarding from '@pages/Onboarding'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorNotification />
          <BrowserRouter>
            <Routes>
            {/* Auth Routes (without layout) */}
            <Route path="individualsignup" element={<IndividualSignup />} />
            <Route path="onboard" element={<Onboarding />} />

          {/* Dashboard Routes (with layout) */}
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
