<script>
    let componet = 'Svelte'
    import { yo_bi, koma } from './stores.js';
    let yobis = ["月", "火", "水", "木", "金"]
    let komas = [1, 2, 3, 4, 5, 6]
</script>

<div class="norm bfy c30">
<div class="norm bfx pads">
    <div class="norm bfx radios">
        {#each yobis as y}
        <label class="norm center-justify bfy">
            <input class="i" type="radio" bind:group={$yo_bi} name="weekRadioday" value={y} data-checked={ ($yo_bi == y) ? "true" : "false" }>
            <span class="center-justify bfx">{y}</span>
        </label>
        {/each}
    </div>
    <div class="norm bfx radios">
        {#each komas as k}
        <label class="norm center-justify bfy">
            <input class="i" type="radio" bind:group={$koma} name="weekRadioperiod" value={k} data-checked={ ($koma == k) ? "true" : "false" }>
            <span class="center-justify bfx">{k}</span>
        </label>
        {/each}
    </div>
    <span class="gray">
        の空き教室
        <br>
        を表示中
    </span>
</div>
</div>

<style>
.c30 {
    width: calc(30 * 1rem);
    padding: 1rem;
    gap: 0.5rem;
}
.pads {
    gap: 0.5rem;
}
span, label {
    cursor: default;
    position: relative;
    border-radius: 0.25rem;
    box-shadow: 0 0 0 0 #63605a40;
    text-align: start;
    transition: box-shadow 0.1s cubic-bezier(0, 0, 0, 1) 0s;
}
/* span.bfx:hover { */
label:hover {
    box-shadow: 0 0 0 4px #63605a40;
}
/* input:checked, input[data-checked="true"]+span { */
label:has(input[data-checked="true"]) {
    color: rgb(0, 118, 59);
    background-color: rgb(212, 244, 228);
}
input {
    display: none;
}
.radios {
    border-radius: 0.5rem;
    border: 1px #d0cfcb solid;
    gap: 0.25rem;
    padding: 0.25rem;
}
.gray {
    font-size: .9rem;
    display: inline-flex;
    flex-direction: row;
    flex-shrink: 0;

    min-width: 0;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
}
</style>
