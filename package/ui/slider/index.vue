<script>
import { slider } from "../config/index";
export default {
  name: "vui-slider",
  data() {
    return {};
  },
  props: {
    size: {
      type: Number,
      default: slider.size
    }
  }
};
</script>

<template>
  <div class="vui-slider"></div>
</template>

<style   scoped>
</style>