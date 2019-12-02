<script>
import { accordion } from "../config";
export default {
  name: "vui-accordion-item",
  data() {
    return {
      active: false
    };
  },
  props: {
    name: {
      type: String,
      default: accordion.item.name
    },
    maxHeight: {
      type: Number,
      default: accordion.item.maxHeight
    },
	
  },
  methods: {
    changePanel() {
      this.$parent.onChange(this.name);
    }
  },
  beforeCreate() {
    this.$parent.items.push(this);
  },
  beforeDestroy() {
    this.$parent.items.splice(this.$parent.items.indexOf(this), 1);
  },
  computed: {
    panelStyle() {
      return {
        maxHeight: this.active ? this.maxHeight + "px" : 0 
      };
    }
  }
};
</script>

<template>
  <div class="vui-accordion-item">
    <div class="vui-accordion__header" @click="changePanel">
      <slot name="header"> </slot>
    </div>
    <div class="vui-accordion__panel" :style="panelStyle">
      <slot name="panel"></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>