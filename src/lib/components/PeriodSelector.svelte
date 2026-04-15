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

<div class="flex flex-wrap items-center gap-1.5">
	<div class="flex rounded-lg p-0.5 gap-1">
		{#each DAYS as day, i}
			<Button.Root
				class="min-w-10 rounded-md py-1.5 text-base transition-colors {dayOfWeek === i
					? 'bg-green-50 text-green-900 font-medium ring-1 ring-stone-300'
					: 'hover:bg-gray-100 active:bg-gray-200'}"
				onclick={() => (dayOfWeek = i)}
			>
				{day}
			</Button.Root>
		{/each}
	</div>
	<div class="flex rounded-lg p-0.5 gap-1">
		{#each PERIODS as p}
			<Button.Root
				class="min-w-10 rounded-md py-1.5 text-base transition-colors {periods.includes(p)
					? 'bg-green-50 text-green-900 font-medium ring-1 ring-stone-300'
					: 'hover:bg-gray-100 active:bg-gray-200'}"
				onclick={() => togglePeriod(p)}
			>
				{p}
			</Button.Root>
		{/each}
	</div>
</div>
