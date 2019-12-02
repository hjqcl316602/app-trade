<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:08:35
 * @LastEditTime: 2019-08-11 15:30:12
 * @LastEditors: Please set LastEditors
 -->
 
<script>
import { getClient } from "../utils/dom";
const config = {
  value: "", //
  fix: true, // [ Boolean  ] 宽度是否固定 false 是指不用设置宽度，而是自动排列
  threshold: 4, // [ Number ] 最多可见数
  bar: false // 底部滑动条
};
const instance = {};
instance.name = "vui-tab-group";
instance.props = {
  value: { type: String, default: config.value },
  fix: { type: Boolean, default: config.fix },
  threshold: { type: Number, default: config.threshold },
  bar: { type: Boolean, default: config.bar }
};

instance.data = function() {
  return {
    items: [],
    translateX: 0,
    barTanslateX: 0,
    isTransition: false,
    isBarTransition: false,
    status: "end",
    startX: 0,
    endX: 0,
    moveX: 0
  };
};
instance.methods = {
  eventStart(e) {
    this.status = "start";
    this.startX = getClient(e).x;
    if (!this.isMove) return false;
    this._translateX = this.translateX;
  },
  eventMove(e) {
    if (this.status !== "start") return false;
    if (!this.isMove) return false;
    this.moveX = getClient(e).x - this.startX;
    let moveX = this._translateX + this.moveX;
    //console.log(moveX);
    this.updateTranslate(moveX, false);
  },
  eventEnd(e) {
    // 子元素的总宽度
    this.status = "end";
    this.endX = getClient(e).x;
  },
  /**
   * 选中更新
   */
  updateSelect(val) {
    let findIndex = this.items.findIndex(ele => {
      return ele.name === this.value;
    });
    if (findIndex === -1) return false;
    let currentItemWidth = 0;

    for (let n = 0; n < this.items.length; n++) {
      let temp = this.items[n];
      let tempWidth = temp.$el.getBoundingClientRect().width;
      if (!!val && temp.name === val) {
        currentItemWidth += tempWidth / 2;
        break;
      }
      currentItemWidth += tempWidth;
    }
    this.updateTranslate(this.wrapWidth / 2 - currentItemWidth, true);
  },
  /**
   * 更新tab组件的水平移动距离
   * isTransition : 是指是否需要动画
   */
  updateTranslate(moveX, isTransition) {
    let translateX = Math.max(
      this.wrapWidth - this.itemWidth,
      Math.min(0, moveX)
    );
    this.translateX = translateX;
    this.isTransition = isTransition;
    this.$refs["tabs"].style["transform"] = `translateX(${this.translateX}px)`;
    this.updateBarTRanslate(isTransition);
  },
  /**
   *bar的移动
   */
  updateBarTRanslate(isTransition) {
    let prevWidth = 0;
    this.$nextTick(() => {
      let bar = this.$refs["bar"];
      if (bar) {
        for (let n = 0; n < this.items.length; n++) {
          let temp = this.items[n];
          let tempWidth = temp.$el.getBoundingClientRect().width;
          if (temp.name === this.currentValue) {
            bar.style["width"] = tempWidth + "px";
            break;
          }
          prevWidth += tempWidth;
        }
        let barTanslateX = prevWidth + this.translateX;
        this.isBarTransition = isTransition;
        bar.style["transform"] = `translateX(${barTanslateX}px)`;
      }
    });
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.updateSelect(this.value);
};
instance.updated = function() {
  //this.setItemStyle();
};

instance.watch = {
  currentValue(val, oldval) {
    this.updateSelect(val);
    this.$emit("input", val);
    this.$emit("change", val);
  }
};
instance.computed = {
  currentValue() {
    return this.value;
  },
  wrapWidth() {
    return this.$el.getBoundingClientRect().width;
  },
  itemWidth() {
    let width = 0;
    this.items.forEach(element => {
      width += element.$el.getBoundingClientRect().width;
    });
    return width;
  },
  isMove() {
    return this.wrapWidth < this.itemWidth;
  }
};
export default instance;
</script>

<template>
  <div
    :class="['vui-tab-wrap']"
    @touchstart="eventStart"
    @touchmove="eventMove"
    @touchend="eventEnd"
    @mousedown="eventStart"
    @mousemove="eventMove"
    @mouseup="eventEnd"
  >
    <div
      class="vui-tab-group"
      ref="tabs"
      :class="{ 'vui-tab-group--transition': isTransition }"
    >
      <slot></slot>
    </div>
    <div
      class="vui-tab-bar"
      v-if="bar && value"
      ref="bar"
      :class="{ 'vui-tab-bar--transition': isBarTransition }"
    ></div>
  </div>
</template>

<style   scoped>
</style>