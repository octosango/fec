import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseUrl = `https://${env.PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;

export const supabase = createClient(supabaseUrl, env.PUBLIC_SUPABASE_PUBLISHABLE_KEY);
