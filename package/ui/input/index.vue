<script>
import { input } from "../config/index";
export default {
  name: "vui-input",
  props: {
    border: {
      type: Boolean,
      default: input.border
    },
    borderType: {
      type: String,
      default: input.borderType
    },
    borderStyleType: {
      type: String,
      default: input.borderStyleType
    },
    borderWeightType: {
      type: String,
      default: input.borderWeightType
    },
    radius: {
      type: Boolean,
      default: input.radius
    },
    radiusType: {
      type: String,
      default: input.radiusType
    },
    placeholder: {
      type: String
    },
    type: {
      type: String
    },
    value: String,
    readonly: {
      type: Boolean,
      default: input.readonly
    },
    align: {
      type: String,
      default: input.align
    }
  },
  data() {
    return {
      isActive: false,
      currentValue: ""
    };
  },
  methods: {
    inputBlur(e) {
      this.isActive = false;
      this.$emit("blur", e);
    },
    inputFocus(e) {
      this.isActive = true;
      this.$emit("focus", e);
    },
    inputChange(e) {
      this.$emit("change", e);
    },
    inputEnter(e) {
      this.$emit("enter", e);
    },
    inputClick(e) {
      this.currentValue = "";
      this.$emit("click", e);
    }
  },
  watch: {
    value: {
      handler(val, olval) {
        this.currentValue = val;
      },
      deep: true,
      immediate: true
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    inputClassName() {
      let className = [];
      if (this.border) {
        className.push("vui-input__border");
        if (this.align) {
          className.push("vui-input--" + this.align);
        }
        if (this.borderType) {
          className.push("vui-input__border--" + this.borderType);
        }
        if (this.borderStyleType) {
          className.push("vui-input__border--" + this.borderStyleType);
        }
        if (this.borderWeightType) {
          className.push("vui-input__border--" + this.borderWeightType);
        }
      }
      if (this.radius && this.borderType === "round") {
        if (this.radiusType) {
          className.push("vui-input__radius--" + this.radiusType);
        }
      }
      if (this.isActive && !this.readonly) {
        className.push("vui-input__border--active");
      }

      return className;
    },
    inputStyle() {
      let style = {};

      return style;
    }
  }
};
</script>

<template>
  <div class="vui-input" :class="inputClassName">
    <div class="vui-input__append">
      <slot name="prepend"> </slot>
    </div>

    <input
      :type="type"
      @blur="inputBlur"
      @focus="inputFocus"
      :placeholder="placeholder"
      v-model="currentValue"
      @change="inputChange"
      @keyup.enter="inputEnter"
      :readonly="readonly"
      class="vui-input__inner"
    />
    <div class="vui-input__append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>
