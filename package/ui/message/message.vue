<script>
import { message } from "../config";

const instance = {};

instance.name = "vui-message";

instance.data = function() {
  return {
    visible: false
  };
};

/**
 * 计算属性集合
 */
instance.computed = {};

instance.computed.messageStyle = function() {
  return {
    zIndex: this.zIndex
  };
};
instance.computed.messageClassName = function() {
  let className = [];
  className.push("vui-message");
  className.push("vui-message--" + this.type);
  this.visible && className.push("vui-message--active");
  return className;
};
/**
 * 方法集合
 */
instance.methods = {};
instance.methods.changeVisible = function(status) {
  this.visible = status;
  if (this.lock) {
    let action = this.visible ? "add" : "remove";
    document.body.classList[action]("vui-message--locked");
  }
};
/**
 * 参数
 */
instance.props = {
  message: {
    type: String,
    default: message.message
  },
  zIndex: {
    type: Number,
    default: message.zIndex
  },
  lock: {
    type: Boolean,
    default: message.lock
  },
  type: {
    validator(value) {
      return ["warning", "danger", "success", "primary", "default"].includes(
        value
      );
    },
    default: message.type
  }
};
export default instance;
</script>

<template>
  <div class="vui-message" :class="messageClassName" :style="messageStyle">
    <span>{{ message }}</span>
  </div>
</template>

<style   scoped>
</style>