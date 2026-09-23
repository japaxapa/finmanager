'use client';
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  // Box
} from '@mui/material';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FinIcon from '@/shared/components/UI/FinIcons';

export interface MetricCardProps {
  title: string;
  amount: string | number;
  trendPercentage?: number;
  trendType?: 'up' | 'down';
  icon?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  // trendPercentage,
  // trendType,
  icon,
}) => {
  // const isUp = trendType === 'up';

  // Format the percentage display (e.g. 12.4 -> "+12,4%" or "-3,2%")
  // const formattedPercentage = `${isUp ? '+' : '-'}${Math.abs(trendPercentage)
  //   .toFixed(1)
  //   .replace('.', ',')}%`;

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
          {icon && FinIcon(icon)}
        </Stack>

        {/* Main Content: Amount & Trend Badge */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '1.75rem', lg: '1.25rem' } }}
          >
            {`R$ ${amount}`}
          </Typography>

          {/* Trend Badge */}
          {/* <Box
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
          </Box> */}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
