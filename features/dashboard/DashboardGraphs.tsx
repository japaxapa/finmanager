import { Grid, Card, CardContent, Box, Typography, Stack } from '@mui/material';
import { CATEGORY_BREAKDOWN } from './mock.data';

export default function DashboardGraphs() {
  {
    /* 3. Middle Analytics Charts Row */
  }
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {/* Cash Flow Line Chart Card */}
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

            {/* Cash Flow Visual Chart Area */}
            <Box
              sx={{
                height: 240,
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                pt: 2,
                px: 1,
                borderBottom: '1px dashed',
                borderColor: 'divider',
                position: 'relative',
              }}
            >
              {/* SVG Curves placeholder representing Income & Expense trends */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'visible',
                }}
                preserveAspectRatio="none"
                viewBox="0 0 500 200"
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Income Line (Green) */}
                <path
                  d="M 0 120 Q 125 100 250 140 T 500 40 L 500 200 L 0 200 Z"
                  fill="url(#incomeGradient)"
                />
                <path
                  d="M 0 120 Q 125 100 250 140 T 500 40"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                />

                {/* Expense Line (Blue) */}
                <path
                  d="M 0 150 Q 125 140 250 160 T 500 130"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                />
              </svg>

              {/* X-Axis Month Labels */}
              {['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((month) => (
                <Typography key={month} variant="caption" color="text.secondary" sx={{ zIndex: 1 }}>
                  {month}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Expenses by Category Donut Chart Card */}
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
    </Grid>
  );
}
