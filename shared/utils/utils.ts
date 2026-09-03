import { AccountWithBalance } from '../lib/supabase/types/types';

// Helper function to strip nulls
export function sanitizeAccount(acc: AccountWithBalance) {
  return {
    id: acc.id ?? '',
    name: acc.name ?? '',
    type: acc.type ?? '',
    user_id: acc.user_id ?? '',
    color: acc.color ?? undefined, // Converts null -> undefined
    icon: acc.icon ?? undefined, // Converts null -> undefined
    created_at: acc.created_at ?? undefined,
    initial_balance: acc.initial_balance,
    current_balance: acc.current_balance,
  };
}
