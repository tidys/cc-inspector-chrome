import ccui from "@xuyanfeng/cc-ui";
import "@xuyanfeng/cc-ui/dist/ccui.css";
import "@xuyanfeng/cc-ui/iconfont/iconfont.css";
import { createApp } from "vue";
import { DocumentEvent } from "../const";
import App from "../inject-view/app.vue";
export class InjectView {
  private _inited = false;
  private css: string[] = [];
  private shadowRoot: ShadowRoot | null = null;
  private hasLoadCss = false;
  constructor() {
    document.addEventListener(DocumentEvent.LoadInjectCss, (event: CustomEvent) => {
      const cssArray: string[] = event.detail;
      this.css = cssArray;
      this.loadCss();
    });
  }
  public init() {
    if (this._inited) {
      return;
    }
    this._inited = true;
    this.createUI();
  }
  private loadCss() {
    if (!this.shadowRoot) {
      return;
    }
    if (this.hasLoadCss) {
      return;
    }
    if (this.css.length === 0) {
      return;
    }
    this.hasLoadCss = true;
    this.css.forEach((css) => {
      const link = document.createElement("link");
      link.href = css;
      link.rel = "stylesheet";
      this.shadowRoot.appendChild(link);
    });
  }
  private createUI() {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.zIndex = "99999";
    el.style.bottom = "0";
    el.style.right = "0";
    el.style.left = "0";
    document.body.appendChild(el);
    const shadowRoot = el.attachShadow({ mode: "open" });
    shadowRoot.ATTRIBUTE_NODE;
    this.shadowRoot = shadowRoot;

    // load css
    this.loadCss();
    // vue
    const root = document.createElement("div");
    shadowRoot.appendChild(root);
    const app = createApp(App);
    // ccui.uiElement.setDoc(document);
    app.use(ccui);
    app.mount(root);
  }
}
export const injectView = new InjectView();