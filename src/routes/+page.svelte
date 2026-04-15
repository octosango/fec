<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { Button } from 'bits-ui';
	import { Drawer } from 'vaul-svelte';
	import { format } from 'date-fns';
	import { supabase } from '$lib/supabase';
	import { getCurrentDayOfWeek, getCurrentPeriod, DAYS } from '$lib/time';
	import PeriodSelector from '$lib/components/PeriodSelector.svelte';
	import RoomGrid from '$lib/components/RoomGrid.svelte';

	import { PERIODS } from '$lib/time';

	type Room = { id: number; name: string; floor: number; pin: string };
	type Building = { id: number; name: string; pin: string; rooms: Room[] };
	type LectureInfo = { name: string; url: string | null } | null;
	type ScheduleEntry = { period: number; label: string | null; lectures: LectureInfo };

	let buildings = $state<Building[]>([]);
	let termIds = $state<number[]>([]);
	let daySchedules = $state(new SvelteMap<number, ScheduleEntry[]>());
	let loading = $state(true);

	const initDay = getCurrentDayOfWeek();
	let dayOfWeek = $state(initDay >= 0 ? initDay : 0);
	let periods = $state([getCurrentPeriod() || 1]);

	let occupiedRoomIds = $derived(
		periods.length === 0
			? new Set(buildings.flatMap((b) => b.rooms.map((r) => r.id)))
			: new Set(
					[...daySchedules.entries()]
						.filter(([, ss]) => periods.some((p) => ss.some((s) => s.period === p)))
						.map(([id]) => id)
				)
	);

	let drawerOpen = $state(false);
	let selectedRoom = $state<Room | null>(null);
	let selectedBuilding = $state<Building | null>(null);
	let drawerPeriod = $state<number | null>(null);

	onMount(async () => {
		const today = format(new Date(), 'yyyy-MM-dd');
		const [bRes, tRes] = await Promise.all([
			supabase
				.from('buildings')
				.select('id, name, pin, rooms(id, name, floor, pin)')
				.order('name'),
			supabase.from('terms').select('id').lte('start_date', today).gte('end_date', today)
		]);
		if (bRes.data) buildings = bRes.data;
		if (tRes.data) termIds = tRes.data.map((t) => t.id);
		loading = false;
	});

	$effect(() => {
		const d = dayOfWeek;
		const t = termIds;
		if (t.length === 0) return;

		supabase
			.from('schedules')
			.select('room_id, period, label, lectures(name, url)')
			.in('term_id', t)
			.eq('day_of_week', d)
			.then(({ data }) => {
				if (data) {
					const map = new SvelteMap<number, ScheduleEntry[]>();
					for (const s of data) {
						let entries = map.get(s.room_id);
						if (!entries) {
							entries = [];
							map.set(s.room_id, entries);
						}
						entries.push({
							period: s.period,
							label: s.label,
							lectures: s.lectures as unknown as LectureInfo
						});
					}
					daySchedules = map;
				}
			});
	});

	function handleRoomClick(room: Room, building: Building) {
		selectedRoom = room;
		selectedBuilding = building;
		drawerPeriod = null;
		drawerOpen = true;
	}
</script>

<div class="flex min-h-svh flex-col bg-stone-50 text-stone-700">
	<header class="sticky top-0 z-10 flex items-center justify-between bg-stone-50 px-4 py-2 shadow-sm">
		<h1 class="flex items-center gap-2 text-base font-bold">中央大学／空き教室一覧 <span class="rounded bg-stone-200 px-1.5 py-0.5 text-xs font-normal text-stone-400">学生制作</span></h1>
		<Button.Root class="rounded-md px-3 py-1.5 text-base text-stone-500 ring-1 ring-stone-300 transition-colors hover:bg-gray-100 active:bg-gray-200">認証</Button.Root>
	</header>


	<main class="mx-auto w-full max-w-md flex-1 px-4 py-4">
		{#if loading}
			<p class="text-sm text-stone-400">読み込み中...</p>
		{:else if termIds.length === 0}
			<p class="text-sm text-stone-400">現在の学期データがありません</p>
		{:else if buildings.length === 0}
			<p class="text-sm text-stone-400">建物データがありません</p>
		{:else}
			<div class="flex flex-col gap-6">
				{#each buildings as building (building.id)}
					<RoomGrid
						{building}
						rooms={building.rooms}
						{occupiedRoomIds}
						onRoomClick={handleRoomClick}
					/>
				{/each}
			</div>
		{/if}
	</main>

	<footer class="mx-auto w-full max-w-md px-4 py-4 text-xs text-stone-400">
		<div class="flex flex-col gap-2 rounded-2xl border border-stone-300 p-3">
			<div class="flex gap-3">
				<span class="flex items-center gap-1">
					<span class="inline-block rounded bg-green-700 px-1.5 py-0.5 text-center text-sm text-green-50">○</span>
					空き
				</span>
				<span class="flex items-center gap-1">
					<span class="inline-block rounded bg-stone-200 px-1.5 py-0.5 text-center text-sm text-stone-400">×</span>
					使用中
				</span>
			</div>
			<p>空き教室は個人での自習にのみ利用可能です。空き状況は臨時使用等により表示と異なる場合があります。</p>
			<p>
				このアプリはオープンソースです。<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="https://github.com/octosango/fec" target="_blank" rel="noopener" class="text-blue-600 underline">GitHubでコードを見る</a>
			</p>
		</div>
	</footer>

	<div class="h-28"></div>
</div>

<div class="fixed bottom-0 left-0 right-0 z-20 flex justify-center px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
	<div class="rounded-2xl border border-stone-300 bg-stone-50/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
		<PeriodSelector bind:dayOfWeek bind:periods />
	</div>
</div>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 z-30 bg-black/40" />
		<Drawer.Content class="fixed bottom-0 left-0 right-0 z-30 rounded-t-xl bg-stone-50 p-4">
			<div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-stone-300"></div>
			{#if selectedRoom && selectedBuilding}
				{@const roomSchedules = daySchedules.get(selectedRoom.id) ?? []}
				<div class="flex flex-col gap-3 pb-4">
					<div>
						<p class="text-sm text-stone-400">{selectedBuilding.name} {selectedRoom.floor}階</p>
						<h3 class="text-lg font-bold">{selectedRoom.name}</h3>
						<p class="text-sm text-stone-400">{DAYS[dayOfWeek]}曜日</p>
					</div>
					<div class="grid grid-cols-6 gap-1">
						{#each PERIODS as p (p)}
							{@const entry = roomSchedules.find((s) => s.period === p)}
							<Button.Root
								class="flex items-center justify-center rounded-md p-2 transition-colors {entry
									? 'bg-stone-200 text-stone-400'
									: 'bg-green-100 text-green-700'} {drawerPeriod === p
									? 'ring-2 ring-stone-700/30'
									: ''}"
								onclick={() => (drawerPeriod = drawerPeriod === p ? null : p)}
							>
								<span class="text-sm">{p}</span>
							</Button.Root>
						{/each}
					</div>
					{#if drawerPeriod}
						{@const entry = roomSchedules.find((s) => s.period === drawerPeriod)}
						<div class="rounded-lg border border-stone-300 p-3">
							<p class="text-xs text-stone-400">{drawerPeriod}限</p>
							{#if entry}
								{#if entry.lectures}
									<p class="font-medium">{entry.lectures.name}</p>
									{#if entry.lectures.url}
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a href={entry.lectures.url} target="_blank" rel="noopener" class="text-sm text-blue-600 underline">manaba</a>
									{/if}
								{:else}
									<p class="text-stone-400">{entry.label ?? '使用中'}</p>
									<Button.Root class="mt-2 rounded-lg bg-stone-700 px-3 py-1.5 text-sm text-stone-50 active:bg-stone-800">認証して授業情報を確認</Button.Root>
								{/if}
							{:else}
								<p class="text-green-700">空き</p>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
