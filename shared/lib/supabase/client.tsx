import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

export function createSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
