import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

type AuthState = { session: Session | null; user: User | null; loading: boolean };

export const auth = $state<AuthState>({ session: null, user: null, loading: true });

let initialized = false;

export function initAuth() {
	if (initialized || typeof window === 'undefined') return;
	initialized = true;

	supabase.auth.getSession().then(({ data }) => {
		auth.session = data.session;
		auth.user = data.session?.user ?? null;
		auth.loading = false;
	});

	supabase.auth.onAuthStateChange((_event, session) => {
		auth.session = session;
		auth.user = session?.user ?? null;
		auth.loading = false;
	});
}

export async function signInWithGoogle() {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
			queryParams: {
				hd: 'g.chuo-u.ac.jp',
				prompt: 'select_account'
			}
		}
	});
	if (error) console.error('signInWithGoogle error', error);
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) console.error('signOut error', error);
}
