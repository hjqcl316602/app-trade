<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:37:30
 * @LastEditTime: 2019-08-10 08:45:11
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  label: "", // [ String ] 显示的信息
  direction: "top-right" // [ String ] 相对位置
};
export default {
  name: "vui-tag",
  data() {
    return {};
  },
  props: {
    label: {
      type: [String, Number],
      default: config.label
    },
    direction: {
      validator(value) {
        return [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "top-center",
          "bottom-center",
          "left-center",
          "right-center"
        ].includes(value);
      },
      default: config.direction
    }
  }
};
</script>

<template>
  <div class="vui-tag">
    <slot></slot>
    <div class="vui-tag--label" :class="'vui-tag--' + this.direction">
      <slot name="label">
        <div class="vui-tag--message">
          <span> {{ label }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
