<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 18:18:42
 * @LastEditTime: 2019-08-20 15:24:42
 * @LastEditors: Please set LastEditors
 -->
<script>
import { ICON_LOADING_ROUND } from "../assets/image";
const config = {
  color: "#fff", // [string  ] 每个圆的颜色
  itemImage: ICON_LOADING_ROUND, // [string  ]  旋转的图片，由于svg没有实现角度渐变功能，只能通过图片背景的方式
  layerColor: "#232323", // [string  ]
  size: 30, //  [string ,number ] 圆的大小尺寸
  duration: 1500, // [string ,number ]移动一圈的时间
  itemWidth: 40 // [ number ] 旋转动画的宽度
};
export default {
  name: "vui-loading-round",
  data() {
    return {
      value: 542
    };
  },
  props: {
    layerColor: {
      type: String,
      default: config.layerColor
    },
    size: {
      type: [Number, String],
      default: config.size
    },
    itemImage: {
      type: String,
      default: config.itemImage
    },
    itemWidth: {
      type: Number,
      default: config.itemWidth
    },
    duration: {
      type: [Number, String],
      default: config.duration
    }
  },
  computed: {
    roundStyle() {
      let style = {};
      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      style["width"] = size;
      style["height"] = size;
      style["background-color"] = this.layerColor;
      return style;
    },
    roundCircleStyle() {
      let style = {};
      //style["stroke"] = "blue";
      let duration =
        typeof this.duration === "number"
          ? this.duration + "ms"
          : this.duration;
      style["stroke-width"] = this.itemWidth;
      style["animation-duration"] = duration;
      return style;
    }
  }
};
</script>

<template>
  <div class="vui-loading-round" :style="roundStyle">
    <svg
      width="440"
      height="440"
      viewBox="0 0 440 440"
      class="vui-loading-round__svg"
    >
      <defs>
        <pattern
          id="pattern-image"
          x="0"
          y="0"
          width="440"
          height="440"
          patternUnits="userSpaceOnUse"
        >
          <image
            :xlink:href="itemImage"
            x="0"
            y="0"
            width="440"
            height="440"
          ></image>
        </pattern>
      </defs>
      <circle
        class="vui-loading-round__circle"
        fill="none"
        stroke="url(#pattern-image)"
        :style="roundCircleStyle"
        stroke-miterlimit="1"
        cx="220"
        cy="220"
        r="160"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style   scoped>
</style>