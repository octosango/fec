<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	let error = $state<string | null>(null);

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		const errorDescription = params.get('error_description') ?? params.get('error');
		if (errorDescription) {
			error = decodeURIComponent(errorDescription.replaceAll('+', ' '));
			return;
		}
		const code = params.get('code');
		if (!code) {
			goto('/', { replaceState: true });
			return;
		}
		const { error: err } = await supabase.auth.exchangeCodeForSession(code);
		if (err) {
			error = err.message;
			return;
		}
		goto('/', { replaceState: true });
	});
</script>

<div class="mx-auto w-full max-w-md px-4 py-8">
	{#if error}
		<p class="text-sm text-red-600">ログインに失敗しました: {error}</p>
		<a href="/" class="mt-3 inline-block text-sm text-stone-500 underline">ホームに戻る</a>
	{:else}
		<p class="text-sm text-stone-400">認証処理中...</p>
	{/if}
</div>
