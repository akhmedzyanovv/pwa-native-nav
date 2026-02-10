export class PwaNativeNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = '<p>Connected</p>'
    }
  }
}

if (!customElements.get("pwa-native-nav")) {
    customElements.define("pwa-native-nav", PwaNativeNav);
}