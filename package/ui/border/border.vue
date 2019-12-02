<script>
import styler from "../../es/domer/styler";
const config = {
  size: 1, // [ Number ] border的尺寸
  color: "#dedede", // [ String] border的颜色
  left: false, // [ Boolean ] 是否显示左边框
  bottom: false, // [ Boolean ] 是否显示下边框
  right: false, // [ Boolean ] 是否显示右边框
  top: false, // [ Boolean ] 是否显示上边框
  round: false, // [ Boolean ] 是否显示四周的边框
  radius: 0, // [ Number ] border-radiusda大小
  circle: false, //[ Boolean ] 是否是圆角
  type: "solid" // [ String ] border样式 solid dashed...
};

let hash = 0;
const instance = {};
instance.name = "vui-border";
instance.props = {
  size: { type: Number, default: config.size },
  color: { type: String, default: config.color },
  radius: { type: [Number, String], default: config.radius },
  left: { type: Boolean, default: config.left },
  right: { type: Boolean, default: config.right },
  top: { type: Boolean, default: config.top },
  bottom: { type: Boolean, default: config.bottom },
  round: { type: Boolean, default: config.round },
  type: { type: String, default: config.type },
  circle: { type: Boolean, default: config.circle }
};
instance.data = function() {
  return {
    hash: hash++
  };
};
instance.methods = {
  setStyle() {
    this.$nextTick(() => {
      this.$el.setAttribute(`data-v-${this.hash}`, "");
      let style = {};
      style["border-color"] = this.color;
      style["border-style"] = this.type;
      style["height"] = 100 * (1 / this.size) + "%";
      style["width"] = 100 * (1 / this.size) + "%";
      style["transform"] = "scale(" + this.size + ")";
      style["border-width"] = 0;
      if (this.circle) {
        style["border-radius"] = "10rem";
      } else {
        style["border-radius"] = parseFloat(this.radius) * 2 + "px";
      }

      if (this.bottom) {
        style["border-bottom-width"] = "1px";
      }
      if (this.top) {
        style["border-top-width"] = "1px";
      }
      if (this.left) {
        style["border-left-width"] = "1px";
      }
      if (this.right) {
        style["border-right-width"] = "1px";
      }
      if (this.round) {
        style["border-width"] = "1px";
      }
      styler.addRule(`.vui-border[data-v-${this.hash}]:after`, style, "border");
    });
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.setStyle();
};
instance.updated = function() {
  this.setStyle();
};
/* dsds */
export default instance;
</script>

<template>
  <div
    class="vui-border"
    :style="{
      'border-radius': this.circle ? '10em' : parseFloat(this.radius) + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
