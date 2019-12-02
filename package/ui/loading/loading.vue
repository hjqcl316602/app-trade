<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:55:59
 * @LastEditTime: 2019-08-21 11:11:34
 * @LastEditors: Please set LastEditors
 -->
<script>
import LoadingWave from "./loading-wave.vue";
export default {
  name: "vui-loading",
  components: {
    "vui-loading-wave": LoadingWave
  },
  data() {
    return {
      visible: false
    };
  },
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  methods: {
    changeVisible(status) {
      this.visible = status;
    }
  },
  computed: {
    loadingClassName() {
      let className = [];
      this.visible && className.push("vui-loading--active");
      return className;
    }
  }
};
</script>

<template>
  <div class="vui-loading" :class="loadingClassName">
    <div class="vui-loading__inner">
      <div>
        <vui-loading-wave align="center"></vui-loading-wave>
        <div class="vui-loading__message" v-if="!!message">
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style   scoped>
</style>