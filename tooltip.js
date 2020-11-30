class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Tooltip Text Here';
        this._tooltipBgColor = 'black';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div{
                    background-color:#000;
                    color:#fff;
                    position: absolute;
                    z-index: 2;
                    padding: 5px;
                }
            </style>
            <slot></slot>
            <span> (?)</span>
        `;
    }
    connectedCallback() {
        if (this.hasAttribute('tooltip-text')) {
            this._tooltipText = this.getAttribute('tooltip-text');
        }
        if (this.hasAttribute('bg-color')) {
            this._tooltipBgColor = this.getAttribute('bg-color');
        }
        // const tooltipIcon = document.createElement('span');
        // tooltipIcon.textContent = ' (?)';
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.appendChild(tooltipIcon);
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.backgroundColor = this._tooltipBgColor;
        // this.appendChild(this._tooltipContainer);
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        // this.removeChild(this._tooltipContainer);
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('kss-tooltip', Tooltip);