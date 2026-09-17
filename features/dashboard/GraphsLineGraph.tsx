import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { AccountMetricsHistory } from '@/shared/hooks/useDashboard';
import ChartCard from './GraphsChartCard';

interface DashboardLineGraphProps {
  accHistory?: AccountMetricsHistory[];
}

const MONTH_NAMES = [
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

export default function DashboardLineGraph({ accHistory = [] }: DashboardLineGraphProps) {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!accHistory.length) return [];

    return [...accHistory].reverse().map((item) => ({
      ...item,
      monthLabel: MONTH_NAMES[item.metric_month - 1],
      netTotal: item.net_worth,
      spendings: item.monthly_expense,
    }));
  }, [accHistory]);

  return (
    <ChartCard
      title="Fluxo de caixa"
      subtitle="Receitas vs. despesas nos últimos 6 meses"
      gridSize={{ xs: 12, lg: 8 }}
      chartHeight={260}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />

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

          <Area
            type="monotone"
            dataKey="netTotal"
            stroke="#22C55E"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#incomeGradient)"
          />

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
    </ChartCard>
  );
}
