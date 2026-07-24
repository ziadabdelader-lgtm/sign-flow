import { createClient } from '@/lib/supabase/client';

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return { id: user.id, email: user.email!, profile };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
