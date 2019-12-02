<script>
import { accordion } from "../config";
export default {
  name: "vui-accordion",
  data() {
    return {
      items: []
    };
  },
  props: {
    value: String
  },
  updated() {
    this.$nextTick(() => {
      this.updateChildren();
    });
  },
  mounted() {},
  methods: {
    updateChildren() {
      this.items.forEach((item, index) => {
        item.active = item["name"] === this.value;
        //console.log(child);
      });
    },
    onChange(active) {
      //console.log(e);
      if (this.value === active) return;
      this.$emit("input", active);
      this.$emit("change", active);
    }
  },
  watch: {
    ["items"]() {
      this.updateChildren();
    },
    ["value"]() {
      this.updateChildren();
    }
  }
};
</script>

<template>
  <div class="vui-accordion">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>

