import { Grid } from '@mui/material';
import DashboardLineGraph from './DashboardLineGraph';
import DashboardPieGraph from './DashboardPieGraph';
import { AccountMetricsHistory } from '@/shared/hooks/useDashboard';
import { MonthlyCategoryExpense } from '@/shared/lib/supabase/types/types';

interface DashboardGraphsProps {
  accHistory?: AccountMetricsHistory[];
  expensesByCategory?: MonthlyCategoryExpense[];
}

export default function DashboardGraphs({ accHistory, expensesByCategory }: DashboardGraphsProps) {
  {
    /* 3. Middle Analytics Charts Row */
  }
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      <DashboardLineGraph accHistory={accHistory} />

      <DashboardPieGraph expensesByCategory={expensesByCategory} />
    </Grid>
  );
}
