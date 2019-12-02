<script>
export default {
  name: "vui-carousel-child",
  data() {
    return {};
  },
  props: {},
  computed: {
    isExitParent() {
      return this.$parent && this.$parent.name === "vui-carousel";
    }
  },
  methods: {
    getParentWidth() {
      return this.$parent.$el.offsetWidth;
    }
  },
  mounted() {},
  beforeCreate() {
    this.$parent.childs.push(this);
  },
  beforeDestroy() {
    this.$parent.childs.splice(this.$parent.childs.indexOf(this), 1);
  }
};
</script>

<template>
  <div class="vui-carousel-child" :style="">
    <slot></slot>
  </div>
</template>
