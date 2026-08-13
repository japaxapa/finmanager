import { Enums, Tables, TablesInsert, TablesUpdate } from './database.helpers';
import { Database } from './supabase';

export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export type Transaction = Tables<'transactions'>;
export type TransactionInsert = TablesInsert<'transactions'>;
export type TransationUpdate = TablesUpdate<'transactions'>;
export type TransactionType = Enums<'transaction_type'>;
