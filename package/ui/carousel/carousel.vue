<script>
import clienter from "../../es/domer/clienter";
export default {
  name: "vui-carousel",
  data() {
    return {
      childs: [],
      name: "vui-carousel",
      translate: 0
    };
  },
  props: {},
  computed: {},
  methods: {
    start(e) {
      console.log(clienter.getX(e));
      this.moveStatus = "start";
      this.moveStartX = clienter.getX(e);
      this._translate = this.translate;
    },
    move(e) {
      this.moveX = clienter.getX(e);
      this.translate = this._translate + this.moveX - this.moveStartX;
      console.log(this.translate);
      this.updateTranslate(this.translate);
    },
    end() {},
    updateTranslate(value) {
      this.childs.forEach(item => {
        item.$el.style["transform"] = `translateX(${value}px)`;
      });
    },
    updateIndex(index) {}
  },
  mounted() {}
};
</script>

<template>
  <div
    class="vui-carousel"
    @touchstart="start"
    @touchmove="move"
    @touchend="end"
  >
    <slot></slot>
  </div>
</template>
