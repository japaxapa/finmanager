'use client';

import { Card, CardContent, Stack, Box, Typography, Button, List } from '@mui/material';
import { useTransactions } from '@/shared/hooks/useTransactions';
import { TransactionList } from '@/shared/components/TransactionListManager';
import Link from 'next/link';

export default function DashboardTransactions() {
  {
    /* 4. Recent Transactions Section */
  }

  const { data: transactionsData } = useTransactions({
    page: 1,
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Transações recentes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Últimos lançamentos das suas contas
            </Typography>
          </Box>
          <Button
            size="small"
            sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}
            LinkComponent={Link}
            href="/transactions"
          >
            Ver todas
          </Button>
        </Stack>

        {/* Transactions List */}
        <List disablePadding>
          <TransactionList
            transactions={transactionsData?.data ?? []}
            emptyMessage="Nenhuma transação recente."
          />
        </List>
      </CardContent>
    </Card>
  );
}
