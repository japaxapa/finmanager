import { Stack, Typography } from '@mui/material';
import TransactionModal from '../transactions/TransactionModal';

export default function DashboardHeader() {
  {
    /* 1. Header Row */
  }

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
      <TransactionModal />
    </Stack>
  );
}
