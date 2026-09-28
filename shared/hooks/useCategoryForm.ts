import { ICategoryFormProps } from '@/features/categories/CategoryForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FinIconType } from '../components/UI/FinIcons.data';
import { useCreateCategory, useUpdateCategory } from './useCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../schemas/categories.schema';
import { CategoryInsert } from '../lib/supabase/types/types';

export function useCategoryForm({ handleClose, entityToEdit }: ICategoryFormProps) {
  const isEditing = Boolean(entityToEdit);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const isSubmitting = isCreating || isUpdating;

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: entityToEdit
      ? {
          name: entityToEdit.name ?? '',
          type: (entityToEdit?.type as 'income' | 'expense') ?? 'expense',
          icon: (entityToEdit.icon as FinIconType) ?? 'category',
          color: entityToEdit.color ?? '#0088FE',
          budget_goal: entityToEdit.budget_goal ?? 0,
        }
      : {
          name: '',
          type: 'expense' as 'income' | 'expense',
          icon: 'category',
          color: '#0088FE',
          budget_goal: 0,
        },
  });

  const { setValue, reset } = form;

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Omit<CategoryInsert, 'user_id'>> = (data) => {
    const payload = {
      ...data,
      budget_goal: Number(data.budget_goal),
      user_id: '',
    };

    const options = {
      onSuccess: handleReset,
    };

    if (isEditing && entityToEdit?.id) {
      updateCategory({ id: entityToEdit.id, ...payload }, options);
    } else {
      createCategory(payload, options);
    }
  };

  return {
    form,
    isEditing,
    isSubmitting,
    handleReset,
    onSubmit,
    setValue,
  };
}
