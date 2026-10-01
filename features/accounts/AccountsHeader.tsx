import { Stack, Typography } from '@mui/material';
import AccountModal from './AccountModal';

export default function AccountHeader() {
  {
    /* Page Header */
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
        Contas
      </Typography>
      <AccountModal title="Nova Conta" />
    </Stack>
  );
}
