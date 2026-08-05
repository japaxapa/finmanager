import { createClient } from '../lib/supabase/client';
import { Enums } from '../lib/supabase/types/supabase';
import { CategoryInsert, CategoryUpdate } from '../lib/supabase/types/types';

const supabase = createClient();

export async function getCategories(type?: Enums<'category_type'>) {
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    throw new Error('Erro ao carregar informações do usuário para requerir categorias');
  }

  let query = supabase.from('categories').select('*').eq('user_id', data.user?.id);

  if (type) {
    query = query.eq('type', type);
  }

  return query;
}

export async function createCategory(category: CategoryInsert) {
  const { data } = await supabase.auth.getUser();

  const userId = data.user?.id;

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  return supabase
    .from('categories')
    .insert([
      {
        name: category.name,
        type: category.type,
        user_id: userId,
        budget_goal: category.budget_goal,
        color: category.color,
        icon: category.icon,
      },
    ])
    .select();
}

export async function updateCategory(category: CategoryUpdate) {
  const { data } = await supabase.auth.getUser();

  const userId = data.user?.id;

  if (!userId) {
    throw new Error('User is not authenticated');
  }
  if (!category.id) {
    throw new Error('Category ID is required for update');
  }

  const { id } = category;

  const updatePayload = { ...category, user_id: userId, updated_at: new Date().toISOString() };

  const { data: updatedCategory, error } = await supabase
    .from('categories')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return updatedCategory;
}

export async function deleteCategory(name: string, type: Enums<'category_type'>) {
  await supabase.from('categories').delete().eq('name', name).eq('type', type);

  return true;
}
