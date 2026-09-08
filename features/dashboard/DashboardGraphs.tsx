import { Grid } from '@mui/material';
import DashboardLineGraph from './DashboardLineGraph';
import DashboardPieGraph from './DashboardPieGraph';
import { AccountMetricsHistory } from '@/shared/hooks/useDashboard';

interface DashboardGraphsProps {
  accHistory?: AccountMetricsHistory[];
}

export default function DashboardGraphs({ accHistory }: DashboardGraphsProps) {
  {
    /* 3. Middle Analytics Charts Row */
  }
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      <DashboardLineGraph accHistory={accHistory} />

      <DashboardPieGraph />
    </Grid>
  );
}
