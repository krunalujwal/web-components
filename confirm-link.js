class ConfirmLink extends HTMLAnchorElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you want to proceed ?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('kss-confirm-link', ConfirmLink, { extends: 'a' });