<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 14:42:57
 * @LastEditTime: 2019-09-09 17:29:39
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  direction: "row",
  duration: 0,
  height: "24px"
};
const instance = {};
instance.name = "vui-notice-bar";
instance.props = {
  duration: {
    type: Number,
    default: config.duration
  },
  height: {
    type: String,
    default: config.height
  },
  direction: {
    validator(value) {
      return ["row", "column"].includes(value);
    },
    default: config.direction
  }
};
instance.data = function() {
  return {
    wrap: {
      height: 0
    }
  };
};
instance.computed = {};
instance.methods = {
  initialize() {
    this.setContentStyles();
    this.setWrapStyles();
  },
  setWrapStyles() {
    let height =
      this.direction == "column"
        ? parseInt(this.height)
        : this.$refs["content"].offsetHeight;
    this.$el.style["height"] = height + "px";
  },
  setContentStyles() {
    this.$refs["content"].classList.add("is-" + this.direction);
    if (this.direction === "column") {
      this.$refs["content"].style["padding-top"] = this.height;
    }
    let time = 0;
    if (this.direction === "column") {
      let contentHeight = this.$refs["content"].offsetHeight;
      time = this.duration || contentHeight * 100;
    } else {
      let contentWidth = this.$refs["content"].offsetWidth;
      time = this.duration || contentWidth * 10;
    }
    this.$refs["content"].style["animation-duration"] = time + "ms";
    this.$refs["content"].classList.add("is-move");
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.$nextTick(() => {
    this.initialize();
  });
};
instance.watch = {};
export default instance;
</script>

<template>
  <div class="vui-notice-bar">
    <div class="vui-notice-bar--content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>