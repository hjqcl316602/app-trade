<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 16:36:38
 * @LastEditTime: 2019-08-23 11:23:48
 * @LastEditors: Please set LastEditors
 -->
<script>
import styler from "../../es/domer/styler";
const config = {
  size: 30, // [ Number ,String] 尺寸
  layerColor: "#e5e5e5", //  [ String ] 轨道颜色
  color: "#fff", // [ String ]
  copies: 1, // [ number ] 占据的份数 1,2,3,4
  duration: 1500, // [ Number ,String ] 时长
  layerSize: 4 // [ Number ,String] 轨道的尺寸
};

let hash = 0;
const instance = {};
instance.name = "vui-loading-ring";
instance.props = {
  layerColor: {
    type: String,
    default: config.layerColor
  },
  layerSize: {
    type: [Number, String],
    default: config.layerSize
  },
  size: {
    type: [Number, String],
    default: config.size
  },
  color: {
    type: String,
    default: config.color
  },
  duration: {
    type: [Number, String],
    default: config.duration
  },
  copies: {
    validator(value) {
      return [1, 2, 3, 4].includes(value);
    },
    default: config.copies
  }
};
instance.data = function() {
  return {
    hash: hash++
  };
};
instance.methods = {
  setStyle() {
    this.$nextTick(() => {
      let dataHash = `data-v-${this.hash}`;
      let ringHash = `.vui-loading-ring[${dataHash}]`;
      let ringAfterHash = ringHash + ":after";
      this.$el.setAttribute(dataHash, "");

      let size = typeof this.size === "number" ? this.size + "px" : this.size;
      let layerSize =
        typeof this.layerSize === "number"
          ? this.layerSize + "px"
          : this.layerSize;
      let duration =
        typeof this.duration === "number"
          ? this.duration + "ms"
          : this.duration;
      styler.addRule(
        ringHash,
        {
          width: size,
          height: size
        },
        "loading-ring"
      );
      let style = {};
      style["border-width"] = layerSize;
      style["border-color"] = this.layerColor;
      style["animation-duration"] = duration;
      if (this.copies === 1) {
        style["border-top-color"] = this.color;
      }
      if (this.copies === 2) {
        style["border-top-color"] = this.color;
        style["border-right-color"] = this.color;
      }
      if (this.copies === 3) {
        style["border-top-color"] = this.color;
        style["border-right-color"] = this.color;
        style["border-bottom-color"] = this.color;
      }
      if (this.copies === 4) {
        style["border-color"] = this.color;
      }
      styler.addRule(ringAfterHash, style, "loading-ring");
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

export default instance;
</script>

<template>
  <div class="vui-loading-ring">
    <!-- <div class="vui-loading-ring__layer"></div>
    <div class="vui-loading-ring__aim" ></div> -->
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>