<script>
const instance = {};
instance.name = "vui-check-group";
instance.props = {
  value: { type: Array },
  max: { type: Number },
  type: { type: String }
};
instance.data = function() {
  return {
    name: "vui-check-group"
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};

export default instance;
</script>

<template>
  <div :class="['vui-check-group', `vui-check--` + this.type]">
    <slot></slot>
  </div>
</template>

<style lang="less">
</style> 