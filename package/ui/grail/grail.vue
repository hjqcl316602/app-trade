<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:04:04
 * @LastEditTime: 2019-09-09 10:45:16
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "vui-grail";
instance.props = {};
instance.data = function() {
  return {
    childs: []
  };
};
instance.methods = {
  setStyle() {
    this.childs.forEach(element => {
      let type = element["type"];
      let elStyle = this.$el.style;
      let paddingHeight = element["paddingHeight"];
      let paddingWidth = element["paddingWidth"];
      let typeStorage = [
        "left",
        "right",
        "top",
        "bottom",
        "center",
        "cover",
        "top-right",
        "top-left",
        "bottom-left",
        "bottom-right"
      ];
      let widthTypes = [
        "left",
        "right",
        "top-right",
        "top-left",
        "bottom-left",
        "bottom-right",
        "left-center",
        "right-center"
      ];
      let heightTypes = [
        "top",
        "bottom",
        "top-right",
        "top-left",
        "bottom-left",
        "bottom-right",
        "top-center",
        "bottom-center"
      ];

      //elStyle["padding"] = 0;
      if (widthTypes.includes(type) && paddingWidth) {
        let width = element.$el.offsetWidth;
        if (type.indexOf("left") > -1) {
          elStyle["padding-left"] = width + "px";
        } else {
          elStyle["padding-right"] = width + "px";
        }
      }

      if (heightTypes.includes(type) && paddingHeight) {
        let height = element.$el.offsetHeight;
        if (type.indexOf("top") > -1) {
          console.log("grail", height);
          elStyle["padding-top"] = height + "px";
        } else {
          elStyle["padding-bottom"] = height + "px";
        }
      }
    });
  }
};
instance.mounted = function() {
  this.$nextTick(() => this.setStyle());
};
instance.updated = function() {
  this.$nextTick(() => this.setStyle());
};
export default instance;
</script>

<template>
  <div class="vui-grail">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>