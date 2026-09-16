import React from 'react';
import { Box } from '@mui/material';

import DashboardTransactions from '@/features/dashboard/Transactions';
import DashboardContent from '@/features/dashboard/content/Content';
import DashboardHeader from '@/features/dashboard/Header';

export default function DashboardPage(): React.ReactNode {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <DashboardHeader />

      <DashboardContent />

      <DashboardTransactions />
    </Box>
  );
}
