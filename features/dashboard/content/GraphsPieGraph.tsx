import { useMemo } from 'react';
import { useTheme, Box, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Sector, ResponsiveContainer } from 'recharts';
import ChartCard from './GraphsChartCard';
import { MonthlyCategoryExpense } from '@/shared/lib/supabase/types/types';

interface CategoryExpensesPieChartProps {
  expensesByCategory?: MonthlyCategoryExpense[];
}

const DEFAULT_COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

export default function CategoryExpensesPieChart({
  expensesByCategory = [],
}: CategoryExpensesPieChartProps) {
  const theme = useTheme();

  const chartData = useMemo(() => {
    return expensesByCategory.map((item, index) => ({
      name: item.category_name ?? 'Sem categoria',
      value: Number(item.total_amount ?? 0),
      fill: item.category_color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
  }, [expensesByCategory]);

  const hasExpenses = useMemo(() => {
    return chartData.length > 0 && chartData.some((item) => item.value > 0);
  }, [chartData]);

  return (
    <ChartCard
      title="Despesas por Categoria"
      subtitle="Distribuição de gastos no mês atual"
      gridSize={{ xs: 12, lg: 4 }}
      chartHeight={300}
    >
      {hasExpenses ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              shape={(props) => <Sector {...props} fill={props.payload.fill} />}
            />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  Number(value ?? 0),
                ),
                'Gasto',
              ]}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                borderRadius: '8px',
                boxShadow: theme.shadows[3],
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        /* Rendered as raw JSX element inside ChartCard, bypassing Recharts wrapper quirks */
        <EmptyStateMessage />
      )}
    </ChartCard>
  );
}

function EmptyStateMessage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        Nenhuma despesa encontrada para este período.
      </Typography>
    </Box>
  );
}
