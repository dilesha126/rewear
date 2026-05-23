import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: { main: '#4F46E5', light: '#818CF8' },
    secondary: { main: '#10B981', light: '#34D399' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    success: { main: '#059669' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    text: { primary: '#1E293B', secondary: '#64748B' }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.2 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '14px 28px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0 4px 14px 0 rgb(0 0 0 / 10%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 40px rgb(0 0 0 / 8%)',
          transition: 'all 0.3s ease'
        }
      }
    }
  }
});