<script>
import Vue from "vue";
import Mask from "../mask";
import { confirm } from "../config";

Vue.use(Mask);

const instance = {};
instance.name = "vui-confirm";
instance.props = {
  title: { type: String, default: confirm.title },
  closable: { type: Boolean, default: confirm.closable },
  scrollable: { type: Boolean, default: confirm.scrollable },
  maskShow: { type: Boolean, default: confirm.maskShow },
  okShow: { type: Boolean, default: confirm.okShow },
  cancelShow: { type: Boolean, default: confirm.cancelShow },
  okText: { type: String, default: confirm.okText },
  cancelText: { type: String, default: confirm.cancelText },
  value: { type: Boolean, default: confirm.value }
};
instance.data = function() {
  return {
    currentValue: false
  };
};
instance.methods = {
  cancelHandler() {
    this.$emit("input", false);
    this.$emit("cancel");
  },
  okHandler() {
    this.$emit("input", false);
    this.$emit("ok");
  },
  changeShow() {}
};
instance.created = function() {};
instance.mounted = function() {};
instance.computed = {
  confirmClassName() {
    let className = ["vui-confirm"];
    if (this.value) {
      className.push("is-confirm--show");
    }
    return className;
  }
};

instance.watch = {
  value: {
    handler(val) {
      this.currentValue = val;
    },
    immediate: true
  },
  currentValue(val, oldval) {
    this.$emit("input", val);
  }
};
export default instance;
</script>

<template>
  <div>
    <vui-mask v-if="maskShow" v-model="currentValue"></vui-mask>
    <div :class="confirmClassName">
      <slot name="header">
        <div
          class="vi-text is-align--center vi-border is-border--bottom is-border--thiner"
          style="line-height: 44px"
        >
          <span class="vi-text is-color--primary ">
            {{ title }}
          </span>
        </div>
      </slot>
      <slot> </slot>
      <slot name="footer">
        <div
          class="vi-text is-align--right vi-border is-border--top is-border--thiner"
        >
          <div class="vi-btn is-btn--larger" @click="cancelHandler">取消</div>
          <div class="vi-btn is-btn--larger is-btn--primary" @click="okHandler">
            确认
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
