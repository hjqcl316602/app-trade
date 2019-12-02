<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 17:50:08
 * @LastEditTime: 2019-09-03 18:02:50
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  long: false,
  bold: false, // 加粗
  italic: false, // 倾斜
  wordWrap: false, //允许长单词换行到下一行
  ellipsis: false,
  clamp: false,
  color: "",
  size: "",
  letterSpacing: "",
  lineHeight: "",
  decoration: "",
  align: "",
  textIndent: "",
  wordSpacing: "",
  wordBreak: "",
  colors: [
    "primary",
    "danger",
    "warning",
    "success",
    "black",
    "dark",
    "light",
    "gray",
    "white"
  ],
  sizes: ["smaller", "small", "medium", "large", "larger"],
  letterSpacings: ["smaller", "small", "medium", "large", "larger"],
  lineHeights: ["smaller", "small", "medium", "large", "larger"],
  textIndents: ["smaller", "small", "medium", "large", "larger"],
  wordSpacings: ["smaller", "small", "medium", "large", "larger"],
  textDecorations: ["none", "underline", "overline", "line-through", "blink"],
  textAligns: ["left", "right", "center"],
  wordBreaks: ["break-all", "break-word"]
};
const instance = {};
instance.name = "vui-text";
instance.props = {
  long: { type: Boolean, default: config.long },
  bold: { type: Boolean, default: config.bold },
  italic: { type: Boolean, default: config.italic },
  ellipsis: { type: Boolean, default: config.ellipsis },
  wordWrap: { type: Boolean, default: config.wordWrap },
  clamp: { type: Boolean, default: config.clamp },
  size: { type: String, default: config.size },
  color: { type: String, default: config.color },
  letterSpacing: { type: String, default: config.letterSpacing },
  wordSpacing: { type: String, default: config.wordSpacing },
  lineHeight: { type: String, default: config.lineHeight },
  textIndent: { type: String, default: config.textIndent },
  textDecoration: {
    validator(value) {
      return !value || (!!value && config.textDecorations.includes(value));
    },
    default: config.decoration
  },
  textAlign: {
    validator(value) {
      return !value || (!!value && config.textAligns.includes(value));
    },
    default: config.align
  },
  wordBreak: {
    validator(value) {
      return !value || (!!value && config.wordBreaks.includes(value));
    },
    default: config.wordBreak
  }
};
instance.data = function() {
  return {};
};
instance.methods = {};
instance.created = function() {};
instance.mounted = function() {};
instance.computed = {
  styles() {
    let className = ["vui-text"];
    let style = {};
    if (this.long) {
      className.push("vui-text-long");
    }
    if (this.bold) {
      className.push("vui-text-bold");
    }
    if (this.italic) {
      className.push("vui-text-italic");
    }
    if (this.wordWrap) {
      className.push("vui-text-word-wrap");
    }
    if (this.clamp) {
      className.push("vui-text-clamp");
    }
    if (this.size) {
      if (config.sizes.includes(this.size)) {
        className.push("vui-text--" + this.size);
      } else {
        style["font-size"] = this.size;
      }
    }
    if (this.color) {
      if (config.colors.includes(this.color)) {
        className.push("vui-text--" + this.color);
      } else {
        style["color"] = this.color;
      }
    } else {
      style["color"] = "inherit";
    }
    if (this.letterSpacing) {
      if (config.letterSpacings.includes(this.letterSpacing)) {
        className.push("vui-text-letter-spacing--" + this.letterSpacing);
      } else {
        style["letter-spacing"] = this.letterSpacing;
      }
    }
    if (this.wordSpacing) {
      if (config.wordSpacings.includes(this.wordSpacing)) {
        className.push("vui-text-word-spacing--" + this.wordSpacing);
      } else {
        style["word-spacing"] = this.wordSpacing;
      }
    }
    if (this.lineHeight) {
      if (config.lineHeights.includes(this.lineHeight)) {
        className.push("vui-text-height--" + this.lineHeight);
      } else {
        style["line-height"] = this.lineHeight;
      }
    }
    if (this.textIndent) {
      if (config.textIndents.includes(this.textIndent)) {
        className.push("vui-text-indent--" + this.textIndent);
      } else {
        style["text-indent"] = this.textIndent;
      }
    }
    if (this.textDecoration) {
      className.push("vui-text-decoration--" + this.textDecoration);
    }
    if (this.textAlign) {
      className.push("vui-text-align--" + this.textAlign);
    }
    if (this.wordBreak) {
      className.push("vui-text-word-break--" + this.wordBreak);
    }

    return {
      className,
      style
    };
  }
};
export default instance;
</script>

<template>
  <div v-if="ellipsis" :class="{ 'vui-text-ellipsis': ellipsis }">
    <div :class="styles.className" :style="styles.style">
      <slot></slot>
    </div>
  </div>
  <div :class="styles.className" :style="styles.style" v-else>
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>