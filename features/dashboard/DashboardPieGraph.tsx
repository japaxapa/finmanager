import { useMemo } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Grid } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Sector } from 'recharts';
import { MonthlyCategoryExpense } from '@/shared/lib/supabase/types/types';

interface CategoryExpensesPieChartProps {
  expensesByCategory?: MonthlyCategoryExpense[];
}

export default function CategoryExpensesPieChart({
  expensesByCategory = [],
}: CategoryExpensesPieChartProps) {
  const theme = useTheme();

  // Fallback colors for categories without a hex color specified
  const DEFAULT_COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

  const chartData = useMemo(() => {
    return expensesByCategory.map((item, index) => ({
      name: item.category_name ?? 'Sem categoria',
      value: Number(item.total_amount ?? 0),
      fill: item.category_color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
  }, [expensesByCategory, DEFAULT_COLORS]);

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Despesas por Categoria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Distribuição de gastos no mês atual
          </Typography>

          <Box sx={{ height: 300, width: '100%' }}>
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
