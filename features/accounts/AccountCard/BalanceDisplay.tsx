import React from 'react';
import { Box, Typography } from '@mui/material';
import { BalanceDisplayProps } from '.';

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  formattedBalance,
  label = 'Current Balance',
}) => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontWeight: 500, display: 'block' }}
      >
        {label}
      </Typography>
      <Typography variant="h5" component="div" color="text.primary" sx={{ fontWeight: 700 }}>
        {formattedBalance}
      </Typography>
    </Box>
  );
};
