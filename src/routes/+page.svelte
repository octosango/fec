<script>
    import Header from './Header.svelte'
    import Rooms from './Rooms.svelte'
    import Footer from './Footer.svelte'
    import Bottom from './Bottom.svelte'
    let componet = 'Svelte'
</script>

<div id="app" class="norm center-align bfy">
<header class="norm center-align center-justify bfy">
    <Header />
</header>

<main class="norm center bfy">
    <Rooms />
</main>

<footer class="norm bfy">
    <Footer />
</footer>

<aside class="norm center-align bfy">
    <Bottom />
</aside>
</div>


<style>
:global(html) {
    background: #fbfafa;
    color: #3e3b36;
}
:global(body) {
    margin: 0px;
    padding: 0px;
    line-height: 1.5rem;
    line-break: strict;
    overflow-wrap: break-word;
    list-style-type: none;
    text-size-adjust: none;
    text-decoration: none;
    font-family: Inter, Roboto, "源ノ角ゴシック JP", "Noto Sans JP", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Hiragino Sans", ヒラギノ角ゴシック, "Segoe UI", メイリオ, Meiryo, sans-serif;
    font-feature-settings: "cv02", "cv03", "cv04", "cv05", "cv06", "cv08", "zero";
    font-size: medium;
}
:global(.norm) {
    min-width: 0;
    max-width: 100%;
    min-height: 1.5rem;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    background: transparent;
    line-height: inherit;
    line-break: strict;
    overflow-wrap: break-word;
    word-wrap: break-word;
    list-style-type: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    text-decoration: none;
    color: #3e3b36;
    font-family: inherit;
    font-size: inherit;
    font-feature-settings: inherit;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    appearance: none;
}
:global(.bfy) {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    width: 100%;
}
:global(.bfx) {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    width: 100%;
}
:global(.center-justify.bfy), :global(.center-justify.bfx), :global(.center-justify.ifx) {
    justify-content: center;
    
}
:global(.center-align.bfy), :global(.center-align.bfx), :global(.center-align.ifx){
    align-items: center;
}
:global(.ifx) {
    display: inline-flex;
    flex-direction: row;
    flex-shrink: 0;
}
:global(.flat) {
    position: relative;
    border-radius: 0.25rem;
    box-shadow: 0 0 0 0 #63605a40;
    text-align: start;
    transition: box-shadow 0.1s cubic-bezier(0, 0, 0, 1) 0s;
}
header {
    box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 4px;
    top: 0px;
    position: sticky;
    z-index: 1;
    gap: 0.5rem;
    /* bg-gray */
    /* safe-area-inset-top は iphoneX+用 */
    padding-block-start: calc(0.25rem + env(safe-area-inset-top));
    padding-block-end: 0.25rem;
    background: #fbfafa;
}
main {
    padding: 1rem;
    /* row-gap: 1rem; */
    /* gap: 0.5rem; */
    /* column-gap: 0.25rem; */
    width: calc(25 * 1rem);
    /* display: grid; */
}
footer {
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 1rem;
    gap: 0.75rem;
    width: calc(40 * 0.75rem);
}
aside {
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.13) 0px -2px 4px 0px;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    position: sticky;
    z-index: 1;
    background: #fbfafa;
}
</style>
