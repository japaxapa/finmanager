import { Grid, Card, CardContent, Box, Typography, Stack } from '@mui/material';
import { CATEGORY_BREAKDOWN } from './mock.data';

export default function DashboardPieGraph() {
  {
    /* Expenses by Category Donut Chart Card */
  }
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Despesas por categoria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dezembro de 2026
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', pt: 1 }}>
            {/* Custom Styled Donut Ring SVG */}
            <Box sx={{ width: 130, height: 130, flexShrink: 0, position: 'relative' }}>
              <svg
                viewBox="0 0 36 36"
                style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeDasharray="35 65"
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#22C55E"
                  strokeWidth="4"
                  strokeDasharray="25 75"
                  strokeDashoffset="-35"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#06B6D4"
                  strokeWidth="4"
                  strokeDasharray="15 85"
                  strokeDashoffset="-60"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#EAB308"
                  strokeWidth="4"
                  strokeDasharray="15 85"
                  strokeDashoffset="-75"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#A855F7"
                  strokeWidth="4"
                  strokeDasharray="10 90"
                  strokeDashoffset="-90"
                />
              </svg>
            </Box>

            {/* Category Legend List */}
            <Stack spacing={1} sx={{ width: '100%' }}>
              {CATEGORY_BREAKDOWN.map((cat) => (
                <Stack
                  key={cat.name}
                  direction="row"
                  sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: cat.color }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {cat.name}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 700 }} color="text.primary">
                    {cat.amount}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
