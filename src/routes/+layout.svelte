<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { Avatar, Button, DropdownMenu } from 'bits-ui';
	import { LogOut } from '@lucide/svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { auth, initAuth, signInWithGoogle, signOut } from '$lib/auth.svelte';

	let { children } = $props();

	onMount(() => {
		initAuth();
	});

	let avatarUrl = $derived((auth.user?.user_metadata?.avatar_url as string | undefined) ?? '');
	let displayName = $derived(
		(auth.user?.user_metadata?.full_name as string | undefined) ?? auth.user?.email ?? ''
	);
	let initials = $derived(displayName[0]?.toUpperCase() ?? '?');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-stone-50 px-4 py-2 shadow-sm">
	<h1 class="flex items-center gap-2 text-base font-bold">中央大学／空き教室一覧 <span class="rounded bg-stone-200 px-1.5 py-0.5 text-xs font-normal text-stone-400">学生制作</span></h1>
	{#if auth.loading}
		<span class="text-sm text-stone-300">…</span>
	{:else if auth.user}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="rounded-full ring-stone-300 transition active:ring-2 focus-visible:ring-2 focus-visible:outline-none">
				<Avatar.Root class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-xs font-medium text-stone-500">
					<Avatar.Image src={avatarUrl} alt={displayName} class="h-full w-full object-cover" />
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={8}
					align="end"
					class="z-20 min-w-56 rounded-lg border border-stone-200 bg-white p-1 shadow-lg focus-visible:outline-none"
				>
					<div class="px-3 py-2">
						<p class="truncate text-sm font-medium text-stone-700">{displayName}</p>
						<p class="truncate text-xs text-stone-400">{auth.user.email}</p>
					</div>
					<DropdownMenu.Separator class="my-1 h-px bg-stone-200" />
					<DropdownMenu.Item
						onSelect={signOut}
						class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-highlighted:bg-red-50"
					>
						<LogOut class="h-4 w-4" />
						ログアウト
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	{:else}
		<Button.Root onclick={signInWithGoogle} class="rounded-full px-3.5 py-1.5 text-sm text-stone-500 ring-1 ring-stone-300 transition-colors active:bg-gray-200">認証</Button.Root>
	{/if}
</header>

<div class="pt-16 bg-stone-50">
	{@render children()}
</div>
