'use client';

import { TransactionRow } from '@/shared/components/TransactionRow';
import {
  Paper,
  Box,
  Tabs,
  Tab,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
  Pagination,
} from '@mui/material';
import { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDeleteTransaction, useTransactions } from '@/shared/hooks/useTransactions';
import { debounce } from '@/shared/lib/utils';
import { useCategories } from '@/shared/hooks/useCategories';
import { Transaction, TransactionUpdate } from '@/shared/lib/supabase/types/types';
import GenericDeleteModal from '@/shared/components/UI/GenericDeleteModal';
import TransactionModal from './TransactionModal';

export default function TransactionsContent() {
  {
    /* Main Content Area */
  }

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'income' | 'expense'>('ALL');

  // CRUD states
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionToUpdate, setTransactionToUpdate] = useState<TransactionUpdate | undefined>(
    undefined,
  );
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | undefined>(
    undefined,
  );

  const { data } = useTransactions({
    type: activeTab,
    search: search,
    categoryId: selectedCategory,
    page: page,
  });
  const { data: categoriesData } = useCategories();
  const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

  const filteredTransactions = data?.data ?? [];

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 700),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleClose = () => {
    setModalOpen(false);
    setTransactionToUpdate(undefined);
    setTransactionToDelete(undefined);
  };

  const onEdit = (transaction: TransactionUpdate) => {
    setModalOpen(true);
    setTransactionToUpdate(transaction);
  };

  const onDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#111827',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Controls Toolbar */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
        }}
      >
        {/* Tabs Filter */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            minHeight: '36px',
            '& .MuiTabs-indicator': { backgroundColor: '#3B82F6' },
            '& .MuiTab-root': {
              textTransform: 'none',
              minHeight: '36px',
              color: '#64748B',
              fontSize: '0.875rem',
              fontWeight: 600,
              px: 2,
              '&.Mui-selected': { color: '#F8FAFC' },
            },
          }}
        >
          <Tab label="Todas" value="ALL" />
          <Tab label="Receitas" value="income" />
          <Tab label="Despesas" value="expense" />
        </Tabs>

        {/* Search & Select */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            placeholder="Buscar transação..."
            size="small"
            value={searchTerm}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#64748B', fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: '100%', sm: '220px' },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0B0F17',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.875rem',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
              },
            }}
          />

          <Select
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            sx={{
              width: { xs: '100%', sm: '160px' },
              backgroundColor: '#0B0F17',
              borderRadius: '8px',
              color: '#F8FAFC',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.08)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.15)',
              },
              '& .MuiSvgIcon-root': { color: '#64748B' },
            }}
          >
            <MenuItem value={''}>Todas categorias</MenuItem>
            {categoriesData?.data?.map((cat) => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>

      {/* Transaction List */}
      <Box>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              category={tx.categories?.name || ''}
              transaction={tx}
              onEdit={onEdit}
              onDelete={onDelete}
              // onClick={() => console.log('Clicked transaction', tx.id)}
            />
          ))
        ) : (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Nenhuma transação encontrada com os filtros selecionados.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer / Pagination */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: '#64748B' }}>
          Exibindo {filteredTransactions.length} resultado(s)
        </Typography>

        <Pagination
          count={data?.totalPages || 1}
          page={page}
          onChange={handlePageChange}
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#64748B',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#F8FAFC',
              },
            },
          }}
        />
      </Box>

      <TransactionModal
        title={'Editar Transação'}
        transactionToEdit={transactionToUpdate}
        open={modalOpen}
        handleClose={handleClose}
      />

      <GenericDeleteModal
        item={transactionToDelete}
        itemName={transactionToDelete?.title}
        title="Deletar Transação?"
        isLoading={isDeleting}
        handleClose={handleClose}
        onConfirm={async (transaction) => {
          await deleteTransaction(transaction.id);
        }}
      />
    </Paper>
  );
}
