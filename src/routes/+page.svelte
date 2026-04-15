<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { Button } from 'bits-ui';
	import { Drawer } from 'vaul-svelte';
	import { format } from 'date-fns';
	import { supabase } from '$lib/supabase';
	import { auth, signInWithGoogle } from '$lib/auth.svelte';
	import { getCurrentDayOfWeek, getCurrentPeriod, DAYS } from '$lib/time';
	import PeriodSelector from '$lib/components/PeriodSelector.svelte';
	import RoomGrid from '$lib/components/RoomGrid.svelte';

	import { PERIODS } from '$lib/time';

	type Room = { id: number; name: string; floor: number; pin: string };
	type Building = { id: number; name: string; pin: string; rooms: Room[] };
	type LectureInfo = { name: string; instructor: string | null; url: string | null } | null;
	type ScheduleEntry = {
		period: number;
		label: string | null;
		lecture_id: number | null;
		lectures: LectureInfo;
	};

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
		void auth.user; // re-fetch on auth change (RLS on lectures)
		if (t.length === 0) return;

		supabase
			.from('schedules')
			.select('room_id, period, label, lecture_id, lectures(name, instructor, url)')
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
							lecture_id: s.lecture_id,
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
		drawerPeriod = periods.length === 1 ? periods[0] : null;
		drawerOpen = true;
	}
</script>

<div class="flex min-h-svh flex-col text-stone-700">
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

	<footer class="mx-auto w-full max-w-md px-4 py-4 text-sm text-stone-500">
		<div class="flex flex-col gap-2 rounded-xl border border-stone-300 px-3 py-3.5">
			<div class="flex gap-4 mb-1.5">
				<span class="flex items-center gap-1">
					<span class="inline-block w-6 rounded bg-green-700 py-0.5 text-center text-sm text-green-50 mr-0.5">○</span>
					空き
				</span>
				<span class="flex items-center gap-1">
					<span class="inline-block w-6 rounded bg-stone-200 py-0.5 text-center text-sm text-stone-400 mr-0.5">×</span>
					使用中
				</span>
			</div>
			<p>空き教室は個人での自習にのみ利用可能です。空き状況は臨時使用等により表示と異なる場合があります。</p>
			<p class="text-stone-400">
				このアプリはオープンソースです。<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="https://github.com/octosango/fec" target="_blank" rel="noopener" class="text-stone-400 underline decoration-dashed underline-offset-2">GitHubでコードを見る</a>
			</p>
		</div>
	</footer>

	<div class="h-28 lg:h-20"></div>
</div>

<div class="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-lg justify-center px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
	<div class="rounded-xl border border-stone-300 bg-stone-50/95 px-1.5 py-1.5 shadow-lg backdrop-blur-sm">
		<PeriodSelector bind:dayOfWeek bind:periods />
	</div>
</div>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 z-30 bg-black/40" />
		<Drawer.Content class="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-lg rounded-t-xl bg-stone-50 p-4">
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
									: 'bg-green-700 text-green-50'} {drawerPeriod === p
									? 'ring-2 ring-stone-700/30'
									: ''}"
								onclick={() => (drawerPeriod = drawerPeriod === p ? null : p)}
							>
								<span class="text-base">{p}</span>
							</Button.Root>
						{/each}
					</div>
					<div class="min-h-28 rounded-lg border border-stone-300 p-3">
						<p class="text-xs text-stone-400">{DAYS[dayOfWeek]}曜{drawerPeriod ? ` ${drawerPeriod}限` : ''}</p>
						{#if drawerPeriod}
							{@const entry = roomSchedules.find((s) => s.period === drawerPeriod)}
							{#if entry}
								{#if entry.lectures}
									<p class="font-medium">{entry.lectures.name}</p>
									{#if entry.lectures.instructor}
										<p class="text-sm text-stone-500">{entry.lectures.instructor}</p>
									{/if}
									{#if entry.lectures.url}
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
										<a href={entry.lectures.url} target="_blank" rel="noopener" class="text-sm text-blue-600 underline">manaba</a>
									{/if}
								{:else if entry.label}
									<p class="font-medium">{entry.label}</p>
								{:else if entry.lecture_id && !auth.user}
									<p class="text-stone-400">使用中</p>
									<Button.Root onclick={signInWithGoogle} class="mt-2 rounded-full px-3.5 py-1.5 text-sm text-stone-500 ring-1 ring-stone-300 transition-colors active:bg-gray-200">認証して授業名を見る</Button.Root>
								{:else}
									<p class="text-stone-400">使用中</p>
								{/if}
							{:else}
								<p class="text-green-700">空き</p>
							{/if}
						{:else}
							<p class="text-stone-400">コマをタップして利用状況を確認</p>
						{/if}
					</div>
				</div>
			{/if}
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
