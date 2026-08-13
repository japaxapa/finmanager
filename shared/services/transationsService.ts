import { TransactionInsert, TransactionType } from '../lib/supabase/types/types';
import { createClient } from '../lib/supabase/client';

const supabase = createClient();

// // Type-safe Inferred Return Type for getTransactions (includes nested category join)
// const _transactionsWithCategoryQuery = supabase
//   .from('transactions')
//   .select('*, categories(id, name, slug)', { count: 'exact' });

// export type TransactionWithCategory = QueryData<typeof _transactionsWithCategoryQuery>[number];

// Query Parameters Type
export interface GetTransactionsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: TransactionType | 'ALL';
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Fetch Paginated & Filtered Transactions
 */
export async function getTransactions({
  page = 1,
  limit = 10,
  search,
  type,
  categoryId,
  startDate,
  endDate,
}: GetTransactionsQueryParams = {}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('transactions')
    .select('*, categories(id, name)', { count: 'exact' })
    .order('transaction_date', { ascending: false })
    .range(from, to);

  if (type && type !== 'ALL') {
    query = query.eq('type', type);
  }
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }
  if (startDate) {
    query = query.gte('transaction_date', startDate);
  }
  if (endDate) {
    query = query.lte('transaction_date', endDate);
  }

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: data || [],
    count: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  };
}

/**
 * Fetch Summary Balances (Net Balance, Income, Expense)
 */
export async function getTransactionSummary(startDate?: string, endDate?: string) {
  let query = supabase.from('transactions').select('type, amount');

  if (startDate) query = query.gte('transaction_date', startDate);
  if (endDate) query = query.lte('transaction_date', endDate);

  const { data, error } = await query;
  if (error) throw error;

  const totals = (data || []).reduce(
    (acc, curr) => {
      const amount = Number(curr.amount) || 0;
      if (curr.type === 'income') {
        acc.totalIncome += amount;
      } else if (curr.type === 'expense') {
        acc.totalExpense += amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 },
  );

  return {
    totalIncome: totals.totalIncome.toFixed(2),
    totalExpense: totals.totalExpense.toFixed(2),
    netBalance: (totals.totalIncome - totals.totalExpense).toFixed(2),
  };
}

/**
 * Create Transaction
 */
export async function createTransaction(
  payload: Omit<TransactionInsert, 'id' | 'created_at' | 'user_id'>,
) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...payload, user_id: user.id }])
    .select('*, categories(id, name)')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete Transaction
 */
export async function deleteTransaction(id: string) {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}
