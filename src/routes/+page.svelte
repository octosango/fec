<script>
    import Header from './Header.svelte'
    import Rooms from './Rooms.svelte'
    import Footer from './Footer.svelte'
    import Bottom from './Bottom.svelte'
    let componet = 'Svelte'
</script>

<div id="app" class="center bfy n">
<header class="center bfy">
    <Header />
</header>

<main class="center">
    <Rooms />
</main>

<footer class="center bfy">
    <Footer />
</footer>

<aside class="center bfy">
    <Bottom />
</aside>
</div>


<style>
#app {
    margin: 0;
    padding: 0;
    line-height: 1.5rem;
    line-break: strict;
    overflow-wrap: break-word;
    word-wrap: break-word;
    list-style-type: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    text-decoration: none;
    font-family: Inter, Roboto, "源ノ角ゴシック JP", "Noto Sans JP", ui-sans-serif, -apple-system, "system-ui", "Hiragino Sans", ヒラギノ角ゴシック, "Segoe UI", メイリオ, Meiryo, sans-serif;
    font-feature-settings: "cv02","cv03","cv04","cv05","cv06","cv08","zero";
    font-size: medium;
}
.n {
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
.bfy {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    width: 100%;
}
.center.bfy {
    justify-content: center;
    align-items: center;
}
header, main, footer, aside {
    /* appearance: none;
    background-attachment: scroll;
    background-clip: border-box; */

    /* background-image: none;
    background-origin: padding-box;
    background-position: 0%;
    background-repeat: repeat;
    background-size: auto;
    border-color: rgb(62, 59, 54);
    border-radius: 0px;
    border-style: none;
    border-width: 0px; */

    /* box-sizing: border-box;
    color: rgb(62, 59, 54); */

    /* font-size: 16px; */

    /* line-break: strict;
    line-height: 24px;
    list-style-type: none;
    margin: 0px;
    max-width: 100%;
    min-height: 24px;
    min-width: 0px;
    outline-color: rgb(62, 59, 54);
    outline-style: none;
    outline-width: 0px; */

    /* text-decoration-color: rgb(62, 59, 54);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-decoration-thickness: auto;
    text-size-adjust: 100%; */

    /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
}
header, aside {
    /* align-items: center;
    background-color: rgb(251, 250, 250); */
    /* width: 1201px; */
    /* width: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    font-size: 16px;
    position: sticky;
    z-index: 1; */
}
main, footer {
    /* background-color: rgba(0, 0, 0, 0);
    overflow-wrap: break-word; */
}
header {
    box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 4px 0px;
    column-gap: 8px;
    /* height: 40px; */
    justify-content: center;
    padding-block: 4px;
    padding: 4px 0px;
    row-gap: 8px;
}
main {
    /* column-gap: 4px; */
    /* つけたした */
    /* display: flex; */
    /* flex-direction: column; */
    /* flex-shrink: 1; */
    /* display: grid; */
    /* grid-template-columns: 89px 89px 89px 89px; */
    /* height: 748px; 多分計算 */
    padding: 16px;
    row-gap: 8px;
    top: 0px;
    /* width: 400px; */
    font-size: 16px;
}
footer {
    column-gap: 12px;
    /* height: 304px; 多分計算 */
    row-gap: 12px;
    /* display: flex;
    flex-direction: column;
    flex-shrink: 1; */
    /* width: 480; */
    font-size: 12px;
}
aside {
    /* align-items: center; */
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.13) 0px -2px 4px 0px;
    /* height: 74px; */
    /* overflow-wrap: break-word; */
    /* padding-block: 0px; */
    /* padding: 0px; */
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
}
</style>
