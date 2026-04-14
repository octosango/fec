import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_PROJECT_ID, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

const supabaseUrl = `https://${PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;

export const supabase = createClient(supabaseUrl, PUBLIC_SUPABASE_PUBLISHABLE_KEY);
