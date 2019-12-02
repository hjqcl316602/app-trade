<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:25:59
 * @LastEditTime: 2019-08-10 10:21:50
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  color: "#fff", //  [ string ]每个圆的颜色
  size: 30, //  [ string , number ]每个圆的大小尺寸
  duration: 1500 //  [ string , number ]动画周期
};
export default {
  name: "vui-loading-cross",
  props: {
    color: {
      type: String,
      default: config.color
    },
    size: {
      type: [Number, String],
      default: config.size
    },
    duration: {
      type: Number,
      default: config.duration
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      return {
        height: size,
        width: size
      };
    },
    itemStyle() {
      let style = {};
      let duration =
        typeof this.duration === "number"
          ? this.duration + "ms"
          : this.duration;
      style["backgroundColor"] = this.color;
      style["animation-duration"] = duration;
      return style;
    }
  }
};
</script>

<template>
  <div class="vui-loading-cross" :style="style">
    <div class="vui-loading-cross__wrap">
      <div class="vui-loading-cross__item" :style="itemStyle"></div>
      <div class="vui-loading-cross__item" :style="itemStyle"></div>
      <div class="vui-loading-cross__item" :style="itemStyle"></div>
      <div class="vui-loading-cross__item" :style="itemStyle"></div>
    </div>
  </div>
</template>

<style   scoped>
</style>