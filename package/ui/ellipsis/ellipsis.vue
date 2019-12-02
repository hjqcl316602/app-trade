<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 09:07:56
 * @LastEditTime: 2019-09-06 17:35:10
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  clamp: 1,
  lineHeight: "18px",
  value: false
};
const instance = {};
instance.name = "vui-ellipsis";
instance.props = {
  clamp: {
    type: [Number, String],
    default: config.clamp
  },
  lineHeight: {
    type: String,
    default: config.lineHeight
  },
  message: String,
  value: {
    type: Boolean,
    default: config.value
  }
};
instance.data = function() {
  return {
    show: {
      spread: false
    }
  };
};
instance.computed = {
  currentValue: {
    get() {
      return this.value;
    },
    set() {
      this.$emit("input", value);
    }
  }
};
instance.methods = {
  setSpreadStatus(spread = false) {
    let maxHeight = 0;
    let innerHeight = this.$refs["inner"].offsetHeight;
    if (spread) {
      maxHeight = innerHeight + "px";
      this.$nextTick(() => {
        this.$el.style["padding-bottom"] =
          this.$refs["roll"].offsetHeight + "px";
      });
    } else {
      let lineHeight = parseInt(this.lineHeight);
      maxHeight = lineHeight * this.clamp + "px";
      if (innerHeight > lineHeight * this.clamp) {
        this.show.spread = true;
        this.$nextTick(() => {
          this.$el.style["padding-bottom"] =
            this.$refs["spread"].offsetHeight + "px";
        });
      } else {
        this.$el.style["padding-bottom"] = 0;
      }
    }
    this.$refs["outer"].style["max-height"] = maxHeight;
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.$nextTick(() => {
    this.setSpreadStatus(this.currentValue);
  });
};
instance.watch = {
  currentValue(value) {
    this.setSpreadStatus(value);
  }
};
export default instance;
</script>

<template>
  <div class="vui-ellipsis">
    <div class="vui-ellipsis-outer" ref="outer">
      <div class="vui-ellipsis-inner" ref="inner">
        <slot></slot>
      </div>
    </div>
    <div
      class="vui-ellipsis-spread"
      ref="spread"
      v-if="!currentValue && show.spread"
    >
      <slot name="spread"></slot>
    </div>
    <div class="vui-ellipsis-roll" ref="roll" v-if="currentValue">
      <slot name="roll"></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>