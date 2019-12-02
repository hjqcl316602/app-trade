<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 17:45:47
 * @LastEditTime: 2019-09-09 15:00:16
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from "vue";
import Grail from "../grail";
Vue.use(Grail).use(Grail.Child);
const config = {
  value: false,
  title: "提示信息",
  padding: true
};
const instance = {};
instance.name = "vui-notice";
instance.props = {
  value: {
    type: Boolean,
    default: config.value
  },
  title: {
    type: String,
    default: config.title
  },
  padding: {
    type: Boolean,
    default: config.padding
  }
};
instance.data = function() {
  return {};
};
instance.computed = {
  currentValue: {
    get() {
      return this.value;
    },
    set() {
      this.$emit("input");
    }
  }
};
instance.methods = {
  initialize() {
    if (this.padding) {
      this.setBodyStyle(this.currentValue);
    }
  },
  setBodyStyle(value) {
    let paddingTop = 0;
    if (value) {
      this.setBodyClassName("add");
      setTimeout(() => {
        paddingTop = this.$el.offsetHeight + "px";
        document.body.style["padding-top"] = paddingTop;
      }, 50);
    } else {
      document.body.style["padding-top"] = paddingTop;
      setTimeout(() => {
        this.setBodyClassName("remove");
      }, 300);
    }
  },
  setBodyClassName(type) {
    document.body.classList[type]("vui-notice--body");
  },
  close() {
    this.currentValue = false;
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.$nextTick(() => {
    this.initialize();
  });
};
instance.updated = function() {
  console.log("update");
  // this.$nextTick(() => {
  //   this.initialize();
  // });
};
instance.watch = {
  currentValue(val) {
    this.$nextTick(() => {
      this.initialize();
    });
  }
};
instance.beforeDestroy = function() {
  this.setBodyStyle(false);
  this.setBodyClassName("remove");
};
export default instance;
</script>

<template>
  <transition name="slide-top" appear>
    <div class="vui-notice" v-if="currentValue">
      <vui-grail>
        <div class="vui-notice-body">
          <slot></slot>
        </div>
        <vui-grail-child type="top" padding-height>
          <slot name="header">
            <div class="vui-padding vui-text-align--center">
              <span class="vui-text--bold">{{ title }}</span>
            </div>
          </slot>
        </vui-grail-child>

        <vui-grail-child type="bottom" padding-height>
          <slot name="footer">
            <div class="vui-grid vui-justify-content--flex-end vui-padding">
              <vui-button color="primary" @click="close">关闭</vui-button>
            </div>
          </slot>
        </vui-grail-child>
      </vui-grail>
    </div>
  </transition>
</template>

<style   scoped>
</style>