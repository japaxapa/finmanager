import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useUserProfile } from './useUser';
import {
  AccountMonthlySummary,
  accountMonthlySummaryKeys,
  fetchAccountMetricsHistory,
  fetchUserMonthlySummary,
} from '../services/dashboardService';

interface UseUserMonthlySummaryParams {
  year?: number;
  month?: number;
}

export function useUserMonthlySummary(
  { year, month }: UseUserMonthlySummaryParams,
  options?: Omit<UseQueryOptions<AccountMonthlySummary | null, Error>, 'queryKey' | 'queryFn'>,
) {
  const { data: userData } = useUserProfile();
  const userId = userData?.id;

  return useQuery({
    queryKey: accountMonthlySummaryKeys.detail(userId, year, month),
    queryFn: () => fetchUserMonthlySummary(userId, year, month),
    enabled: !!userId, // Prevent request until userId is available
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    ...options,
  });
}

// Type matching the RPC function's returned table structure
export interface AccountMetricsHistory {
  metric_year: number;
  metric_month: number;
  net_worth: number;
  active_accounts: number;
  open_invoice: number;
  monthly_income: number;
  monthly_expense: number;
}

interface UseUserAccountMetricsHistoryProps {
  monthsLimit?: number;
  options?: Omit<UseQueryOptions<AccountMetricsHistory[], Error>, 'queryKey' | 'queryFn'>;
}

// Query key factory for clean caching & invalidation
export const accountMetricsKeys = {
  all: ['account_metrics'] as const,
  history: (userId: string, monthsLimit: number) =>
    [...accountMetricsKeys.all, 'history', userId, monthsLimit] as const,
};

export const useUserAccountMetricsHistory = ({
  monthsLimit = 6,
  options,
}: UseUserAccountMetricsHistoryProps) => {
  const { data: userData } = useUserProfile();
  const userId = userData?.id;

  return useQuery<AccountMetricsHistory[], Error>({
    queryKey: accountMetricsKeys.history(userId ?? '', monthsLimit),
    queryFn: () => fetchAccountMetricsHistory({ userId, monthsLimit }),
    enabled: Boolean(userId) && (options?.enabled ?? true),
    ...options,
  });
};
