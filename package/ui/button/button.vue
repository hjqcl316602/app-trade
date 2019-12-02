<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:26:08
 * @LastEditTime: 2019-08-31 09:52:58
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  long: false,
  pack: false,
  hollow: false,
  disabled: false,
  radius: false,
  round: false,
  thin: false,
  dashed: false,
  color: "",
  size: "",
  colors: ["primary", "danger", "warning", "success", "black", "white"],
  sizes: ["smaller", "small", "large", "larger"]
};
const instance = {};
instance.name = "vui-button";
instance.props = {
  long: { type: Boolean, default: config.long },
  pack: { type: Boolean, default: config.pack },
  hollow: { type: Boolean, default: config.hollow },
  disabled: { type: Boolean, default: config.disabled },
  radius: { type: Boolean, default: config.radius },
  round: { type: Boolean, default: config.round },
  thin: { type: Boolean, default: config.thin },
  dashed: { type: Boolean, default: config.dashed },
  size: { type: String, default: config.size },
  color: { type: String, default: config.color }
};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.computed = {
  styles() {
    let className = ["vui-button"];
    let style = {};
    if (this.disabled) {
      className.push("vui-button-disabled");
    }
    if (this.long) {
      className.push("vui-button-long");
    }
    if (this.pack) {
      className.push("vui-button-pack");
      if (this.radius) {
        className.push("vui-button-radius");
      } else {
        if (this.round) {
          className.push("vui-button-round");
        }
      }
    }
    if (this.hollow) {
      className.push("vui-button-hollow");
      if (this.thin) {
        className.push("vui-button-hollow--thin");
      }
      if (this.dashed) {
        className.push("vui-button-hollow--dashed");
      }
      if (this.radius) {
        className.push("vui-button-radius");
      } else {
        if (this.round) {
          className.push("vui-button-round");
        }
      }
    }
    if (this.size) {
      let sizes = ["smaller", "small", "large", "larger"];
      if (config.sizes.includes(this.size)) {
        className.push("vui-button--" + this.size);
      } else {
        style["line-height"] = this.size;
      }
    }
    if (this.color) {
      if (config.colors.includes(this.color)) {
        className.push("vui-button--" + this.color);
      } else {
        if (this.hollow) {
          style["color"] = "#fff";
          style["background-color"] = this.color;
        } else {
          style["color"] = this.color;
        }
      }
    }

    return { className, style };
  }
};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div
    :class="styles.className"
    :style="styles.style"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>