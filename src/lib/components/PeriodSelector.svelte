<script lang="ts">
	import { Button } from 'bits-ui';
	import { DAYS, PERIODS } from '$lib/time';

	let {
		dayOfWeek = $bindable(),
		periods = $bindable()
	}: { dayOfWeek: number; periods: number[] } = $props();

	function togglePeriod(p: number) {
		if (periods.includes(p)) {
			periods = periods.filter((x) => x !== p);
		} else {
			periods = [...periods, p];
		}
	}
</script>

<div class="flex flex-wrap items-center px-0.5 gap-1">
	<div class="flex rounded-lg py-0.5 gap-1">
		{#each DAYS as day, i (i)}
			<Button.Root
				class="min-w-9 min-h-8 rounded-md py-1.5 text-base transition-colors {dayOfWeek === i
					? 'bg-green-50 text-green-900 font-medium ring-1 ring-stone-300'
					: 'hover:bg-gray-100 active:bg-gray-200'}"
				onclick={() => (dayOfWeek = i)}
			>
				{day}
			</Button.Root>
		{/each}
	</div>
	<div class="flex rounded-lg py-0.5 gap-1">
		{#each PERIODS as p (p)}
			<Button.Root
				class="min-w-9 min-h-8 rounded-md py-1.5 text-base transition-colors {periods.includes(p)
					? 'bg-green-50 text-green-900 font-medium ring-1 ring-stone-300'
					: 'hover:bg-gray-100 active:bg-gray-200'}"
				onclick={() => togglePeriod(p)}
			>
				{p}
			</Button.Root>
		{/each}
	</div>
</div>
