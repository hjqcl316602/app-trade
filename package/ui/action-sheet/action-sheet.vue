<script>
export default {
  name: "vui-action-sheet",
  data() {
    return {
      currentValue: false
    };
  },
  props: {
    options: Array,
    select: Function
  },
  computed: {},
  methods: {
    selectActionSheet(item) {
      this.hide();
      this.select(item);
    },
    show() {
      this.currentValue = true;
    },
    hide() {
      this.currentValue = false;
    },
    touchmove(event) {
      if (this.currentValue) {
        //event.preventDefault();
        event.stopPropagation();
      }
    },
    lockLayer() {
      if (this.currentValue) {
        document.body.classList["add"]("vi-locked");
      } else {
        document.body.classList["remove"]("vi-locked");
      }
    }
  },
  watch: {
    currentValue(val) {
      this.lockLayer();
    }
  },
  mounted() {}
};
</script>

<template>
  <transition name="fade" appear v-if="currentValue">
    <div
      class="vui-action-sheet-mask"
      @touchmove="touchmove"
      @click.self="hide"
    >
      <transition name="slide-bottom" appear v-if="currentValue">
        <div
          class="vui-action-sheet vi-background vi-border-radius is-border-radius--smaller "
        >
          <div class="  ">
            <div
              class="vi-text is-height--large is-align--center vi-border is-border--bottom is-border--thiner"
              v-for="(item, index) in options"
              :key="index"
              @click="selectActionSheet(item)"
            >
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
