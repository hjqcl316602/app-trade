/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:30:25
 * @LastEditTime: 2019-08-27 11:13:18
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Loading from "./loading.vue";
import LoadingCircle from "./loading-circle.vue";
import LoadingCross from "./loading-cross.vue";
import LoadingRect from "./loading-rect.vue";
import LoadingRing from "./loading-ring.vue";
import LoadingRound from "./loading-round.vue";
import LoadingTurn from "./loading-turn.vue";
import LoadingWave from "./loading-wave.vue";
LoadingCircle.install = function(Vue, options) {
  Vue.component(LoadingCircle.name, LoadingCircle);
};
LoadingCross.install = function(Vue, options) {
  Vue.component(LoadingCross.name, LoadingCross);
};
LoadingRound.install = function(Vue, options) {
  Vue.component(LoadingRound.name, LoadingRound);
};
LoadingRect.install = function(Vue, options) {
  Vue.component(LoadingRect.name, LoadingRect);
};
LoadingTurn.install = function(Vue, options) {
  Vue.component(LoadingTurn.name, LoadingTurn);
};
LoadingWave.install = function(Vue, options) {
  Vue.component(LoadingWave.name, LoadingWave);
};
LoadingRing.install = function(Vue, options) {
  Vue.component(LoadingRing.name, LoadingRing);
};

let Instance;

let LoadingInstance = function() {
  if (!Instance) {
    Instance = Vue.extend(Loading);
  }
  let component, elem;
  return {
    show(message) {
      if (component) return;
      component = new Instance({ propsData: { message } });
      elem = component.$mount().$el;
      document.body.appendChild(elem);
      setTimeout(() => {
        component.changeVisible((status = true));
      }, 20);
    },
    clear() {
      if (!component) return;
      component.changeVisible((status = false));
      elem.addEventListener("transitionend", function(e) {
        document.body.removeChild(elem);
        elem = null;
        component = null;
      });
    }
  };
};

let LoadingComponent = LoadingInstance();

LoadingComponent.Cross = LoadingCross;
LoadingComponent.Circle = LoadingCircle;
LoadingComponent.Round = LoadingRound;
LoadingComponent.Rect = LoadingRect;
LoadingComponent.Turn = LoadingTurn;
LoadingComponent.Wave = LoadingWave;
LoadingComponent.Ring = LoadingRing;

LoadingComponent.install = function(Vue) {
  Vue.prototype.$loading = LoadingComponent;
};

export default LoadingComponent;
