'use client';

import { ConfirmDeleteModal } from '@/shared/components/UI/ConfirmDeleteModal';
import { useDeleteCategory } from '@/shared/hooks/useCategories';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { Category } from '@/shared/lib/supabase/types/types';
import { useEffect } from 'react';

interface ICategoryDeleteModal {
  selectedCategory?: Category | undefined;
  handleClose: () => void;
}

export default function CategoryDeleteModal({
  selectedCategory,
  handleClose,
}: ICategoryDeleteModal) {
  // TODO check if the loading should be passed from here
  const {
    mutate: deleteCategory,
    // isPending: isDeleting,
    isSuccess: isDeleteSuccess,
  } = useDeleteCategory();

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      await deleteCategory({
        name: selectedCategory.name,
        type: selectedCategory.type as Enums<'category_type'>,
      });
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      handleClose();
    }
  }, [isDeleteSuccess, handleClose]);

  return (
    <ConfirmDeleteModal
      open={Boolean(selectedCategory)}
      title="Deletar categoria?"
      itemName={selectedCategory?.name}
      onClose={handleClose}
      onConfirm={handleDeleteConfirm}
    />
  );
}
