'use client';

import { Grid, Paper, Stack, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMemo } from 'react';
import { useTransactionSummary } from '@/shared/hooks/useTransactions';

// TODO check metrics cards
// TODO make cards dynamically

export default function TransactionsMetrics() {
  {
    /* Summary KPI Cards */
  }

  // TODO check if is needed somethink for loading state UI/UX
  const { data: summaryData } = useTransactionSummary();

  // Totals calculated dynamically
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return {
      totalIncome: summaryData?.totalIncome ?? 0,
      totalExpense: summaryData?.totalExpense ?? 0,
      balance: summaryData?.netBalance ?? 0,
    };
  }, [summaryData]);

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            backgroundColor: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', aligntItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Saldo em Movimento
            </Typography>
            <AccountBalanceWalletIcon sx={{ color: '#3B82F6', fontSize: 20 }} />
          </Stack>
          <Typography variant="h5" sx={{ mt: 1.5, fontWeight: 700, fontFamily: 'monospace' }}>
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            backgroundColor: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Entradas (Mês)
            </Typography>
            <ArrowUpwardIcon sx={{ color: '#10B981', fontSize: 20 }} />
          </Stack>
          <Typography
            variant="h5"
            sx={{ mt: 1.5, fontWeight: 700, color: '#10B981', fontFamily: 'monospace' }}
          >
            + R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            backgroundColor: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Saídas (Mês)
            </Typography>
            <ArrowDownwardIcon sx={{ color: '#F87171', fontSize: 20 }} />
          </Stack>
          <Typography
            variant="h5"
            sx={{ mt: 1.5, fontWeight: 700, color: '#F87171', fontFamily: 'monospace' }}
          >
            - R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
