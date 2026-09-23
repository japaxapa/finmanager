import { AccountWithBalance } from '../lib/supabase/types/types';

// Helper function to strip nulls
export function sanitizeAccount(acc: AccountWithBalance) {
  return {
    id: acc.id ?? '',
    name: acc.name ?? '',
    type: acc.type ?? '',
    user_id: acc.user_id ?? '',
    color: acc.color ?? undefined,
    icon: acc.icon ?? undefined,
    created_at: acc.created_at ?? undefined,
    initial_balance: acc.initial_balance,
    current_balance: acc.current_balance,
  };
}

const now = new Date();

// First day of current month
export function getStartDate() {
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
}

// Last day of current month
export function getEndDate() {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
}
