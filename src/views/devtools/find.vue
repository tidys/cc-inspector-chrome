<template>
  <div class="find-game">
    <div style="display: flex; flex-direction: column; margin-bottom: 3px">
      <span>no games created by cocos creator found!</span>
      <span>{{ msg }}</span>
    </div>
    <Refresh @click="onBtnClickUpdatePage"></Refresh>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Msg, PluginEvent, ResponseSupportData } from "../../core/types";
import { ga } from "../../ga";
import { GA_Button } from "../../ga/type";
import { bridge } from "./bridge";
import Refresh from "./refresh.vue";
import { checkSupport } from "./util";
export default defineComponent({
  name: "find",
  components: { Refresh },
  setup(props) {
    bridge.on(Msg.ResponseSupport, (event: PluginEvent) => {
      let data: ResponseSupportData = event.data;
      const b: boolean = data.support;
      if (b) {
        msg.value = "";
      } else {
        msg.value = data.msg;
      }
    });
    const msg = ref<string>("");
    return {
      msg,
      onBtnClickUpdatePage() {
        ga.clickButton(GA_Button.FreshManual);
        checkSupport();
      },
    };
  },
});
</script>
<style lang="less" scoped>
.find-game {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;

  span {
    margin-right: 20px;
    color: white;
    font-size: 20px;
    user-select: none;
  }
}
</style>
