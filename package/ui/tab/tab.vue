<script>
const config = {
  name: "" // [ String ] 当前tab的名称
};
const instance = {};
instance.name = "vui-tab";
instance.props = {
  name: { type: String, default: config.name }
};
instance.data = function() {
  return {};
};
instance.methods = {
  changeTab() {
    //console.log(this.$parent.moveStartX, this.$parent.moveEndX);
    if (this.$parent.moveStartX !== this.$parent.moveEndX) return; // 解决与父元素的滑动事件的冲突
    this.$parent.$emit("input", this.name);
  },
  setStyle() {
    if (!this.$parent.fix) return false;
    let max =
      this.$parent.items.length > this.$parent.threshold
        ? this.$parent.threshold
        : this.$parent.items.length;
    this.$el.style["width"] = 100 / max + "%";
  }
};

instance.mounted = function() {
  this.setStyle();
};
instance.created = function() {
  this.$parent.items.push(this);
};
instance.beforeDestroy = function() {
  this.$parent.items.splice(this.$parent.items.indexOf(this), 1);
};

export default instance;
</script>

<template>
  <div class="vui-tab" @click="changeTab">
    <slot></slot>
  </div>
</template>

<style scoped></style>
