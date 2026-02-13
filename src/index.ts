import { getPlatform } from "./core/platform";
import { isStandalone } from "./core/pwa";

const styles = `
  :host {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    
    /* * BASE VARIABLES (WEB / FALLBACK MODE)
     * These are the defaults used when the app is NOT standalone
     * or running on a desktop/unsupported platform.
     */
    --_internal-bg: #ffffff;
    --_internal-border-top: 1px solid #e0e0e0; /* Solid border for Web */
    --_internal-shadow: none;
    --_internal-backdrop: none;
    --_internal-height: 50px;
    
    /* Safe Area is always respected, even in Web mode on mobile */
    padding-bottom: env(safe-area-inset-bottom, 0px);
    
    /* Apply Variables (Public > Internal) */
    background: var(--pwa-nav-bg, var(--_internal-bg));
    border-top: var(--pwa-nav-border-top, var(--_internal-border-top));
    box-shadow: var(--pwa-nav-shadow, var(--_internal-shadow));
    
    /* Backdrop filter needs prefixes for older Safari support */
    backdrop-filter: var(--_internal-backdrop);
    -webkit-backdrop-filter: var(--_internal-backdrop);
    
    z-index: var(--pwa-nav-z-index, 9999);
    transition: all 0.3s ease;
    
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  /* * MODE 1: STANDALONE iOS
   * Triggered only when: Platform is iOS AND App is installed/standalone.
   * Features: Translucent blur background, thin border.
   */
  :host([platform="ios"][standalone="true"]) {
    --_internal-bg: rgba(255, 255, 255, 0.85); /* Translucent */
    --_internal-border-top: 0.5px solid rgba(0,0,0,0.2); /* Hairline border */
    --_internal-backdrop: blur(20px); /* The "Frosted Glass" effect */
    --_internal-shadow: none;
  }

  /* * MODE 2: STANDALONE ANDROID
   * Triggered only when: Platform is Android AND App is installed/standalone.
   * Features: Solid white, elevation shadow, no border.
   */
  :host([platform="android"][standalone="true"]) {
    --_internal-bg: #ffffff;
    --_internal-border-top: none;
    --_internal-backdrop: none;
    /* Material Design Elevation 8dp approximation */
    --_internal-shadow: 0 -2px 10px rgba(0,0,0,0.1); 
  }

  /* Layout for the inner content */
  .nav-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: var(--pwa-nav-height, var(--_internal-height));
    width: 100%;
  }
`;

export class PwaNativeNav extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public connectedCallback() {
    this.render();
    this.initializeAttributes();
  }

  private initializeAttributes() {
    this.setAttribute("platform", getPlatform());
    this.setAttribute("standalone", isStandalone().toString());
  }

  private render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          ${styles}
        </style>
        <div class="nav-content">
            <slot></slot>
        </div>
        `;
    }
  }
}

if (!customElements.get("pwa-native-nav")) {
  customElements.define("pwa-native-nav", PwaNativeNav);
}
