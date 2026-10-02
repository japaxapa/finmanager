import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F8FAFC',
          paper: '#FFFFFF',
        },
        divider: '#cfd8e3',
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
        },
        action: {
          hover: 'rgba(15, 23, 42, 0.30)',
          hoverOpacity: 0.04,
          selected: 'rgba(15, 23, 42, 0.50)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#0B101B',
          paper: '#121826',
        },
        divider: '#253247',
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
        },
        action: {
          hover: 'rgba(255, 255, 255, 0.25)',
          hoverOpacity: 0.08,
          selected: 'rgba(255, 255, 255, 0.40)',
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
