import CCP from "cc-plugin/src/ccp/entry-main";
import { BuilderOptions } from "cc-plugin/src/declare";
import pluginConfig from "../cc-plugin.config";

CCP.init(pluginConfig, {
  load: () => {
    console.log("plugin load");
  },
  builder: {
    onAfterBuild(target: BuilderOptions) {},
  },
  messages: {
    showPanel() {
      CCP.Adaptation.Panel.open("self.main");
    },
  },
});
