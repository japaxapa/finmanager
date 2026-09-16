import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Sector } from 'recharts';
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

  return (
    <ChartCard
      title="Despesas por Categoria"
      subtitle="Distribuição de gastos no mês atual"
      gridSize={{ xs: 12, lg: 4 }}
      chartHeight={300}
    >
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
    </ChartCard>
  );
}
