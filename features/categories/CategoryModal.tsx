'use client';

import { FormModal } from '@/shared/components/UI/FormModal';
import { CategoryForm } from './CategoryForm';
import { useState } from 'react';
import CreateButton from '@/shared/components/UI/CreateButton';

export default function CategoryModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CreateButton title="Nova Categoria" handleClick={() => setModalOpen(true)} />

      <FormModal open={modalOpen} handleClose={handleClose}>
        <CategoryForm handleClose={handleClose} />
      </FormModal>
    </>
  );
}
