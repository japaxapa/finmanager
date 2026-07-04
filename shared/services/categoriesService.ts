import { createClient } from '../lib/supabase/client';
import { Enums } from '../lib/supabase/types/supabase';

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

export async function createCategory(name: string, type: Enums<'category_type'>) {
  const { data } = await supabase.auth.getUser();

  return supabase
    .from('categories')
    .insert([{ name: name, type: type, user_id: data.user?.id }])
    .select();
}

export async function deleteCategory(name: string, type: Enums<'category_type'>) {
  await supabase.from('categories').delete().eq('name', name).eq('type', type);

  return true;
}
