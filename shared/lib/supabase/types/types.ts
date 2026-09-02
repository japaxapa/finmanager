import { Enums, Tables, TablesInsert, TablesUpdate, Views } from './database.helpers';
import { Database } from './supabase';

export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export type Transaction = Tables<'transactions'>;
export type TransactionInsert = TablesInsert<'transactions'>;
export type TransactionUpdate = TablesUpdate<'transactions'>;
export type TransactionType = Enums<'transaction_type'>;

export type Account = Tables<'accounts'>;
export type AccountInsert = TablesInsert<'accounts'>;
export type AccountUpdate = TablesUpdate<'accounts'>;
export type AccountWithBalance = Views<'accounts_with_balance'>;
