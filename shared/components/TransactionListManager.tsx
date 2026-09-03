'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TransactionRow } from '@/shared/components/TransactionRow';
import { Transaction, TransactionUpdate } from '@/shared/lib/supabase/types/types';
import { useDeleteTransaction } from '@/shared/hooks/useTransactions';
import GenericDeleteModal from '@/shared/components/UI/GenericDeleteModal';
import TransactionModal from '@/features/transactions/TransactionModal';

export interface TransactionWithCategory extends Transaction {
  categories?: {
    name?: string | null;
  } | null;
}

interface ITransactionListProps {
  transactions: TransactionWithCategory[];
  emptyMessage?: string;
}

export function TransactionList({
  transactions,
  emptyMessage = 'Nenhuma transação encontrada com os filtros selecionados.',
}: ITransactionListProps) {
  // Modal & CRUD states local to the list component
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionToUpdate, setTransactionToUpdate] = useState<TransactionUpdate | undefined>();
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | undefined>();

  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

  const handleCloseModals = () => {
    setModalOpen(false);
    setTransactionToUpdate(undefined);
    setTransactionToDelete(undefined);
  };

  const handleEdit = (tx: TransactionUpdate) => {
    setTransactionToUpdate(tx);
    setModalOpen(true);
  };

  const handleDeleteClick = (tx: Transaction) => {
    setTransactionToDelete(tx);
  };

  const handleConfirmDelete = async (tx: Transaction) => {
    await deleteTransaction(tx.id);
    handleCloseModals();
  };

  return (
    <>
      <Box>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              category={tx.categories?.name ?? ''}
              transaction={tx}
              onEdit={() => handleEdit(tx)}
              onDelete={() => handleDeleteClick(tx)}
            />
          ))
        ) : (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              {emptyMessage}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Edit Modal */}
      <TransactionModal
        title="Editar Transação"
        transactionToEdit={transactionToUpdate}
        open={modalOpen}
        handleClose={handleCloseModals}
      />

      {/* Delete Modal */}
      <GenericDeleteModal
        item={transactionToDelete}
        itemName={transactionToDelete?.title}
        title="Deletar Transação?"
        isLoading={isDeleting}
        handleClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
