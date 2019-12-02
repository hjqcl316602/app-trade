<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 22:44:59
 * @LastEditTime: 2019-08-11 09:02:44
 * @LastEditors: Please set LastEditors
 -->
<script>

const config = {
  ratio: 1,  // [number ] 等比缩放比例 ratio =  宽/高
};

export default {
  name: "vui-ratio",
  data() {
    return {};
  },
  props: {
    ratio: {
      type: Number,
      default: config.ratio
    }
  },
  computed: {
    ratioStyle() {
      return {
        paddingTop: 100 / this.ratio + "%"
      };
    }
  }
};
</script>

<template>
  <div class="vui-ratio">
    <div class="vui-ratio--wrap" :style="ratioStyle">
      <div class="vui-ratio--inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style   scoped>
</style>