import { Stack, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

export default function TransactionsHeader() {
  {
    /* Header Section */
  }
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        mb: 4,
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' }}
        >
          Transações
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
          Histórico detalhado e movimentações da sua conta
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.5}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#94A3B8',
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            },
          }}
        >
          Exportar
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#2563EB',
            color: '#FFF',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            px: 2.5,
            '&:hover': {
              backgroundColor: '#1D4ED8',
            },
          }}
        >
          Nova transação
        </Button>
      </Stack>
    </Stack>
  );
}
