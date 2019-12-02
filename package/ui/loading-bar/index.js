/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 09:40:18
 * @LastEditTime: 2019-09-03 18:34:53
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import loadingBar from "./loading-bar.vue";
let Instance;

let LoadingInstance = function() {
  if (!Instance) {
    Instance = Vue.extend(loadingBar);
  }
  let component, elem;
  return {
    start(width) {
      if (component) return;
      component = new Instance();
      //console.log(component);
      elem = component.$mount().$el;
      document.body.appendChild(elem);
      setTimeout(() => {
        component.setWidth(width);
      }, 0);
    },
    update(width) {
      setTimeout(() => {
        component.setWidth(width);
      }, 0);
    },
    finish() {
      // console.log(component);
      setTimeout(() => {
        component && component.setWidth(100);
        setTimeout(() => {
          //console.log(elem);
          //console.log(document.body);
          if (elem != null) document.body.removeChild(elem);
          elem = null;
          component = null;
        }, 300);
      }, 20);
    }
  };
};
let loadingBarComponent = LoadingInstance();
loadingBarComponent.install = function(Vue, options) {
  Vue.prototype.$LoadingBar = LoadingInstance();
};
export default loadingBarComponent;
