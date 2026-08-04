import { useMutation, useQuery } from '@tanstack/react-query';
import { Enums } from '../lib/supabase/types/supabase';
import { createCategory, deleteCategory, getCategories } from '../services/categoriesService';
import { queryClient } from '../lib/tsquery';
import { CategoryInsert } from '../lib/supabase/types/types';

export function useCategories(type?: Enums<'category_type'>) {
  return useQuery({ queryKey: ['categories', type], queryFn: () => getCategories(type) });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: async (newCategory: CategoryInsert) => createCategory(newCategory),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ['categories', variables.type] }),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: async (category: { name: string; type: Enums<'category_type'> }) =>
      deleteCategory(category.name, category.type),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ['categories', variables.type] }),
  });
}
