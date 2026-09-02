'use client';

import { useState, ReactNode, ComponentType } from 'react';
import { FormModal } from '@/shared/components/UI/FormModal';
import CreateButton from '@/shared/components/UI/CreateButton';

export interface FormComponentProps<T> {
  handleClose: () => void;
  entityToEdit?: T;
}

interface EntityFormModalProps<T> {
  title: string;
  buttonLabel?: string;
  entityToEdit?: T;
  FormComponent: ComponentType<FormComponentProps<T>>;
  // Controlled props
  open?: boolean;
  handleClose?: () => void;
  // Custom trigger button if needed
  renderTrigger?: (openModal: () => void) => ReactNode;
}

export function EntityFormModal<T>({
  title,
  buttonLabel,
  entityToEdit,
  FormComponent,
  open: externalOpen,
  handleClose: externalHandleClose,
  renderTrigger,
}: EntityFormModalProps<T>) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof externalOpen !== 'undefined';
  const isOpen = isControlled ? externalOpen : internalOpen;

  const handleClose = () => {
    if (isControlled) {
      externalHandleClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  const openModal = () => setInternalOpen(true);

  return (
    <>
      {/* 1. Custom Trigger */}
      {renderTrigger && renderTrigger(openModal)}

      {/* 2. Default Trigger (only when uncontrolled and not editing) */}
      {!renderTrigger && !isControlled && !entityToEdit && (
        <CreateButton title={buttonLabel || `Novo(a) ${title}`} handleClick={openModal} />
      )}

      {/* 3. Modal & Form rendering */}
      <FormModal open={isOpen} handleClose={handleClose} title={title}>
        <FormComponent handleClose={handleClose} entityToEdit={entityToEdit} />
      </FormModal>
    </>
  );
}
