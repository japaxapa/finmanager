import { Box, Typography } from '@mui/material';
import AccountModal from './AccountModal';

export default function AccountHeader() {
  {
    /* Page Header */
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" color="#ffffff" sx={{ fontWeight: 700 }}>
        Contas
      </Typography>
      <AccountModal title="Nova Conta" />
    </Box>
  );
}
