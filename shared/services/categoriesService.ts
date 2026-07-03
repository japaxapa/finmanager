import { createClient } from '../lib/supabase/client';
import { Enums } from '../lib/supabase/types/supabase';

const supabase = createClient();

export async function getCategories(type?: Enums<'category_type'>) {
  let query = supabase.from('categories').select('*');

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
