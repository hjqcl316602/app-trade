<script>
const instance = {};
instance.name = "vui-radio";
instance.props = {
  value: { type: Boolean },
  name: { type: String },
  disabled: { type: Boolean }
};
instance.methods = {
  changeStatus() {
    if (this.disabled) return;
    if (this.isGroup) {
      if (!this.$parent.least && this.currentValue === this.name) {
        this.currentValue = "";
      } else {
        this.currentValue = this.name;
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
    return this.$parent && this.$parent.name === "vui-radio-group";
  }
};

export default instance;
</script>

<template>
  <div :class="['vui-radio']" @click="changeStatus">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>