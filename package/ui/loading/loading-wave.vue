<!--
 * @Description: 波浪型 - loading
 * @Author: your name
 * @Date: 2019-07-19 15:19:55
 * @LastEditTime: 2019-08-10 10:43:40
 * @LastEditors: Please set LastEditors
 -->
 <script>
const config = {
  color: "#fff", // [ string ] 每个方块的颜色
  size: 30, //  [ string,number ]每个方块的大小尺寸 - 宽
  spacing: 2, //  [ string ,number ]间距
  itemNumber: 5, //  [ number ]数量
  align: "start", // [ string ] 对齐方式 top center bottom
  direction: "hor", // [ string ] 排列方式  hor  ver
  duration: 1500 // [ string ,number] 动画周期
};
export default {
  name: "vui-loading-wave",
  props: {
    color: {
      type: String,
      default: config.color
    },
    size: {
      type: [Number],
      default: config.size
    },
    itemNumber: {
      type: Number,
      default: config.itemNumber
    },
    spacing: {
      type: [Number],
      default: config.spacing
    },
    align: {
      type: String,
      default: config.align
    },
    direction: {
      type: String,
      default: config.direction
    },
    duration: {
      type: [Number],
      default: config.duration
    }
  },
  data() {
    return {};
  },
  computed: {
    waveStyle() {
      let style = {};
      style["height"] = this.size + "px";
      style["width"] = this.size + "px";
      return style;
    },
    waveClassName() {
      let className = [];
      if (this.direction) {
        className.push("vui-loading-wave--" + this.direction);
      }
      if (this.align) {
        className.push("vui-loading-wave--" + this.align);
      }
      return className;
    }
  },
  methods: {
    itemStyle(n) {
      let style = {};
      style["background-color"] = this.color;
      if (this.direction === "ver") {
        style["height"] =
          (this.size - this.spacing * (this.itemNumber - 1)) / this.itemNumber +
          "px";
        style["width"] = this.size + "px";
      } else {
        style["width"] =
          (this.size - this.spacing * (this.itemNumber - 1)) / this.itemNumber +
          "px";
        style["height"] = this.size + "px";
      }
      style["animation-duration"] = this.duration + "ms";
      style["animation-delay"] =
        -(this.duration - (this.duration / 2 / this.itemNumber) * (n + 1)) +
        "ms";
      return style;
    }
  }
};
</script>
 
 <template>
  <div class="vui-loading-wave" :style="waveStyle" :class="waveClassName">
    <div class="vui-loading-wave__wrap">
      <div
        class="vui-loading-wave__item"
        v-for="(item, index) in itemNumber"
        :style="itemStyle(index)"
        :key="index"
      ></div>
    </div>
  </div>
</template>
 
 <style   scoped>
</style>
