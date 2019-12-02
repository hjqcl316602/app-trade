<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 09:25:00
 * @LastEditTime: 2019-09-03 16:19:33
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  row: "24", //   栅格数
  gutter: "", //  间距
  gutterRow: "", //  垂直方向上的间距
  justifyContent: "", // 项目在主轴上的对齐方式
  alignItems: "", //  项目在交叉轴上如何对齐
  flexWrap: "", // 换行
  flexDirection: "", // 主轴的方向
  alignContent: "" //定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
};
const instance = {};
instance.name = "vui-grid";
instance.props = {
  row: {
    validator(value) {
      return !!value && !isNaN(Number(value)) && Number(value) > 0;
    },
    default: config.row
  },
  gutter: {
    validator(value) {
      return !isNaN(Number(value)) && Number(value) > 0;
    }
  },
  gutterRow: {
    validator(value) {
      return !value || (!!value && !isNaN(Number(value)) && Number(value) > 0);
    }
  },
  justifyContent: {
    validator(value) {
      let types = [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around"
      ];
      return types.includes(value);
    }
  },
  alignItems: {
    validator(value) {
      let types = ["flex-start", "flex-end", "center", "baseline", "stretch"];
      return types.includes(value);
    }
  },
  flexWrap: {
    validator(value) {
      let types = ["nowrap", "wrap", "wrap-reverse"];
      return types.includes(value);
    }
  },
  flexDirection: {
    validator(value) {
      let types = ["row", "row-reverse", "column", "column-reverse"];
      return types.includes(value);
    }
  },
  alignContent: {
    validator(value) {
      let types = [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "stretch"
      ];
      return types.includes(value);
    }
  }
};
instance.data = function() {
  return {
    spans: [],
    name: "vui-grid"
  };
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.computed = {
  styles() {
    let className = ["vui-grid"];
    let style = {};
    if (this.justifyContent) {
      className.push("vui-justify-content--" + this.justifyContent);
    }
    if (this.alignItems) {
      className.push("vui-align-items--" + this.alignItems);
    }
    if (this.flexWrap) {
      className.push("vui-flex-wrap--" + this.flexWrap);
    }
    if (this.flexDirection) {
      className.push("vui-flex-direction--" + this.flexDirection);
    }
    if (this.alignContent) {
      className.push("vui-align-content--" + this.alignContent);
    }
    if (this.gutter) {
      style["margin-left"] = -Number(this.gutter) / 2 + "px";
      style["margin-right"] = -Number(this.gutter) / 2 + "px";
    }
    if (this.gutterRow) {
      style["margin-top"] = -Number(this.gutterRow) / 2 + "px";
      style["margin-bottom"] = -Number(this.gutterRow) / 2 + "px";
    }
    return { className, style };
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