import React from 'react';
import { Box } from '@mui/material';

import TransactionsHeader from '@/features/transactions/TransactionsHeader';
import TransactionsMetrics from '@/features/transactions/TransactionsMetrics';
import TransactionsContent from '@/features/transactions/TransactionsContent';

export const TransactionsPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        color: 'text,primary',
        p: { xs: 2, md: 4 },
        fontFamily: 'sans-serif',
      }}
    >
      <TransactionsHeader />

      <TransactionsMetrics />

      <TransactionsContent />
    </Box>
  );
};

export default TransactionsPage;
