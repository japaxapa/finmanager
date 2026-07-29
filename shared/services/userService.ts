import { createClient } from '../lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

const supabase = await createClient();

export async function getUserProfile(): Promise<UserProfile | null> {
  // 1. Get current authenticated user from auth.users
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // console.error('User not authenticated:', authError?.message);
    return null;
  }

  // 2. Fetch profile details using the auth user's ID
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name') // adjust column name if yours is different
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError.message);
    return null;
  }

  // 3. Combine auth data (email) and profile data (full_name)
  return {
    id: user.id,
    email: user.email ?? '',
    fullName: profile.full_name,
  };
}
