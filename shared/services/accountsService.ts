import { createClient } from '../lib/supabase/client';
import { Account } from '../lib/supabase/types/types';

const supabase = createClient();

export interface AccountSummary {
  net_worth: number;
  active_accounts: number;
  open_invoice: number;
}

export async function getAccountSummary(): Promise<AccountSummary> {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user?.id) {
    throw new Error('Erro ao carregar dados do usuário.');
  }

  const { data, error } = await supabase
    .rpc('get_user_account_summary', { p_user_id: userData.user.id })
    .single();

  if (error) throw error;

  return {
    net_worth: Number(data.net_worth),
    active_accounts: Number(data.active_accounts),
    open_invoice: Number(data.open_invoice),
  };
}

export async function getAccounts(): Promise<Account[]> {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user?.id) {
    throw new Error('Erro ao carregar informações do usuário para requerir contas');
  }

  // Query the view directly like a standard table
  const { data, error } = await supabase
    .from('accounts_with_balance')
    .select('*')
    .eq('user_id', userData.user.id);

  if (error) throw error;
  return data as Account[];
}

export async function createAccount(payload: {
  name: string;
  type: string;
  institution: string;
  initialBalance?: number;
}) {
  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('accounts')
    .insert([
      {
        name: payload.name,
        type: payload.type,
        initial_balance: payload.initialBalance || 0,
        user_id: userData.user?.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAccount(payload: {
  id: string;
  name?: string;
  type?: string;
  institution?: string;
  initialBalance?: number;
}) {
  const { data, error } = await supabase
    .from('accounts')
    .update({
      name: payload.name,
      type: payload.type,
      initial_balance: payload.initialBalance,
    })
    .eq('id', payload.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAccount(id: string) {
  const { error } = await supabase.from('accounts').delete().eq('id', id);

  if (error) throw error;
  return true;
}
