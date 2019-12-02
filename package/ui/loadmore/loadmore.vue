<script>
import scroller from "../../es/domer/scroller";
import heighter from "../../es/domer/heighter";
export default {
  name: "vui-loadmore",
  data() {
    return {};
  },
  props: {
    threshold: {
      type: Number,
      default: 40
    },
    canLoad: {
      // 是否可以加载
      type: Boolean,
      default: true
    }
  },
  computed: {},
  methods: {
    loadmore() {
      if (!this.canLoad) return;
      let scrollWrap = scroller(this.$el);
      //console.log("heighter", heighter(scrollWrap));
      //console.log("scrollTop", scroller.scrollTop(scrollWrap));
      //console.log("scrollHeight", scroller.scrollHeight(scrollWrap));
      let scrollWrapHeight = heighter(scrollWrap);
      let scrollWrapScrollTop = scroller.scrollTop(scrollWrap);
      let scrollWrapScrollHeight = scroller.scrollHeight(scrollWrap);
      if (scrollWrapScrollHeight > scrollWrapHeight) {
        if (
          scrollWrapHeight + scrollWrapScrollTop + this.threshold >
          scrollWrapScrollHeight
        ) {
          this.$emit("load");
        }
      }
    },
    setTimer() {
      this.timer = setInterval(() => {
        this.loadmore();
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setTimer();
    });
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>

<template>
  <div class="vui-loadmore">
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
