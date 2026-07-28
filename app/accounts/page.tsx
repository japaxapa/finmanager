import React from 'react';
import { Box } from '@mui/material';
import AccountHeader from '@/features/accounts/AccountsHeader';
import AccountsMetrics from '@/features/accounts/AccountsMetrics';
import AccountsContent from '@/features/accounts/AccountsContent';

export const AccountsPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#0B0F17', color: '#E2E8F0', minHeight: '100vh', p: 4 }}>
      <AccountHeader />

      <AccountsMetrics />

      <AccountsContent />
    </Box>
  );
};

export default AccountsPage;
