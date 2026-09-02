'use client';

import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { AccountUpdate, AccountWithBalance } from '@/shared/lib/supabase/types/types';
import AccountRow from './AccountRow';
import { useState } from 'react';
import AccountModal from './AccountModal';
import { sanitizeAccount } from '@/shared/utils/utils';
import { useDeleteAccount } from '@/shared/hooks/useAccounts';
import GenericDeleteModal from '@/shared/components/UI/GenericDeleteModal';

interface IAccountsTable {
  accounts: AccountWithBalance[];
}

// TODO loading and error handling
export default function AccountsTable({ accounts = [] }: IAccountsTable) {
  {
    /* Details Table Section */
  }

  // CRUD states
  const [modalOpen, setModalOpen] = useState(false);
  const [accountToUpdate, setAccountToUpdate] = useState<AccountUpdate | undefined>(undefined);
  const [accountToDelete, setAccountToDelete] = useState<AccountWithBalance | undefined>(undefined);

  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleClose = () => {
    setModalOpen(false);
    setAccountToUpdate(undefined);
    setAccountToDelete(undefined);
  };

  const onEdit = (account: AccountWithBalance) => {
    setModalOpen(true);
    setAccountToUpdate(sanitizeAccount(account));
  };

  const onDelete = (account: AccountWithBalance) => {
    setAccountToDelete(account);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#111827',
        border: '1px solid #1F2937',
        borderRadius: 3,
        p: 3,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="#ffffff" sx={{ fontWeight: 700 }}>
          Detalhes das contas
        </Typography>
        <Typography variant="body2" color="#9CA3AF">
          Visão geral de todas as suas contas
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                '& th': { borderBottom: '1px solid #1F2937', color: '#9CA3AF', fontWeight: 600 },
              }}
            >
              <TableCell>Conta</TableCell>
              <TableCell>Instituição</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right" width={50}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((acc) => (
              <AccountRow account={acc} key={acc.id} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AccountModal
        title="Editar Conta"
        accountToEdit={accountToUpdate}
        open={modalOpen}
        handleClose={handleClose}
      />

      <GenericDeleteModal
        item={accountToDelete}
        itemName={accountToDelete?.name ?? ''}
        title="Deletar Conta?"
        isLoading={isDeleting}
        handleClose={handleClose}
        onConfirm={async (acc) => {
          if (acc.id) await deleteAccount(acc.id);
        }}
      />
    </Paper>
  );
}
