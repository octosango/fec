<script lang="ts">
	import './layout.css';
	import { Button } from 'bits-ui';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-stone-50 px-4 py-2 shadow-sm">
	<h1 class="flex items-center gap-2 text-base font-bold">中央大学／空き教室一覧 <span class="rounded bg-stone-200 px-1.5 py-0.5 text-xs font-normal text-stone-400">学生制作</span></h1>
	<Button.Root class="rounded-full px-3.5 py-1.5 text-sm text-stone-500 ring-1 ring-stone-300 transition-colors hover:bg-gray-100 active:bg-gray-200">認証</Button.Root>
</header>

<div class="pt-16 bg-stone-50">
	{@render children()}
</div>
