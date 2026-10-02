import React from 'react';
import { Box } from '@mui/material';
import AccountHeader from '@/features/accounts/AccountsHeader';
import AccountsContent from '@/features/accounts/AccountsContent';
import AccountsMetrics from '@/features/accounts/AccountsMetrics';

export const AccountsPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', p: 4 }}>
      <AccountHeader />
      <AccountsMetrics />
      <AccountsContent />
    </Box>
  );
};

export default AccountsPage;
