<script>
const instance = {};
instance.name = "vui-carsousel-bar";
instance.props = {
  size: { type: Number },
  layerColor: { type: String },
  activeColor: { type: String },
  barLen: { type: Number },
  value: { type: Number }
};
instance.data = function() {
  return {};
};
instance.methods = {
  change(index) {
    if (this.value === index) return;
    this.$emit("input", index);
    this.$emit("change", index);
  }
};
instance.created = function() {};
instance.mounted = function() {};

export default instance;
</script>

<template>
  <div class="vui-carsousel-bar">
    <div
      class="vui-carsousel-bar__item"
      v-for="(item, index) in barLen"
      @click="change(index)"
      :key="index"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: index === value ? activeColor : layerColor
      }"
    ></div>
  </div>
</template>

<style   scoped>
</style>