'use client';

import { FormModal } from '@/shared/components/UI/FormModal';
import { useState } from 'react';
import CreateButton from '@/shared/components/UI/CreateButton';
import { TransactionForm } from './TransactionForm';

export default function TransactionModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CreateButton title="Nova Transação" handleClick={() => setModalOpen(true)} />

      <FormModal open={modalOpen} handleClose={handleClose} title={'Nova Transação'}>
        <TransactionForm handleClose={handleClose} />
      </FormModal>
    </>
  );
}
