<script>
    let componet = 'Svelte'
    import { yo_bi, koma } from './stores.js';
    let yobis = ["月", "火", "水", "木", "金"]
    let komas = [1, 2, 3, 4, 5, 6]
</script>

<div class="bfx pads">
    <div class="bfx radios">
        {#each yobis as y}
        <label>
            <input class="radios" type="radio" bind:group={$yo_bi} name="weekRadioday" value={y} data-checked={ ($yo_bi == y) ? "true" : "false" }>
            <span class="bfx">{y}</span>
        </label>
        {/each}
    </div>
    <div class="bfx radios">
        {#each komas as k}
        <label>
            <input class="radios" type="radio" bind:group={$koma} name="weekRadioperiod" value={k} data-checked={ ($koma == k) ? "true" : "false" }>
            <span class="bfx">{k}</span>
        </label>
        {/each}
    </div>
    <span class="gray">
        の空き教室
        <br>
        を表示中
    </span>
</div>

<style>
.bfx {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    width: 100%;

    min-width: 0;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    font-family: Inter, Roboto, "源ノ角ゴシック JP", "Noto Sans JP", ui-sans-serif, -apple-system, "system-ui", "Hiragino Sans", ヒラギノ角ゴシック, "Segoe UI", メイリオ, Meiryo, sans-serif;
    font-feature-settings: "cv02", "cv03", "cv04", "cv05", "cv06", "cv08", "zero";
    font-size: 16px;
    appearance: none;
}
.pads {
    padding: 1rem;
    gap: 0.5rem;
    width: calc(30 * 1rem);
}
label {
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    display: flex;
    /* flex-direction: column; */
    /* flex-shrink: 1; */
    width: 100%;
    
    /* min-width: 0; */
    /* max-width: 100%; */
    /* margin: 0; */
    /* padding: 0; */
    /* border: 0; */
}
span, label {
    justify-content: center;
    /* position: relative; */
    border-radius: 0.25rem;
    text-align: start;
    /* transition: box-shadow .1s cubic-bezier(0,0,0,1); */
    padding: 0.25rem;

    cursor: default;
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

    /* min-width: 0; */
    /* max-width: 100%; */
    /* margin: 0; */
    /* padding: 0; */
    /* border: 0; */
    /* box-sizing: border-box; */
    /* appearance: none; */
}
.radios {
    border-radius: 0.5rem;
    border: 1px rgb(208, 207, 203) solid;
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
