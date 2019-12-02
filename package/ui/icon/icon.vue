<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 22:25:03
 * @LastEditTime: 2019-09-03 18:10:57
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  size: "", // [ String , Number] 尺寸
  name: "", // [ String ]  名称
  color: "" // [ String ] 颜色
};
export default {
  name: "vui-icon",
  props: {
    size: {
      type: String,
      default: config.size
    },
    name: {
      type: String,
      default: config.name
    },
    color: {
      type: String,
      default: config.color
    }
  },
  data() {
    return {};
  },
  computed: {
    styles() {
      let style = {};
      let className = ["vui-icon"];
      let colorTypes = [
        "primary",
        "danger",
        "warning",
        "success",
        "black",
        "dark",
        "light",
        "gray",
        "white"
      ];
      if (this.color) {
        if (colorTypes.includes(this.color)) {
          className.push("vui-icon--" + this.color);
        } else {
          style["color"] = this.color;
        }
      } else {
        style["color"] = "inherit";
      }
      if (this.name) {
        if (this.name.indexOf("vui-icon") > -1) {
          className.push(this.name);
        } else {
          className.push("vui-icon--" + this.name);
        }
      }

      let sizeTypes = ["smaller", "small", "medium", "large", "larger"];

      if (this.size) {
        if (sizeTypes.includes(this.size)) {
          className.push("vui-icon--" + this.size);
        } else {
          style["font-size"] = this.size;
        }
      } else {
        style["font-size"] = "inherit";
      }
      return { style, className };
    }
  }
};
</script>

<template>
  <div :class="styles.className" :style="styles.style"></div>
</template>

<style   scoped>
</style>