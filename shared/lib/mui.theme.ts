import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F8FAFC',
          paper: '#FFFFFF',
        },
        divider: '#E2E8F0',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#0B101B',
          paper: '#121826',
        },
        divider: '#1E293B',
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
        },
      },
    },
  },
  typography: {
    fontFamily: "'DM Sans Variable', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '& > :not(style) ~ :not(style)': {
            marginTop: '0px',
          },
        },
      },
    },
  },
});
