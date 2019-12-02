<script>
import Vue from "vue";
import Mask from "../mask";
Vue.use(Mask);
const config = {
  value: false,
  type: "bottom", // bottom | top | right | left
  closable: true, //是可点击遮罩层关闭
  animate: true, // 是否动画
  title: "",
  scrollable: false // 背景是否可滚动
};
export default {
  name: "vui-popup",
  data() {
    return {};
  },
  props: {
    scrollable: { type: Boolean, default: config.scrollable },
    value: {
      type: Boolean,
      default: config.value
    },
    type: {
      type: String,
      default: config.type
    },
    closable: {
      type: Boolean,
      default: config.closable
    },
    animate: {
      type: Boolean,
      default: config.animate
    },
    title: {
      type: String,
      default: config.title
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    styles() {
      let className = ["vui-popup-wrap"];
      if (this.type) {
        className.push("is-popup--" + this.type);
      }
      if (this.animate) {
        className.push("is-popup--animate");
        if (this.value) {
          className.push("is-popup--animate-active");
        }
      }
      return {
        className
      };
    }
  },
  methods: {
    handler() {
      this.closable && this.$emit("input", false);
    },
    touchmove(event) {
      if (!this.scrollable) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },
  mounted() {}
};
</script>

<template>
  <div>
    <vui-mask v-model="currentValue" transitionName="fade"> </vui-mask>
    <div
      :class="styles.className"
      @click.self="handler"
      @touchmove="touchmove($event)"
    >
      <div class="vui-popup">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
