<script>
import clienter from "../../es/domer/clienter";
export default {
  name: "vui-swipe-cell",
  data() {
    return {
      translate: 0,
      isAnimate: false
    };
  },
  props: {},
  computed: {},
  methods: {
    start(e) {
      this.moveStatus = "start";
      this.moveStartX = clienter.getX(e);
      this._translate = this.translate;
    },
    move(e) {
      this.moveX = clienter.getX(e);
      this.translate = this._translate + this.moveX - this.moveStartX;
      this.updateTranslate(this.translate);
    },
    end(e) {
      this.isAnimate = true;
      let leftWidth = clienter.getWidth(this.$refs["left"]);
      let rightWidth = clienter.getWidth(this.$refs["right"]);
      if (this.translate < 0) {
        if (this.translate + rightWidth < 0) {
          // 该处不写‘=’可以刚好满足，单击漏出的部分，可以关闭，否则需要在左右两侧添加上关闭事件
          this.translate = -rightWidth;
        } else {
          this.translate = 0;
        }
      } else {
        if (this.translate - leftWidth > 0) {
          this.translate = leftWidth;
        } else {
          this.translate = 0;
        }
      }
      this.updateTranslate(this.translate);
      setTimeout(() => {
        this.isAnimate = false;
      }, 300);
    },
    cancel() {},
    updateTranslate(value) {
      this.$refs["wrapper"].style["transform"] = `translate3d(${value}px,0,0)`;
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="vui-swipe-cell">
    <div
      class="vui-swipe-cell-wrapper"
      ref="wrapper"
      :class="{ 'is-swipe-cell--animate': isAnimate }"
      @touchstart="start"
      @touchmove="move"
      @touchend="end"
      @touchcancel="cancel"
    >
      <slot></slot>
      <div class="vui-swipe-cell-right" ref="right">
        <slot name="right"></slot>
      </div>
      <div class="vui-swipe-cell-left" ref="left">
        <slot name="left"></slot>
      </div>
    </div>
  </div>
</template>
