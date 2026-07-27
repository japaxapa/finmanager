import MetricCard from '@/features/dashboard/MetricCard';
import { Grid } from '@mui/material';
import { METRIC_DATA } from './mock.data';

export default function DashboardMetrics() {
  {
    /* 2. Top Summary Metric Cards */
  }
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {METRIC_DATA.map((metric, idx) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={idx}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}
