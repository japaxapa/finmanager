import { Stack, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function DashboardHeader() {
  {
    /* 1. Header Row */
  }

  // TODO new transaction
  // CHECK if it would be better to redirect to transactions or to create a modal

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        mb: 4,
      }}
      spacing={2}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: '#2563EB',
          '&:hover': { bgcolor: '#1D4ED8' },
          borderRadius: 2,
          px: 2.5,
          py: 1,
          textTransform: 'none',
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        Nova transação
      </Button>
    </Stack>
  );
}
