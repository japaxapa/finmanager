import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '../services/accountsService';
import { queryClient } from '../lib/tsquery';
import { getAccountSummary } from '../services/accountsService';
import { AccountInsert, AccountUpdate } from '../lib/supabase/types/types';

export function useAccountSummary() {
  return useQuery({
    queryKey: ['accounts-summary'],
    queryFn: getAccountSummary,
  });
}

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  });
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: async (newAccount: AccountInsert) => createAccount(newAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts-summary'] });
    },
  });
}

export function useUpdateAccount() {
  return useMutation({
    mutationFn: async (changedAccount: AccountUpdate) => updateAccount(changedAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts-summary'] });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts-summary'] });
    },
  });
}
