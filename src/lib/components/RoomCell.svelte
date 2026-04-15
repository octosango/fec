<script lang="ts">
	import { Button } from 'bits-ui';

	let {
		name,
		occupied,
		onclick
	}: { name: string; occupied: boolean; onclick: () => void } = $props();
</script>

<Button.Root
	class="rounded px-1.5 py-0.5 text-sm transition-shadow hover:ring-2 hover:ring-stone-700/10 {occupied
		? 'bg-stone-200 text-stone-400'
		: 'bg-green-700 text-green-50'}"
	{onclick}
>
	{name}
</Button.Root>
