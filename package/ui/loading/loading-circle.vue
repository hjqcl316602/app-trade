<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:22:06
 * @LastEditTime: 2019-08-10 10:22:25
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  color: "#fff", // [ string ] 每个圆的颜色
  size: 30, // [ string , number ] 每个圆的大小尺寸
  itemSize: 6 // [ string , number ] 每个圆的大小
};
export default {
  name: "vui-loading-circle",
  props: {
    color: {
      type: String,
      default: config.color
    },
    size: {
      type: [Number, String],
      default: config.size
    },
    itemSize: {
      type: [Number, String],
      default: config.itemSize
    }
  },
  computed: {
    listStyle() {
      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      return {
        height: size,
        width: size
      };
    },
    itemStyle() {
      let style = {};
      let itemSize =
        typeof this.itemSize === "number"
          ? this.itemSize + "px"
          : this.itemSize;
      style["backgroundColor"] = this.color;
      style["width"] = itemSize;
      style["height"] = itemSize;
      return style;
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  <div class="vui-loading-circle" :style="listStyle">
    <div class="vui-loading-circle__list">
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
    </div>
    <div class="vui-loading-circle__list">
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
    </div>
    <div class="vui-loading-circle__list">
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
      <div class="vui-loading-circle__item" :style="itemStyle"></div>
    </div>
  </div>
</template>

<style   scoped>
</style>