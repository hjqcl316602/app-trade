<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 09:53:43
 * @LastEditTime: 2019-09-04 11:08:12
 * @LastEditors: Please set LastEditors
 -->
<script>
const image = {
  src: "", // 图片地址
  lazy: false, //是否懒加载
  lazyThreshold: 40, // 懒加载阈值，即image的顶部距离窗口的底部的差值
  lazyDuration: 1000, // 懒加载图片定时器的时差
  showDelay: 50, // 显示延迟，由于加载过快
  fillType: "width", //填充方式  width（宽度100%） height（高度100%） min（至少一边100%） max（至多一边100%） cover（两边100%）
  alignType: "center", // 对齐方式center top bottom left right top-left top-right bottom-left bottom-right
  width: "", // 图片宽
  height: "" // 图片高
};
export default {
  name: "vui-image",
  props: {
    src: String,
    lazy: {
      type: Boolean,
      default: image.lazy
    },
    lazyThreshold: {
      type: [Number, String],
      default: image.lazyThreshold
    },
    lazyDuration: {
      type: [Number, String],
      default: image.lazyDuration
    },
    showDelay: {
      type: [Number, String],
      default: image.showDelay
    },
    fillType: {
      type: String,
      default: image.fillType
    },
    alignType: {
      type: String,
      default: image.alignType
    },
    loadingSuccess: Function,
    loadingError: Function,
    width: String,
    height: String
  },
  data() {
    return {
      status: {
        load: "loading",
        result: "success"
      }
    };
  },
  mounted() {
    this.initialize();
  },
  updated() {},
  methods: {
    initialize() {
      this.$el.style["background-image"] = "none";
      this.$nextTick(() => {
        if (this.lazy) {
          this.setLazyInterval();
        } else {
          this.loadImage();
        }
      });
    },
    setLazyInterval() {
      this.clearLazyInterval();
      this.lazyImage();
      this._timer = setInterval(() => {
        if (this.status.load == "loaded") {
          this.clearLazyInterval();
        } else {
          this.lazyImage();
        }
      }, this.lazyDuration);
    },
    clearLazyInterval() {
      clearInterval(this._timer);
    },
    lazyImage() {
      let winHeight = window.innerHeight;
      let imageTop = this.$el && this.$el.getBoundingClientRect()["top"];
      if (winHeight - imageTop > this.lazyThreshold) {
        this.loadImage();
      }
    },
    /**
     * @description: 图片加载
     */
    loadImage() {
      //console.log("loadImage");
      //ie 火狐等大众浏览器均支持 Image对象的 onload事件。
      //ie8及以下、opera 不支持onerror事件
      this.status.load = "loading";
      this.status.result = "";
      let image = new Image();
      image.src = this.src;
      //console.log(image.complete);
      image.onload = () => {
        this.status.load = "loaded";

        setTimeout(() => {
          //console.log("lodad");
          this.status.result = "success";
          this.$el.style["background-image"] = `url(${this.src})`;
          this.loadingSuccess && this.loadingSuccess();
        }, this.showDelay);
      };
      image.onerror = () => {
        this.status.load = "loaded";
        setTimeout(() => {
          this.status.result = "error";
          this.loadingError && this.loadingError();
        }, this.showDelay);
      };
    }
  },
  computed: {
    styles() {
      let style = {};
      let className = [];
      className.push("vui-image--" + this.fillType);
      className.push("vui-image--" + this.alignType);
      style["width"] = this.width;
      style["height"] = this.height;
      return { style, className };
    }
  },
  beforeDestroy() {
    this.clearLazyInterval();
  },
  watch: {
    src(val) {
      //console.log(val);
      this.initialize();
    }
  }
};
</script>

<template>
  <div class="vui-image" :class="styles.className" :style="styles.style">
    <div class="vui-image--loading" v-if="!status.result">
      <slot name="loading"> </slot>
    </div>

    <div class="vui-image--error" v-if="status.result === 'error'">
      <slot name="error"> </slot>
    </div>
    <div class="vui-image--inner">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
