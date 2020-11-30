class Button extends HTMLElement {
    constructor() {
        super();
        this._label = 'Click Me';
        this._showContent;
        this._contentDiv;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                input{
                    cursor:pointer
                }
            </style>
            <input type="button" value=""/>
            <div id="contentArea">
                This is content div
            </div>
        `;
    }

    connectedCallback() {
        const inputContainer = this.shadowRoot.querySelector('input');
        if (this.hasAttribute('label')) {
            this._label = this.getAttribute('label');
        }
        if (this.hasAttribute('showContent')) {
            const _showContent = this.getAttribute('showContent');
            this._showContent = (_showContent === 'false') ? Boolean(false) : Boolean(true);
        }
        inputContainer.value = this._label;
        inputContainer.addEventListener('click', this._toggleContent.bind(this));

        this._contentDiv = this.shadowRoot.getElementById('contentArea');
        this._toggleContent();
    }

    _toggleContent() {
        if (!this._showContent) {
            this._contentDiv.style.display = 'none';
        } else {
            this._contentDiv.style.display = 'block';
        }
        this._showContent = !this._showContent;
    }

}

customElements.define('kss-button', Button);