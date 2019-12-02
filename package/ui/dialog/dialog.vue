<script>
const instance = {};
instance.name = "vui-loading";
instance.props = {};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.methods.change=function(){
  console.log(this)
}
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-loading"></div>
</template>

<style   scoped>
</style>