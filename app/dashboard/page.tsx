import React from 'react';
import { Box } from '@mui/material';

import DashboardHeader from '@/features/dashboard/DashboardHeader';
import DashboardMetrics from '@/features/dashboard/DashboardMetrics';
import DashboardGraphs from '@/features/dashboard/DashboardGraphs';
import DashboardTransactions from '@/features/dashboard/DashboardTransactions';

export default function DashboardPage(): React.ReactNode {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <DashboardHeader />

      <DashboardMetrics />

      <DashboardGraphs />

      <DashboardTransactions />
    </Box>
  );
}
