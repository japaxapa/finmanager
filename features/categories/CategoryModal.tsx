'use client';

import { FormModal } from '@/shared/components/UI/FormModal';
import { CategoryForm } from './CategoryForm';
import { useState } from 'react';
import CreateButton from '@/shared/components/UI/CreateButton';
import { CategoryUpdate } from '@/shared/lib/supabase/types/types';

interface ICategoryModalProps {
  title?: string;
  categoryToEdit?: CategoryUpdate;
  // Optional controlled props
  open?: boolean;
  handleClose?: () => void;
}

export default function CategoryModal({
  title = 'Categoria',
  categoryToEdit,
  open: externalOpen,
  handleClose: externalHandleClose,
}: ICategoryModalProps) {
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
      {!isControlled && !categoryToEdit && (
        <CreateButton title="Nova Categoria" handleClick={() => setInternalOpen(true)} />
      )}

      <FormModal open={isOpen} handleClose={handleClose} title={title}>
        <CategoryForm handleClose={handleClose} categoryToEdit={categoryToEdit} />
      </FormModal>
    </>
  );
}
