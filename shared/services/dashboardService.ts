import { AccountMetricsHistory } from '../hooks/useDashboard';
import { createClient } from '../lib/supabase/client';

const supabase = createClient();

export interface AccountMonthlySummary {
  total_net_worth: number;
  monthly_income: number;
  monthly_expense: number;
  monthly_net_balance: number;
}

export interface MonthlyHistoryItem {
  month_start: string;
  year: number;
  month: number;
  income: number;
  expense: number;
  net_balance: number;
}

export interface AccountMetrics {
  net_worth: number;
  active_accounts: number;
  open_invoice: number;
  monthly_income: number;
  monthly_expense: number;
  monthly_history: MonthlyHistoryItem[];
}

export const accountMonthlySummaryKeys = {
  all: ['account-monthly-summary'] as const,
  detail: (userId?: string, year?: number, month?: number) =>
    [...accountMonthlySummaryKeys.all, userId, year, month] as const,
};

export const accountMetricsKeys = {
  all: ['account-metrics'] as const,
  detail: (userId?: string) => [...accountMetricsKeys.all, userId] as const,
};

export async function fetchUserMonthlySummary(
  userId?: string,
  year?: number,
  month?: number,
): Promise<AccountMonthlySummary | null> {
  if (!userId) return null;

  const { data, error } = await supabase.rpc('get_user_monthly_summary', {
    p_user_id: userId,
    p_year: year ?? new Date().getFullYear(),
    p_month: month ?? new Date().getMonth() + 1,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Supabase RPC returns an array of rows; extract the first result row
  return data && data.length > 0 ? (data[0] as AccountMonthlySummary) : null;
}

export async function fetchAccountMetricsHistory({
  userId,
  monthsLimit,
}: {
  userId: string | undefined;
  monthsLimit: number;
}) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const { data, error } = await supabase.rpc('get_user_account_metrics_history', {
    p_user_id: userId,
    p_months_limit: monthsLimit,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as AccountMetricsHistory[];
}
