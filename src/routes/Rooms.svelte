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
</script>

{#each fec as f}
<div class="unit bfy">
    <button class="ifx floor">{f.floor}</button>
    {#each f.rooms as r}
        <button class="ifx clases" data-kogi="{r.kogi[$yo_bikomaID]}" data-room="r.room">
            <div>{r.room}</div>
            <span>{r.kogi[$yo_bikomaID] ? '×' : '○' }</span>
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
    /* position: relative; */
    border-radius: .25rem;
    /* text-align: start; */
    transition: box-shadow .1s cubic-bezier(0,0,0,1);
    /* padding-inline: .25rem; */

    display: inline-flex;
    flex-direction: column;
    /* flex-shrink: 0; */
    /* margin: 0; */
    padding: 0 .25rem;
    border: 0;
    width: 3rem;
}
.floor {
    background-color: transparent;
    border-color: rgb(143, 140, 135);
    color: rgb(143, 140, 135);
    border: 1px rgb(208, 207, 203) solid;
}
button[data-kogi='0'] { /* .green, */
    background-color: rgb(0, 135, 75);
    border-color: rgb(247, 253, 250);
    color: rgb(247, 253, 250);
}
button[data-kogi='1'] { /* .gray, */
    background-color: rgb(229, 228, 227);
    border-color: rgb(143, 140, 135);
    color: rgb(143, 140, 135);
}
</style>
