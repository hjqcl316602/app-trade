<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 20:36:55
 * @LastEditTime: 2019-09-03 18:30:16
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  type: "block",
  padding: "",
  margin: "",
  height: "",
  width: "",
  borderRadius: "",
  backgroundColor: "",
  boxShadow: "",
  overflow: ""
};
const instance = {};
instance.name = "vui-box";
instance.props = {
  type: {
    type: String,
    default: config.type
  },
  padding: {
    type: String,
    default: config.padding
  },
  paddingBottom: {
    type: String,
    default: config.padding
  },
  paddingTop: {
    type: String,
    default: config.padding
  },
  paddingLeft: {
    type: String,
    default: config.padding
  },
  paddingRight: {
    type: String,
    default: config.padding
  },
  margin: {
    type: String,
    default: config.margin
  },
  marginBottom: {
    type: String,
    default: config.margin
  },
  marginTop: {
    type: String,
    default: config.margin
  },
  marginLeft: {
    type: String,
    default: config.margin
  },
  marginRight: {
    type: String,
    default: config.margin
  },
  height: {
    type: String,
    default: config.height
  },
  minHeight: {
    type: String,
    default: config.height
  },
  maxHeight: {
    type: String,
    default: config.height
  },
  width: {
    type: String,
    default: config.width
  },
  minWidth: {
    type: String,
    default: config.width
  },
  maxWidth: {
    type: String,
    default: config.width
  },
  borderRadius: {
    type: String,
    default: config.borderRadius
  },
  borderTopLeftRadius: {
    type: String,
    default: config.borderRadius
  },
  borderTopRightRadius: {
    type: String,
    default: config.borderRadius
  },
  borderBottomLeftRadius: {
    type: String,
    default: config.borderRadius
  },
  borderBottomRightRadius: {
    type: String,
    default: config.borderRadius
  },
  backgroundColor: {
    type: String,
    default: config.backgroundColor
  },
  boxShadow: {
    type: String,
    default: config.boxShadow
  },
  overflow: {
    type: String,
    default: config.overflow
  },
  overflowY: {
    type: String,
    default: config.overflow
  },
  overflowX: {
    type: String,
    default: config.overflow
  }
};
instance.data = function() {
  return {};
};
instance.computed = {
  styles() {
    let className = [];
    let style = {};
    let displays = ["block", "inline-block", "inline", "none"];
    if (this.type) {
      if (displays.includes(this.type)) {
        className.push("vui--" + this.type);
      } else {
        style["display"] = this.type;
      }
    }

    let types = ["smaller", "small", "medium", "large", "larger"];

    if (this.padding) {
      if (types.includes(this.padding)) {
        className.push("vui-padding--" + this.padding);
      } else {
        style["padding"] = this.padding;
      }
    }
    if (this.paddingTop) {
      if (types.includes(this.paddingTop)) {
        className.push("vui-padding-top--" + this.paddingTop);
      } else {
        style["padding-top"] = this.paddingTop;
      }
    }
    if (this.paddingBottom) {
      if (types.includes(this.paddingBottom)) {
        className.push("vui-padding-bottom--" + this.paddingBottom);
      } else {
        style["padding-bottom"] = this.paddingBottom;
      }
    }
    if (this.paddingLeft) {
      if (types.includes(this.paddingLeft)) {
        className.push("vui-padding-left--" + this.paddingLeft);
      } else {
        style["padding-left"] = this.paddingLeft;
      }
    }
    if (this.paddingRight) {
      if (types.includes(this.paddingRight)) {
        className.push("vui-padding-right--" + this.paddingRight);
      } else {
        style["padding-right"] = this.paddingRight;
      }
    }
    if (this.margin) {
      if (types.includes(this.margin)) {
        className.push("vui-margin--" + this.margin);
      } else {
        style["margin"] = this.margin;
      }
    }
    if (this.marginTop) {
      if (types.includes(this.marginTop)) {
        className.push("vui-margin-top--" + this.marginTop);
      } else {
        style["margin-top"] = this.marginTop;
      }
    }
    if (this.marginBottom) {
      if (types.includes(this.marginBottom)) {
        className.push("vui-margin-bottom--" + this.marginBottom);
      } else {
        style["margin-bottom"] = this.marginBottom;
      }
    }
    if (this.marginLeft) {
      if (types.includes(this.marginLeft)) {
        className.push("vui-margin-left--" + this.marginLeft);
      } else {
        style["margin-left"] = this.marginLeft;
      }
    }
    if (this.marginRight) {
      if (types.includes(this.marginRight)) {
        className.push("vui-margin-right--" + this.marginRight);
      } else {
        style["margin-right"] = this.marginRight;
      }
    }

    if (this.width) {
      if (types.includes(this.width)) {
        className.push("vui-width--" + this.width);
      } else {
        style["width"] = this.width;
      }
    }
    if (this.minWidth) {
      if (types.includes(this.minWidth)) {
        className.push("vui-min-width--" + this.minWidth);
      } else {
        style["min-width"] = this.minWidth;
      }
    }
    if (this.maxWidth) {
      if (types.includes(this.maxWidth)) {
        className.push("vui-max-width--" + this.maxWidth);
      } else {
        style["max-width"] = this.maxWidth;
      }
    }

    if (this.height) {
      if (types.includes(this.height)) {
        className.push("vui-height--" + this.height);
      } else {
        style["height"] = this.height;
      }
    }
    if (this.minHeight) {
      if (types.includes(this.minHeight)) {
        className.push("vui-min-height--" + this.minHeight);
      } else {
        style["min-height"] = this.minHeight;
      }
    }
    if (this.maxHeight) {
      if (types.includes(this.maxHeight)) {
        className.push("vui-max-height--" + this.maxHeight);
      } else {
        style["max-height"] = this.maxHeight;
      }
    }
    let borderRadiusTypes = [
      "smaller",
      "small",
      "medium",
      "large",
      "larger",
      "round"
    ];
    if (this.borderRadius) {
      if (borderRadiusTypes.includes(this.borderRadius)) {
        className.push("vui-border-radius--" + this.borderRadius);
      } else {
        style["border-radius"] = this.borderRadius;
      }
    }
    if (this.borderTopLeftRadius) {
      if (borderRadiusTypes.includes(this.borderTopLeftRadius)) {
        className.push(
          "vui-border-top-left-radius--" + this.borderTopLeftRadius
        );
      } else {
        style["border-top-left-radius"] = this.borderTopLeftRadius;
      }
    }
    if (this.borderTopRightRadius) {
      if (borderRadiusTypes.includes(this.borderTopRightRadius)) {
        className.push(
          "vui-border-top-right-radius--" + this.borderTopRightRadius
        );
      } else {
        style["border-top-right-radius"] = this.borderTopRightRadius;
      }
    }
    if (this.borderBottomLeftRadius) {
      if (borderRadiusTypes.includes(this.borderBottomLeftRadius)) {
        className.push(
          "vui-border-bottom-left-radius--" + this.borderBottomLeftRadius
        );
      } else {
        style["border-bottom-left-radius"] = this.borderBottomLeftRadius;
      }
    }
    if (this.borderBottomRightRadius) {
      if (borderRadiusTypes.includes(this.borderBottomRightRadius)) {
        className.push(
          "vui-border-bottom-right-radius--" + this.borderBottomRightRadius
        );
      } else {
        style["border-bottom-right-radius"] = this.borderBottomRightRadius;
      }
    }

    let backgroundColorTypes = [
      "default",
      "primary",
      "success",
      "warning",
      "danger",
      "white",
      "black"
    ];

    if (this.backgroundColor) {
      if (backgroundColorTypes.includes(this.backgroundColor)) {
        className.push("vui-background-color--" + this.backgroundColor);
      } else {
        style["background-color"] = this.backgroundColor;
      }
    }

    let boxShadowTypes = ["around", "top", "bottom", "left", "right"];
    if (this.boxShadow) {
      if (boxShadowTypes.includes(this.boxShadow)) {
        className.push("vui-shadow--" + this.boxShadow);
      } else {
        style["box-shadow"] = this.boxShadow;
      }
    }

    let overflowTypes = ["hidden", "scroll", "auto"];
    if (this.overflow) {
      if (overflowTypes.includes(this.overflow)) {
        className.push("vui-overflow--" + this.overflow);
      } else {
        style["overflow"] = this.overflow;
      }
    }
    if (this.overflowY) {
      if (overflowTypes.includes(this.overflowY)) {
        className.push("vui-overflow-y--" + this.overflowY);
      } else {
        style["overflow-y"] = this.overflowY;
      }
    }
    if (this.overflowX) {
      if (overflowTypes.includes(this.overflowX)) {
        className.push("vui-overflow-x--" + this.overflowX);
      } else {
        style["overflow-x"] = this.overflowX;
      }
    }
    return {
      className,
      style
    };
  }
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.watch = {};
export default instance;
</script>

<template>
  <div
    :class="styles.className"
    :style="styles.style"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>