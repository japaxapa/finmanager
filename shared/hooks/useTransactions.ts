import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import {
  GetTransactionsQueryParams,
  getTransactions,
  getTransactionSummary,
  createTransaction,
  deleteTransaction,
} from '../services/transationsService';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Invalidate transaction lists and summaries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

/**
 * Hook to Delete Transaction
 */
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
