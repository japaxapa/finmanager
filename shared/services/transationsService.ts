import { TransactionInsert, TransactionUpdate, TransactionType } from '../lib/supabase/types/types';
import { createClient } from '../lib/supabase/client';

const supabase = createClient();

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
  // Fetch all transactions (no date filters on the query itself)
  const { data, error } = await supabase
    .from('transactions')
    .select('type, amount, transaction_date');

  if (error) throw error;

  const totals = (data || []).reduce(
    (acc, curr) => {
      const amount = Number(curr.amount) || 0;
      const type = (curr.type || '').toLowerCase();
      const txDate = curr.transaction_date;

      // 1. Calculate All-Time Net Balance (Net Worth) across ALL transactions
      if (type === 'income' || type === 'receita') {
        acc.allTimeNetBalance += amount;
      } else if (type === 'expense' || type === 'despesa') {
        acc.allTimeNetBalance -= amount;
      }

      // 2. Filter Time-Sensitive Income & Expense
      const isAfterStart = !startDate || txDate >= startDate;
      const isBeforeEnd = !endDate || txDate <= endDate;

      if (isAfterStart && isBeforeEnd) {
        if (type === 'income' || type === 'receita') {
          acc.periodIncome += amount;
        } else if (type === 'expense' || type === 'despesa') {
          acc.periodExpense += amount;
        }
      }

      return acc;
    },
    { periodIncome: 0, periodExpense: 0, allTimeNetBalance: 0 },
  );

  return {
    totalIncome: totals.periodIncome.toFixed(2),
    totalExpense: totals.periodExpense.toFixed(2),
    netBalance: totals.allTimeNetBalance.toFixed(2), // All-time cumulative balance
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
 * Update an existing Transaction
 */
export async function updateTransaction(
  id: string,
  payload: Omit<TransactionUpdate, 'id' | 'created_at' | 'user_id' | 'updated_at'>,
) {
  const { data: userData } = await supabase.auth.getUser();

  const userId = userData.user?.id;

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const { data, error } = await supabase
    .from('transactions')
    .update({
      ...payload,
      user_id: userData.user?.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
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
