import React from 'react';
import { Box } from '@mui/material';

import DashboardHeader from '@/features/dashboard/DashboardHeader';
import DashboardTransactions from '@/features/dashboard/DashboardTransactions';
import DashboardContent from '@/features/dashboard/DashboardContent';

export default function DashboardPage(): React.ReactNode {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <DashboardHeader />

      <DashboardContent />

      <DashboardTransactions />
    </Box>
  );
}
