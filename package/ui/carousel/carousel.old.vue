<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 13:44:00
 * @LastEditTime: 2019-08-23 11:27:53
 * @LastEditors: Please set LastEditors
 -->
<script>
const config = {
  duration: 3000,
  threshold: 100 // 移动多少距离才更换
};
const instance = {};
instance.name = "vui-carousel";
instance.props = {
  duration: {
    type: Number,
    default: config.duration
  },
  threshold: {
    type: Number,
    default: config.threshold
  },
  value: {
    type: Number
  }
};
instance.data = function() {
  return {
    items: [],
    translateX: 0,
    currentValue: 0,
    transition: false,
    status: ""
  };
};
instance.methods = {
  init() {
    this.setInterval();
  },

  getWidth() {
    return this.$el.getBoundingClientRect().width;
  },
  setInterval() {
    this.clearInterval();
    this._interval = setInterval(() => {
      if (this.currentValue === this.items.length - 1) {
        this.currentValue = 0;
      } else {
        this.currentValue++;
      }
      this.updateIndex();
    }, this.duration);
  },
  /**
   * @name: 清除定时器
   */
  clearInterval() {
    clearInterval(this._interval);
    this._interval = null;
  },
  eventStart(e) {
    this.clearInterval();
    this.status = "start";
    this._startX = this.getPageX(e);
    console.log(this._startX);
  },
  eventMove(e) {
    if (this.status !== "start") return;
    let moveX = this.getPageX(e) - this._startX;
    this._moveX = this.ease(moveX);
    //console.log(this._moveX);
    this.translateX = this._moveX - this.currentValue * this.getWidth();
  },
  eventEnd(e) {
    this.status = "end";
    if (this._moveX > this.threshold) {
      this.currentValue = Math.max(0, --this.currentValue);
    } else if (this._moveX < -this.threshold) {
      this.currentValue = Math.min(this.items.length - 1, ++this.currentValue);
    }
    if (Math.abs(this._moveX) > 0) {
      this._moveX = 0;
      this.updateIndex();
    }
    this.setInterval();
  },
  getPageX(e) {
    if (e.touches && e.touches[0]) {
      return e.touches[0].pageX || e.touches[0].clientX;
    } else {
      return e.pageX || e.clientX;
    }
  },
  /**
   * @name: 缓动函数，
   * @msg:  需要计算抛物线函数 和 一次函数的重合点，增加动画的舒适性
   * @return: [number]
   */
  ease(value) {
    return value / 2;
  },
  updateIndex() {
    this.$nextTick(() => {
      this.clearInterval();
      let width = this.getWidth();
      this.transition = true;
      this.translateX = -this.currentValue * width;
      this.$el.addEventListener("transitionend", e => {
        this.transition = false;
        this.setInterval();
        this.$emit("change", this.currentValue);
      });
    });
  }
};
instance.created = function() {};
instance.mounted = function() {
  this.currentValue = this.value;
  this.$nextTick(() => {
    this.init();
  });
};
instance.computed = {
  className() {
    let className = [];
    if (this.transition) {
      className.push("vui-carousel--transtion");
    }
    return className;
  },
  wrapStyle() {
    let style = {
      transform: `translateX(${this.translateX}px)`
    };
    return style;
  }
};

instance.watch = {
  value(val) {
    this.currentValue = val;
  },
  currentValue(val, oldval) {
    this.updateIndex();
    this.$emit("input", val);
  }
};
export default instance;
</script>

<template>
  <div
    class="vui-carousel"
    :class="className"
    @touchstart="eventStart"
    @touchmove="eventMove"
    @touchend="eventEnd"
    @mousedown="eventStart"
    @mousemove="eventMove"
    @mouseup="eventEnd"
  >
    <div class="vui-carousel__wrap" ref="wrap" :style="wrapStyle">
      <slot></slot>
    </div>
    <div class="vui-carousel__bar">
      <slot name="bar"></slot>
    </div>
  </div>
</template>

<style scoped></style>
