import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '../services/accountsService';
import { queryClient } from '../lib/tsquery';
import { getAccountSummary } from '../services/accountsService';

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
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', 'accounts-summary'] });
    },
  });
}

export function useUpdateAccount() {
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', 'accounts-summary'] });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', 'accounts-summary'] });
    },
  });
}
