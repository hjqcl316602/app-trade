<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 10:32:37
 * @LastEditTime: 2019-08-08 10:32:37
 * @LastEditors: your name
 -->
<script>
const instance = {};
instance.name = "vui-check";
instance.props = {
  value: { type: Boolean },
  name: { type: String },
  disabled: { type: Boolean }
};
instance.methods = {
  changeStatus() {
    if (this.disabled) return;
    if (this.isGroup) {
      // 判断该值是否存在数组中
      let index = this.currentValue.findIndex(elem => {
        return elem === this.name;
      });
      if (index > -1) {
        this.currentValue.splice(index, 1);
      } else {
        
        if (this.currentValue.length === this.$parent.max) {
          this.currentValue.shift(); // 删除第一个
        }
        this.currentValue.push(this.name);
      }
    } else {
      this.currentValue = !this.currentValue;
    }
  }
};

instance.computed = {
  currentValue: {
    get() {
      return this.isGroup ? this.$parent.value : this.value;
    },
    set(val) {
      if (this.isGroup) {
        this.$parent.$emit("input", val);
        this.$parent.$emit("change", val);
      } else {
        this.$emit("input", val);
        this.$emit("change", val);
      }
    }
  },
  isGroup() {
    return this.$parent && this.$parent.name === "vui-check-group";
  }
};

export default instance;
</script>

<template>
  <div :class="['vui-check']" @click="changeStatus">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>