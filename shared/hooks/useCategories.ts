import { useMutation, useQuery } from '@tanstack/react-query';
import { Enums } from '../lib/supabase/types/supabase';
import { createCategory, getCategories } from '../services/categoriesService';
import { queryClient } from '../lib/tsquery';

export function useCategories(type?: Enums<'category_type'>) {
  return useQuery({ queryKey: ['categories', type], queryFn: () => getCategories(type) });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: async (newCategory: { name: string; type: Enums<'category_type'> }) =>
      createCategory(newCategory.name, newCategory.type),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ['categories', variables.type] }),
  });
}
