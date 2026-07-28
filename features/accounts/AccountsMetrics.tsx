import { Grid, Paper, Typography } from '@mui/material';

export default function AccountsMetrics() {
  {
    /* Top Summary Metrics */
  }
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#9CA3AF', letterSpacing: 1, fontWeight: 600 }}
          >
            PATRIMÔNIO LÍQUIDO
          </Typography>
          <Typography variant="h4" sx={{ color: '#22C55E', mt: 1.5, fontWeight: 700 }}>
            R$ 42.979,50
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#9CA3AF', letterSpacing: 1, fontWeight: 600 }}
          >
            CONTAS ATIVAS
          </Typography>
          <Typography variant="h4" sx={{ color: '#FFFFFF', mt: 1.5, fontWeight: 700 }}>
            4
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#9CA3AF', letterSpacing: 1, fontWeight: 600 }}
          >
            FATURA EM ABERTO
          </Typography>
          <Typography variant="h4" sx={{ color: '#EF4444', mt: 1.5, fontWeight: 700 }}>
            R$ 3.180,50
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
