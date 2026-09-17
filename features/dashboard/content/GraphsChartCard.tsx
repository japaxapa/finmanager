import { ReactNode } from 'react';
import { Grid, Card, CardContent, Box, Typography } from '@mui/material';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  gridSize?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  chartHeight?: number | string;
  children: ReactNode;
}

export default function ChartCard({
  title,
  subtitle,
  gridSize = { xs: 12, lg: 6 },
  chartHeight = 260,
  children,
}: ChartCardProps) {
  return (
    <Grid size={gridSize}>
      <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ mb: subtitle ? 2 : 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box sx={{ height: chartHeight, width: '100%', flexGrow: 1 }}>{children}</Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
