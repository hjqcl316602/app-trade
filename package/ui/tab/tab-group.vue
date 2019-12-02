<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 13:58:20
 * @LastEditTime: 2019-08-23 11:22:28
 * @LastEditors: Please set LastEditors
 -->
<script>
import clienter from "../../es/domer/clienter";
const config = {
  value: "", //
  fix: true, // [ Boolean  ] 宽度是否固定 false 是指不用设置宽度，而是自动排列
  threshold: 4, // [ Number ] 最多可见数
  showBar: false // 底部滑动条
};

const instance = {};
instance.name = "vui-tab-group";
instance.props = {
  value: { type: String, default: config.value },
  fix: { type: Boolean, default: config.fix },
  threshold: { type: Number, default: config.threshold },
  showBar: { type: Boolean, default: config.showBar }
};
instance.data = function() {
  return {
    items: [],
    moveStatus: "end",
    moveStartX: 0,
    moveEndX: 0,
    moveX: 0,
    isTabTransition: false,
    isBarTransition: false,
    translateX: 0
  };
};
instance.methods = {
  eventStart(e) {
    this.moveStatus = "start";
    this.moveStartX = clienter.getX(e);
    this._translateX = this.translateX;
  },
  eventMove(e) {
    this.moveEndX = clienter.getX(e);
    let differ = this.getTabsWidth() - this.getTabWidth();
    if (this.moveStatus !== "start") return false;
    if (differ <= 0) return false;
    this.translateX = this.moveEndX - this.moveStartX + this._translateX;
    this.moveTab(false);
    this.moveBar(false);
  },
  eventEnd(e) {
    this.moveStatus = "end";
    let differ = this.getTabsWidth() - this.getTabWidth();
    if (differ < 0) return false;
    if (this.translateX > 0) {
      this.translateX = 0;
    } else if (this.translateX < -differ) {
      this.translateX = -differ;
    }
    this.moveTab(true);
    this.moveBar(true);
  },
  /**
   * 移动tab
   */
  moveTab(transtion) {
    this.isTabTransition = transtion;
    setTimeout(() => {
      this.$refs["tab"].style["transform"] = `translateX(${this.translateX}px)`;
    }, 0);
  },
  /**
   * 移动bar
   */
  moveBar(transtion) {
    if (!this.showBar) return;
    let findIndex = this.items.findIndex(ele => {
      return ele.name === this.value;
    });
    if (findIndex === -1) return false;
    let width = 0;
    for (let n = 0; n < this.items.length; n++) {
      if (n === findIndex) {
        this.$refs["bar"].style["width"] =
          clienter.getWidth(this.items[n].$el) + "px";
        break;
      }
      width += clienter.getWidth(this.items[n].$el);
    }
    this.isBarTransition = transtion;
    let move = width + this.translateX;
    this.$refs["bar"].style["transform"] = `translateX(${move}px)`;
  },
  /**
   * 切换tab
   */
  updateTab(name) {
    let findIndex = this.items.findIndex(ele => {
      return ele.name === name;
    });
    if (findIndex === -1) return false;

    let width = 0;
    for (let n = 0; n < this.items.length; n++) {
      if (n === findIndex) break;
      width += clienter.getWidth(this.items[n].$el);
    }
    let differ = this.getTabsWidth() - this.getTabWidth();
    width = differ < 0 ? 0 : width > differ ? differ : width;
    this.translateX = -width;
    this.moveTab(true);
    this.moveBar(true);
  },
  /**
   * 获取tab内层的宽度
   */
  getTabsWidth() {
    let width = 0;
    this.items.forEach(ele => {
      width += clienter.getWidth(ele.$el);
    });
    return width;
  },
  /**
   * 获取tab外层的宽度
   */
  getTabWidth() {
    return clienter.getWidth(this.$el);
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.$nextTick(() => {
    this.updateTab(this.value);
  });
};
instance.watch = {
  currentValue(val, oldval) {
    this.updateTab(val);
    this.$emit("input", val);
    this.$emit("change", val);
  }
};
instance.computed = {
  currentValue() {
    return this.value;
  }
};

export default instance;
</script>

<template>
  <div
    class="vui-tab-wrap"
    @touchstart="eventStart"
    @touchmove="eventMove"
    @touchend="eventEnd"
    @mousedown="eventStart"
    @mousemove="eventMove"
    @mouseup="eventEnd"
  >
    <div
      class="vui-tab-group"
      ref="tab"
      :class="{ 'vui-tab-group--transition': isTabTransition }"
    >
      <slot></slot>
    </div>
    <div
      class="vui-tab-bar"
      v-if="showBar"
      ref="bar"
      :class="{ 'vui-tab-bar--transition': isBarTransition }"
    ></div>
  </div>
</template>

<style   scoped>
</style>