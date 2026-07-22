import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  typography: {
    fontFamily: "'DM Sans Variable', sans-serif",
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0B101B',
      paper: '#121826',
    },
    divider: '#1E293B',
  },
  components: {
    // Remove shadow and add sleek dark border to Cards
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #1E293B',
          backgroundImage: 'none', // Prevents default MUI elevation overlay
        },
      },
    },
    // Modernize Buttons by removing default elevation
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          border: '1px solid #1E293B',
        },
        outlined: {
          borderColor: '#1E293B',
        },
      },
    },
    // Style Chips with subtle borders
    MuiChip: {
      styleOverrides: {
        root: {
          border: '1px solid #1E293B',
        },
      },
    },
    // Customize Table Cells to match the border palette
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1E293B',
        },
      },
    },
  },
});
