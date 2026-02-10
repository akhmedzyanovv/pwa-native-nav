import { getPlatform } from "./core/platform";
import { isStandalone } from "./core/pwa";

export class PwaNativeNav extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public connectedCallback() {
    this.render();
  }

  private render() {
    const platform = getPlatform();
    const standalone = isStandalone();

    console.log(
      `[PwaNativeNav] Platform: ${platform}, Standalone: ${standalone}`,
    );

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div>
          <strong>Debug Info:</strong><br>
          Platform: ${platform}<br>
          Is PWA: ${standalone}
        </div>
        `;
    }
  }
}

if (!customElements.get("pwa-native-nav")) {
  customElements.define("pwa-native-nav", PwaNativeNav);
}
