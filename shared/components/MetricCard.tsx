import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export interface MetricCardProps {
  /** Label/title for the metric (e.g., "Total Revenue") */
  title: string;
  /** Primary metric value or amount (e.g., "$45,231.89" or "1,245") */
  amount: string | number;
  /** Numeric percentage to display in the badge (e.g., 12.4 for +12.4%) */
  trendPercentage: number;
  /** Direction of the trend */
  trendType: 'up' | 'down';
  /** Optional icon element to show in the header */
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  trendPercentage,
  trendType,
  icon,
}) => {
  const isUp = trendType === 'up';

  // Format the percentage display (e.g. 12.4 -> "+12,4%" or "-3,2%")
  const formattedPercentage = `${isUp ? '+' : '-'}${Math.abs(trendPercentage)
    .toFixed(1)
    .replace('.', ',')}%`;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        {/* Header: Title & Optional Icon */}
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                p: 1,
                borderRadius: '50%',
              }}
            >
              {icon}
            </Box>
          )}
        </Stack>

        {/* Main Content: Amount & Trend Badge */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
            {amount}
          </Typography>

          {/* Trend Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              typography: 'caption',
              fontWeight: 700,
              bgcolor: isUp ? 'success.lighter' : 'error.lighter',
              color: isUp ? 'success.dark' : 'error.dark',
              // Fallback colors if custom theme palette isn't set
              backgroundColor: (theme) =>
                isUp
                  ? theme.palette.success.main + '1F' // ~12% opacity
                  : theme.palette.error.main + '1F',
            }}
          >
            {isUp ? <TrendingUpIcon fontSize="inherit" /> : <TrendingDownIcon fontSize="inherit" />}
            <span>{formattedPercentage}</span>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
