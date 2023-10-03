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

<div class="norm pad">
{#each fec as f}
<div class="norm unit bfy">
    <button class="norm center-justify center-align ifx flat floor">{f.floor}</button>
    {#each f.rooms as r}
        <button class="norm flat center-justify center-align ifx clases" data-kogi="{r.kogi[$yo_bikomaID]}" data-room="r.room">
            <div class="c3">{r.room}</div>
            <span>{r.kogi[$yo_bikomaID] ? '×' : '○' }</span>
        </button>
    {/each}
</div>
{/each}
</div>

<!-- 今は {$yo_bi} {$koma} です。IDは {$yo_bikomaID} です。 -->

<style>
.pad {
    column-gap: 0.25rem;
}
.bfy {
    gap: 0.25rem;
    flex-direction: row;
    padding: 0.25rem;
    /* width: 100%; */
}
.clases:hover {
    box-shadow: 0 0 0 4px #63605a40;
}
.c3 {
    width: 2.3rem;
    text-align: center;
}
.ifx {
    flex-direction: column;
    /* width: 2.6rem; */
    padding-inline: 0.14rem;
    font-size: 0.9rem;
}
.floor {
    /* justify-content: end; */
    width: 1.3rem;
    color: #8f8c87;
    border: 1px #d0cfcb solid;
    /* padding-inline: 0.25rem; */
}
button[data-kogi='0'] { /* .green, */
    background-color: #00874b;
    color: #f7fdfa;
}
button[data-kogi='1'] { /* .gray, */
    background-color: #e5e4e3;
    color: #8f8c87;
}
</style>
