import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import {
  GetTransactionsQueryParams,
  getTransactions,
  getTransactionSummary,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '../services/transationsService';
import { TransactionUpdate } from '../lib/supabase/types/types';
import { queryClient } from '../lib/tsquery';

// Query Keys Constant Factory
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (params: GetTransactionsQueryParams) => [...transactionKeys.lists(), params] as const,
  summaries: () => [...transactionKeys.all, 'summary'] as const,
  summary: (startDate?: string, endDate?: string) =>
    [...transactionKeys.summaries(), { startDate, endDate }] as const,
};

/**
 * Hook to Fetch Paginated & Filtered Transactions
 */
export function useTransactions(params: GetTransactionsQueryParams = {}) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => getTransactions(params),
    placeholderData: keepPreviousData, // Keeps previous page visible while fetching next page
  });
}

/**
 * Hook to Fetch Transaction Summary Balances
 */
export function useTransactionSummary(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: transactionKeys.summary(startDate, endDate),
    queryFn: () => getTransactionSummary(startDate, endDate),
  });
}

/**
 * Hook to Create Transaction
 */
export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Invalidate transaction lists and summaries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

// Type for the mutation payload (ID + update fields)
export type UpdateTransactionPayload = {
  id: string;
} & Omit<TransactionUpdate, 'id' | 'created_at' | 'user_id' | 'updated_at'>;

/**
 * Hook to Update an Existing Transaction
 */
export function useUpdateTransaction() {
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateTransactionPayload) => updateTransaction(id, payload),
    onSuccess: () => {
      // Invalidate all transaction lists and summaries to trigger automatic re-fetch
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

/**
 * Hook to Delete Transaction
 */
export function useDeleteTransaction() {
  return useMutation({
    mutationFn: async (transactionId: string) => deleteTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
