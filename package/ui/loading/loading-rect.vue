<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 16:15:19
 * @LastEditTime: 2019-08-10 10:20:57
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  itemWidth: 4, // [ number ]移动条形的宽度
  itemScale: 0.5, //  [ number ]移动条形的长度，相对边的比例
  itemNumber: 2, //  [ number ]移动条形的数目 1  2  4
  layerColor: "#e5e5e5", //  [ string ]轨道颜色
  duration: 1500, // [ number ,string ]移动一圈的时间
  color: "#fff", // [ string ]
  size: 30 // [ number ,string ]尺寸,
};
export default {
  name: "vui-loading-rect",
  data() {
    return {};
  },
  props: {
    itemWidth: {
      type: Number,
      default: config.itemWidth
    },
    itemScale: {
      type: Number,
      default: config.itemScale
    },
    itemNumber: {
      type: Number,
      default: config.itemNumber
    },
    layerColor: {
      type: String,
      default: config.layerColor
    },
    duration: {
      type: Number,
      default: config.duration
    },
    size: {
      type: [Number, String],
      default: config.size
    },
    color: {
      type: String,
      default: config.color
    }
  },
  computed: {
    rectPathStyle() {
      let style = {};
      let duration =
        typeof this.duration === "number"
          ? this.duration + "ms"
          : this.duration;
      style["fill"] = "none";
      style["stroke-width"] = `${this.itemWidth * 10}px`;
      style["stroke"] = this.color;
      style["stroke-dasharray"] = `${800 * this.itemScale},${3200 -
        800 * this.itemScale}`;
      style["animation-duration"] = duration;
      return style;
    },
    rectPathNormalStyle() {
      let style = {};
      style["fill"] = "none";
      style["stroke-width"] = `${this.itemWidth * 10}px`;
      style["stroke"] = this.layerColor;
      return style;
    },
    rectStyle() {
      let style = {};
      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      style["width"] = size;
      style["height"] = size;

      return style;
    }
  }
};
</script>

<template>
  <div class="vui-loading-rect" :style="rectStyle">
    <svg viewBox="0 0 1000 1000" class="vui-loading-rect__svg">
      <path
        d="M 100 100 L 900 100 L 900 900 L 100 900 Z"
        :style="rectPathNormalStyle"
      />
      <path
        class="vui-loading-rect__path"
        d="M 100 100 L 900 100 L 900 900 L 100 900 Z"
        :style="rectPathStyle"
      />
      <path
        v-if="itemNumber > 3"
        class="vui-loading-rect__path"
        d="M 900 100 L 900 900 L 100 900 L 100 100 Z"
        :style="rectPathStyle"
      />
      <path
        v-if="itemNumber > 1"
        class="vui-loading-rect__path"
        d=" M 900 900 L 100 900 L 100 100 L  900 100 Z"
        :style="rectPathStyle"
      />
      <path
        v-if="itemNumber > 3"
        class="vui-loading-rect__path"
        d="  M 100 900 L 100 100 L  900 100 L  900 900 Z"
        :style="rectPathStyle"
      />
    </svg>
  </div>
</template>

<style   scoped>
</style>

