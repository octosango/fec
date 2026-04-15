<script lang="ts">
	import RoomCell from './RoomCell.svelte';

	type Room = { id: number; name: string; floor: number; pin: string };
	type Building = { id: number; name: string; pin: string; rooms: Room[] };

	let {
		building,
		rooms,
		occupiedRoomIds,
		onRoomClick
	}: {
		building: Building;
		rooms: Room[];
		occupiedRoomIds: Set<number>;
		onRoomClick: (room: Room, building: Building) => void;
	} = $props();

	let roomsByFloor = $derived.by(() => {
		const grouped: Record<number, Room[]> = {};
		for (const room of rooms) {
			(grouped[room.floor] ??= []).push(room);
		}
		for (const floor in grouped) {
			grouped[floor].sort((a, b) => a.name.localeCompare(b.name));
		}
		return Object.entries(grouped)
			.map(([f, rs]) => [Number(f), rs] as [number, Room[]])
			.sort(([a], [b]) => b - a);
	});
</script>

<section>
	<h2 class="mb-1 text-sm font-medium text-stone-400">{building.name}</h2>
	<div class="flex flex-col gap-1">
		{#each roomsByFloor as [floor, floorRooms]}
			<div class="flex items-start gap-1">
				<span
					class="shrink-0 rounded border border-stone-300 px-1.5 py-0.5 text-center text-sm text-stone-400"
				>
					{floor}F
				</span>
				<div class="flex flex-wrap gap-1">
					{#each floorRooms as room}
						<RoomCell
							name={room.name}
							occupied={occupiedRoomIds.has(room.id)}
							onclick={() => onRoomClick(room, building)}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
