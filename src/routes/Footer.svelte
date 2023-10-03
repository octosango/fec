<script>
    let componet = 'Svelte'
</script>

<!-- <section id="guide"> -->
<div class="norm bfy">
    <h2 class="ifx">凡例</h2>
    <div class="bfx">
        <span class="bfx">
            <button class="flat ifx green">F000</button>
            <span>空き</span>
        </span>
        <span class="bfx">
            <button class="flat ifx gray">F000</button>
            <span>授業中</span>
        </span>
    </div>
</div>
<div class="bfy">
    <p>このアプリに対する<a href="./">アンケート</a>のご協力をお願いいたします。今後の参考のためアンケートです！</p>
    <p>空き教室は個人での自習にのみ利用可能です。団体での無断利用は控えてください。また、空き状況は臨時使用が入るなど、表示と異なる場合があります。利用に際しては、教職員の指示に従ってください。このアプリに関するお問い合わせは、アンケートフォームからお願いします。</p>
    <p>Design traced from <a href="//u-gakugei-uoa.pages.dev/akitan/">東京学芸大学 教室検索 非公式</a></p>
</div>
<!-- </section> -->

<style>
a {
    color: #0366d6;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
.bfx {
    gap: 0.25rem;
    justify-content: center;
}
.bfy {
    border: 1px #d0cfcb solid;
    border-radius: .5rem;
    gap: .5rem;
    padding: .5rem;
}
h2 {
    font-size: 0.9rem;
}
.flat {
    border-style: none;
    padding-inline: 0.25rem;
}
.green {
    background-color:  #00874b;
    color: #f7fdfa;
}
.gray {
    background-color: #e5e4e3;
    color: #8f8c87;
}
</style>
