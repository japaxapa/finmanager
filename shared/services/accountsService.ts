import { createClient } from '../lib/supabase/client';

const supabase = createClient();

export async function getAccounts() {
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    throw new Error('Erro ao carregar informações do usuário para requerir contas');
  }
  const query = supabase.from('accounts').select('*').eq('user_id', data.user?.id);

  return query;
}

export async function createAccount(name: string, type: string, initialBalance?: number) {
  const { data } = await supabase.auth.getUser();

  return supabase
    .from('accounts')
    .insert([
      { name: name, type: type, user_id: data.user?.id, initial_balance: initialBalance || 0 },
    ])
    .select();
}

export async function deleteAccount(name: string, type: string) {
  await supabase.from('accounts').delete().eq('name', name).eq('type', type);

  return true;
}
