class MyFooter extends HTMLElement {
    connectedCallback() {
        console.log('MyFooter connectedCallback')

        this.innerHTML = `
<style>
footer {
    h1 {
        font-size: 1.5rem;
        padding-bottom: 20px;
    }

    hr {
        height: 2px;
        background-color: black;
    }

    #contacts-container {
        display: flex;
        justify-content: space-around;

        #phone-number {
            font-size: 3rem;
        }
    }

    hr.small {
        width: 50%;
    }

    #firm-name {
        text-align: center;

        #name {
            font-size: 1.5rem;
        }

        sup {
            position: absolute;
        }
    }
}
</style>
<footer>
    <hr>
    <h1>Для связи</h1>
    <div id="contacts-container">
        <div>
            Телефон:
            <span id="phone-number">223-322</span>
        </div>
        <div>
            Написать на <a href="mailto:mail@example.com">почту</a>
        </div>
    </div>
    <hr class="small">
    <div id="firm-name">
        <span id="name">Фирма</span>
        <sup>&copy; &lt;trade-mark&gt &reg; &trade; </sup>
    </div>
</footer>
`
    }
}

customElements.define('my-footer', MyFooter)
