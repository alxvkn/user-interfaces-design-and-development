class MyNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<style>
my-nav ul {
    text-align: center;
    list-style-type: none;
    li {
        display: inline;
        padding: 10px;
    }
}
</style>
<nav>
    <ul>
        <li><a href="/index.html">Главная (о себе)</a></li>
        <li><a href="/portfolio/index.html">Работы (портфолио)</a></li>
        <li><a href="/blog/index.html">Блог (статьи)</a></li>
        <li><a href="/contact.html">Контакты</a></li>
    </ul>
</nav>
`
    }
}

customElements.define('my-nav', MyNav)
