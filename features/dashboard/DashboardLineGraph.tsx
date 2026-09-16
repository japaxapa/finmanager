import { useMemo } from 'react';
import { Grid, Card, CardContent, Box, Typography, useTheme } from '@mui/material';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { AccountMetricsHistory } from '@/shared/hooks/useDashboard';

interface DashboardLineGraphProps {
  accHistory?: AccountMetricsHistory[];
}

export default function DashboardLineGraph({ accHistory = [] }: DashboardLineGraphProps) {
  const theme = useTheme();

  // Format array to reverse historical order (oldest to newest) & add month labels
  const chartData = useMemo(() => {
    if (!accHistory.length) return [];

    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    return [...accHistory]
      .reverse() // Reverse so the oldest month is on the left and current month on the right
      .map((item) => ({
        ...item,
        monthLabel: `${monthNames[item.metric_month - 1]}`,
        netTotal: item.net_worth,
        spendings: item.monthly_expense,
      }));
  }, [accHistory]);

  return (
    <Grid size={{ xs: 12, lg: 8 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Fluxo de caixa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Receitas vs. despesas nos últimos 6 meses
            </Typography>
          </Box>

          <Box sx={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme.palette.divider}
                />

                <XAxis
                  dataKey="monthLabel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  tickFormatter={(val) => `R$${val}`}
                />

                <Tooltip
                  formatter={(value, name) => [
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      Number(value ?? 0),
                    ),
                    name === 'netTotal' ? 'Saldo Total' : 'Despesas',
                  ]}
                />

                {/* Filled Area for Net Value / Income */}
                <Area
                  type="monotone"
                  dataKey="netTotal"
                  stroke="#22C55E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#incomeGradient)"
                />

                {/* Line for Spendings */}
                <Line
                  type="monotone"
                  dataKey="spendings"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#3B82F6' }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
