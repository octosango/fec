<script>
    import { onMount } from 'svelte';
    import dayjs from 'dayjs';
    import ja from 'dayjs/locale/ja';
    import objectSupport from 'dayjs/plugin/objectSupport';
    import isBetween from 'dayjs/plugin/isBetween';
    dayjs.locale(ja);
    dayjs.extend(objectSupport);
    dayjs.extend(isBetween);

    import { fec, yo_bi, koma, yo_bikomaID } from './stores.js';
    // import { npm_config_resolution_mode } from '$env/static/private';
    
    // let time = dayjs();
    // $: day = time.day();
    // let weekRadioday = day
    // $: yo_bi = time.format('dd')
    // $: koma = (() => {
    //     if (time.isBefore(dayjs({h:9,m:0}))) { return 0 }
    //     else if (time.isBetween(dayjs({h:9,m:0}),dayjs({h:10,m:40}),'m','[]')){return 1}
    //     else if (time.isBetween(dayjs({h:10,m:50}),dayjs({h:12,m:30}),'m','[]')){return 2}
    //     else if (time.isBetween(dayjs({h:12,m:30}),dayjs({h:13,m:20}),'m','[]')){return 0}
    //     else if (time.isBetween(dayjs({h:13,m:20}),dayjs({h:15,m:0}),'m','[]')){return 3}
    //     else if (time.isBetween(dayjs({h:15,m:10}),dayjs({h:16,m:50}),'m','[]')){return 4}
    //     else if (time.isBetween(dayjs({h:17,m:0}),dayjs({h:18,m:40}),'m','[]')){return 5}
    //     else if (time.isBetween(dayjs({h:18,m:50}),dayjs({h:20,m:30}),'m','[]')){return 6}
    //     else {return 0}
    // })()
    // $: yo_bikomaID = 6 * (time.day() - 1) + koma

    // onMount(() => {
	// 	const interval = setInterval(() => {
	// 		time = dayjs();
	// 	}, 1000);

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// });
</script>

{#each fec as f}
<div class="unit bfy">
    <button class="ifx floor">{f.floor}</button>
    {#each f.rooms as r}
        <button class="ifx clases" data-kogi="{r.kogi[$yo_bikomaID]}" data-room="r.room">
            <div>{r.room}</div>
            <span>{r.kogi[$yo_bikomaID] ? '○' : '×' }</span>
        </button>
    {/each}
</div>
{/each}

<!-- 今は {$yo_bi} {$koma} です。IDは {$yo_bikomaID} です。 -->

<style>
.bfy {
    border-radius: 0.5rem;
    /* border: 1px rgb(208, 207, 203) solid; */
    gap: 0.25rem;
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    width: 100%;
    margin: 0;
    padding: 0.25rem;
    font-family: inherit;
    font-size: inherit;
    background-color: transparent;
}
.clases:hover {
    box-shadow: 0 0 0 4px #63605a40;
}
.ifx {
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    text-align: start;
    transition: box-shadow .1s cubic-bezier(0,0,0,1);
    padding-inline: 4px;

    display: inline-flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0;
    padding: 0px 4px;
    border: 0;
    width: 3em;
}
.floor {
    background-color: transparent;
    border-color: rgb(143, 140, 135);
    color: rgb(143, 140, 135);
    border: 1px rgb(208, 207, 203) solid;
}
button[data-kogi='1'] { /* .green, */
    background-color: rgb(0, 135, 75);
    border-color: rgb(247, 253, 250);
    color: rgb(247, 253, 250);
}
button[data-kogi='0'] { /* .gray, */
    background-color: rgb(229, 228, 227);
    border-color: rgb(143, 140, 135);
    color: rgb(143, 140, 135);
}
</style>
