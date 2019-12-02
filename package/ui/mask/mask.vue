<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-30 15:34:50
 * @LastEditTime: 2019-09-04 11:48:41
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  value: false,
  closable: true,
  scrollable: false,
  transitionName: "fade" // 动画名称
};
const instance = {};
instance.name = "vui-mask";
instance.props = {
  value: { type: Boolean, default: config.value },
  closable: { type: Boolean, default: config.closable },
  scrollable: { type: Boolean, default: config.scrollable },
  transitionName: { type: String, default: config.transitionName }
};
instance.data = function() {
  return {
    currentValue: false
  };
};
instance.methods = {
  transition() {
    if (this.value && !this.scrollable) {
      document.body.classList["add"]("vi-locked");
    } else {
      document.body.classList["remove"]("vi-locked");
    }
  },
  handler() {
    this.closable && this.$emit("input", false);
    this.$emit("click");
  },
  touchmove(event) {
    if (this.value && !this.scrollable) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.$nextTick(() => {
    this.transition();
    this.currentValue = this.value;
  });
};
instance.updated = function() {
  this.transition();
};
instance.computed = {};

instance.watch = {
  currentValue(val) {
    this.$emit("input", val);
  },
  value(val) {
    this.currentValue = val;
  }
};

export default instance;
</script>

<template>
  <transition :name="transitionName">
    <div
      class="vui-mask"
      @click.self="handler"
      v-if="currentValue"
      @touchmove="touchmove"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped></style>
