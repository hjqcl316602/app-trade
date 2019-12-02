<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:04:38
 * @LastEditTime: 2019-08-21 11:34:59
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  type: "left", // [ String ]  位置类型 ['left','right','top','bottom','center','cover','top-right','top-left','bottom-left','bottom-right','top-center','bottom-center','left-center','right-center']
  zIndex: 1,
  paddingWidth: false, // 是否设置父元素的padding值,
  paddingHeight: false
};
const instance = {};
instance.name = "vui-grail-child";
instance.props = {
  type: {
    type: String,
    default: config.type
  },
  zIndex: { type: [Number, String], default: config.zIndex },
  paddingWidth: { type: Boolean, default: config.paddingWidth },
  paddingHeight: { type: Boolean, default: config.paddingHeight }
};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.beforeCreate = function() {
  this.$parent.childs.push(this);
};
instance.beforeDestroy = function() {
  this.$parent.childs.splice(this.$parent.childs.indexOf(this), 1);
};
instance.computed = {
  className() {
    let className = ["vui-grail-child"];
    if (this.type) {
      className.push("vui-grail-child--" + this.type);
    }
    return className;
  },
  style() {
    return {
      zIndex: this.zIndex
    };
  }
};
export default instance;
</script>

<template>
  <div :class="className" :style="style">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>