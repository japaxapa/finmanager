'use client';

import { ConfirmDeleteModal } from '@/shared/components/UI/ConfirmDeleteModal';

interface IGenericDeleteModalProps<T> {
  item?: T | null;
  itemName?: string;
  title?: string;
  isLoading?: boolean;
  handleClose: () => void;
  onConfirm: (item: T) => void | Promise<void>;
}

export default function GenericDeleteModal<T>({
  item,
  itemName,
  title = 'Excluir item?',
  isLoading = false,
  handleClose,
  onConfirm,
}: IGenericDeleteModalProps<T>) {
  const handleDeleteConfirm = async () => {
    if (item) {
      await onConfirm(item);
      handleClose();
    }
  };

  return (
    <ConfirmDeleteModal
      open={Boolean(item)}
      title={title}
      itemName={itemName}
      isLoading={isLoading}
      onClose={handleClose}
      onConfirm={handleDeleteConfirm}
    />
  );
}
