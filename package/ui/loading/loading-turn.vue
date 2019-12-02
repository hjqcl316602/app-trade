<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 12:12:09
 * @LastEditTime: 2019-08-10 10:30:43
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  color: "#fff", // [ string ] 每个方块的颜色
  size: 30, // [ string ,number] 每个方块的大小尺寸
  duration: 1500 // [ string ,number]移动一圈的时间
};
export default {
  name: "vui-loading-turn",
  data() {
    return {};
  },
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
      type: [Number, String],
      default: config.duration
    }
  },
  computed: {
    turnStyle() {
      let style = {};
      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      let duration =
        typeof this.duration === "number"
          ? this.duration + "ms"
          : this.duration;
      style["width"] = size;
      style["height"] = size;
      style["background-color"] = this.color;
      style["animation-duration"] = duration;
      return style;
    }
  }
};
</script>

<template>
  <div class="vui-loading-turn" :style="turnStyle"></div>
</template>

<style   scoped>
</style>