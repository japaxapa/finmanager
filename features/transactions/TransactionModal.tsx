'use client';

import { FormModal } from '@/shared/components/UI/FormModal';
import { useState } from 'react';
import CreateButton from '@/shared/components/UI/CreateButton';
import { TransactionForm } from './TransactionForm';
import { TransactionUpdate } from '@/shared/lib/supabase/types/types';

interface ITransactionModalProps {
  title?: string;
  transactionToEdit?: TransactionUpdate;
  // Optional controlled props
  open?: boolean;
  handleClose?: () => void;
}

export default function TransactionModal({
  title = 'Transação',
  transactionToEdit,
  open: externalOpen,
  handleClose: externalHandleClose,
}: ITransactionModalProps) {
  // 1. Internal state for uncontrolled usage
  const [internalOpen, setInternalOpen] = useState(false);

  // 2. Determine if the component is being controlled externally
  const isControlled = typeof externalOpen !== 'undefined';
  const isOpen = isControlled ? externalOpen : internalOpen;

  // 3. Unified close handler
  const handleClose = () => {
    if (isControlled) {
      externalHandleClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {/* Show default trigger button only when used uncontrolled without an edit target */}
      {!isControlled && !transactionToEdit && (
        <CreateButton title="Nova Transação" handleClick={() => setInternalOpen(true)} />
      )}

      <FormModal open={isOpen} handleClose={handleClose} title={title}>
        <TransactionForm handleClose={handleClose} transactionToEdit={transactionToEdit} />
      </FormModal>
    </>
  );
}
