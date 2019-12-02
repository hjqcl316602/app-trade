<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 09:40:25
 * @LastEditTime: 2019-08-24 10:12:48
 * @LastEditors: Please set LastEditors
 -->
<script>
const instance = {};
instance.name = "vui-loading-bar";
instance.props = {};
instance.data = function() {
  return {};
};
instance.methods = {
  setWidth(percent) {
    this.$nextTick(() => {
      this.$el.style["width"] = percent + "%";
    });
  }
};
instance.created = function() {};
instance.mounted = function() {};
export default instance;
</script>

<template>
  <div class="vui-loading-bar"></div>
</template>

<style   scoped>
</style>