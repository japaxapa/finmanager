import { useMutation, useQuery } from '@tanstack/react-query';
import { createAccount, deleteAccount, getAccounts } from '../services/accountsService';
import { queryClient } from '../lib/tsquery';

export function useAccounts() {
  return useQuery({ queryKey: ['accounts'], queryFn: () => getAccounts() });
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: async (newAccount: { name: string; type: string; initialBalance?: number }) =>
      createAccount(newAccount.name, newAccount.type, newAccount.initialBalance),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ['categories', variables.type] }),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async (category: { name: string; type: string }) =>
      deleteAccount(category.name, category.type),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ['categories', variables.type] }),
  });
}
