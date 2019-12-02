<script>
const instance = {};
instance.name = "vui-radio-group";
instance.props = {
  value: { type: String },
  least: { type: Boolean },
  type: { type: String }
};
instance.data = function() {
  return {
    name: "vui-radio-group"
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};

export default instance;
</script>

<template>
  <div :class="['vui-radio-group', `vui-radio--` + this.type]">
    <slot></slot>
  </div>
</template>

<style lang="less">

</style> 