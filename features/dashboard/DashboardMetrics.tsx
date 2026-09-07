import MetricCard from '@/features/dashboard/MetricCard';
import { Grid } from '@mui/material';
import { AccountMetricsHistory } from '@/shared/hooks/useDashboard';

export default function DashboardMetrics({ accMetric }: { accMetric?: AccountMetricsHistory }) {
  {
    /* 2. Top Summary Metric Cards */
  }

  // Calculate dynamic savings value if data is present
  const netSavings = accMetric ? accMetric.monthly_income - accMetric.monthly_expense : 0;

  // Map configuration titles to their respective keys/values from accMetric
  const METRIC_CONFIG = [
    {
      title: 'SALDO TOTAL',
      icon: 'wallet',
      amount: accMetric?.net_worth ?? 0,
    },
    {
      title: 'RECEITAS (MÊS)',
      icon: 'income',
      amount: accMetric?.monthly_income ?? 0,
    },
    {
      title: 'DESPESAS (MÊS)',
      icon: 'expense',
      amount: accMetric?.monthly_expense ?? 0,
    },
    {
      title: 'ECONOMIA',
      icon: 'savings',
      amount: netSavings.toFixed(2),
    },
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {METRIC_CONFIG.map((metric, idx) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={idx}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}
