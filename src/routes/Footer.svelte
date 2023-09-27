<script>
    let componet = 'Svelte'
</script>

<section id="guide">
<div class="bfy">
    <h2>凡例</h2>
    <div class="bfx">
        <span class="bfx">
            <button class="ifx green">F000</button>
            <span>空き</span>
        </span>
        <span class="bfx">
            <button class="ifx gray">F000</button>
            <span>授業中</span>
        </span>
    </div>
</div>
<div class="bfy">
    <p>このアプリに対する<a href="./">アンケート</a>のご協力をお願いいたします。今後の参考のためアンケートです！</p>
    <p>空き教室は個人での自習にのみ利用可能です。団体での無断利用は控えてください。また、空き状況は臨時使用が入るなど、表示と異なる場合があります。利用に際しては、教職員の指示に従ってください。このアプリに関するお問い合わせは、アンケートフォームからお願いします。</p>
    <p>Design traced from <a href="//u-gakugei-uoa.pages.dev/akitan/">東京学芸大学 教室検索 非公式</a></p>
</div>
</section>

<style>
a {
    color: #0366d6;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
#guide {
    width: calc(40 * 0.75rem);
    padding: .5rem;
    gap: .5rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
}
.bfx {
    gap: 0.25rem;
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    width: 100%;
    justify-content: center;
}
.bfy {
    /* appearance: none; */
    /* background-clip: border-box; */
    /* background-color: rgba(0, 0, 0, 0); */
    /* background-origin: padding-box; */
    /* background-position: 0%; */
    /* background-repeat: repeat; */
    /* background-size: auto; */
    border: 1px #d0cfcb solid;
    border-radius: .5rem;
    /* border-style: solid; */
    /* border-width: 1px; */
    /* box-sizing: border-box; */
    color: #3e3b36;
    /* column-gap: 8px; */
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    /* font-size: 12px; */
    /* line-break: strict; */
    /* これinheritだときつい */
    line-height: 16px;
    /* list-style-type: none; */
    /* margin: 0px; */
    /* max-width: 100%; */
    /* min-height: 16px; */
    /* min-width: 0px; */
    /* outline-color: rgb(62, 59, 54); */
    /* outline-style: none; */
    /* outline-width: 0px; */
    /* overflow-wrap: break-word; */
    padding: .5rem;
    gap: .5rem;
    /* text-decoration-color: rgb(62, 59, 54); */
    /* text-decoration-line: none; */
    /* text-decoration-style: solid; */
    /* text-decoration-thickness: auto; */
    /* text-size-adjust: 100%; */
    /* width: 448px; */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
h2 {
    font-size: inherit;
}
.ifx {
    /* align-items: flex-start; */
    /* appearance: none; */
    /* background-clip: border-box; */
    /* background-origin: padding-box; */
    /* background-position: 0%; */
    /* background-repeat: repeat; */
    /* background-size: auto; */
    border-radius: .25rem;
    border-style: none;
    border-width: 0px;
    /* box-shadow: rgba(99, 96, 90, 0.25) 0px 0px 0px 0px; */
    /* box-sizing: border-box; */
    /* cursor: default; */
    /* display: flex; */
    /* flex-direction: row; */
    /* flex-shrink: 0; */
    /* font-kerning: auto; */
    /* font-optical-sizing: auto; */
    /* font-size: 12px; */
    /* font-stretch: 100%; */
    /* font-style: normal; */
    /* font-variant-alternates: normal; */
    /* font-variant-caps: normal; */
    /* font-variant-east-asian: normal; */
    /* font-variant-ligatures: normal; */
    /* font-variant-numeric: normal; */
    /* font-variation-settings: normal; */
    /* font-weight: 400; */
    /* justify-content: center; */
    /* letter-spacing: normal; */
    /* line-break: strict; */
    /* line-height: 16px; */
    /* list-style-type: none; */
    margin: 0px;
    padding: 0px;
    padding-inline: 4px;
    /* position: relative; */
    /* text-align: start; */
    /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
}
.green {
    background-color:  rgb(0, 135, 75);
    border-color: rgb(247, 253, 250);
    color: rgb(247, 253, 250);
}
.gray {
    background-color: rgb(229, 228, 227);
    border-color: rgb(143, 140, 135);
    color: rgb(143, 140, 135);
}
</style>
