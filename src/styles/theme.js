import { createTheme } from '@mui/material/styles';

// Профессиональная палитра цветов - технологичные синие и нейтральные серые
const lightPalette = {
  primary: {
    main: '#2563EB',        // Modern blue
    light: '#60A5FA',       // Light blue
    dark: '#1E40AF',        // Dark blue
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#64748B',        // Neutral slate
    light: '#94A3B8',
    dark: '#334155',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8FAFC',     // Soft light gray
    paper: '#FFFFFF',       // Pure white
  },
  text: {
    primary: '#1E293B',     // Dark slate
    secondary: '#64748B',   // Medium slate
    disabled: '#94A3B8',    // Light slate
  },
  divider: '#E2E8F0',       // Light border
  success: {
    main: '#10B981',
    light: '#6EE7B7',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
  },
  error: {
    main: '#EF4444',
    light: '#FCA5A5',
  },
  info: {
    main: '#3B82F6',
    light: '#93C5FD',
  },
};

const darkPalette = {
  primary: {
    main: '#3B82F6',        // Slightly lighter blue for dark mode
    light: '#60A5FA',
    dark: '#1E40AF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#94A3B8',        // Light slate for dark mode
    light: '#CBD5E1',
    dark: '#64748B',
    contrastText: '#1E293B',
  },
  background: {
    default: '#0F172A',     // Very dark blue-slate
    paper: '#1E293B',       // Dark slate
  },
  text: {
    primary: '#F1F5F9',     // Light slate text
    secondary: '#CBD5E1',   // Medium light slate
    disabled: '#64748B',    // Medium slate
  },
  divider: '#334155',       // Dark border
  success: {
    main: '#10B981',
    light: '#6EE7B7',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
  },
  error: {
    main: '#EF4444',
    light: '#FCA5A5',
  },
  info: {
    main: '#3B82F6',
    light: '#93C5FD',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
      color: '#64748B',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 500,
      color: '#64748B',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1E293B',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
          borderBottom: '1px solid #E2E8F0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          },
        },
        outlined: {
          borderColor: '#E2E8F0',
          '&:hover': {
            backgroundColor: '#F8FAFC',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
            borderColor: '#CBD5E1',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          border: '1px solid #E2E8F0',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F8FAFC',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.875rem',
          height: 28,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
      color: '#CBD5E1',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 500,
      color: '#CBD5E1',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          color: '#F1F5F9',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid #334155',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          },
        },
        outlined: {
          borderColor: '#334155',
          '&:hover': {
            backgroundColor: '#334155',
            borderColor: '#475569',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            borderColor: '#475569',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          backgroundImage: 'none',
          border: '1px solid #334155',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0F172A',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#1E293B',
            },
            '&.Mui-focused': {
              backgroundColor: '#1E293B',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.875rem',
          height: 28,
        },
      },
    },
  },
});
