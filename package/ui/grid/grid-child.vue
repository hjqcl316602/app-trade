<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 09:25:07
 * @LastEditTime: 2019-09-03 16:49:28
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  span: "", //占据的栅格数
  push: "", //栅格向右移动格数
  pull: "", //栅格向左移动格数
  flexGrow: "",
  flexShrink: "",
  alignSelf: "",
  width: "" // 宽度
};
const instance = {};
instance.name = "vui-grid-child";
instance.props = {
  span: {
    validator(value) {
      return !value || (!!value && !isNaN(Number(value)) && Number(value) > 0);
    }
  },
  push: {
    validator(value) {
      return !value || (!!value && !isNaN(Number(value)) && Number(value) > 0);
    }
  },
  pull: {
    validator(value) {
      return !value || (!!value && !isNaN(Number(value)) && Number(value) > 0);
    }
  },
  width: {
    type: String
  },
  flexGrow: {
    type: String
  },
  flexShrink: {
    type: String
  },

  alignSelf: {
    validator(value) {
      let types = [
        "auto",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "stretch"
      ];
      return types.includes(value);
    }
  }
};
instance.data = function() {
  return {};
};
instance.methods = {};

instance.mounted = function() {};
instance.computed = {
  styles() {
    let style = {};
    let className = ["vui-grid-child"];
    if (this.isExitParent) {
      let { row, gutter, gutterRow } = this.$parent;
      row = Number(row);
      if (this.width) {
        style["width"] = this.width;
      } else {
        style["width"] = (100 / row) * this.span + "%";
      }

      let growTypes = ["0", "1"];
      if (this.flexGrow) {
        if (growTypes.includes(this.flexGrow)) {
          className.push("vui-flex-grow--" + this.flexGrow);
        }
      }

      let shrinkTypes = ["0", "1"];
      if (this.flexShrink) {
        if (shrinkTypes.includes(this.flexShrink)) {
          className.push("vui-flex-shrink--" + this.flexShrink);
        }
      }

      if (this.alignSelf) {
        className.push("vui-align-self--" + this.alignSelf);
      }

      if (gutter) {
        style["padding-left"] = gutter / 2 + "px";
        style["padding-right"] = gutter / 2 + "px";
      }
      if (gutter) {
        style["padding-top"] = gutterRow / 2 + "px";
        style["padding-bottom"] = gutterRow / 2 + "px";
      }

      if (this.push) {
        style["margin-left"] = (100 / row) * this.push + "%";
      }
      if (this.pull) {
        style["margin-right"] = (100 / row) * this.pull + "%";
      }
    }
    return {
      style,
      className
    };
  },

  isExitParent() {
    return !!this.$parent && this.$parent.name === "vui-grid";
  }
};
export default instance;
</script>

<template>
  <div :class="styles.className" :style="styles.style">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>