import Vue from "vue";
import ActionSheet from "./action-sheet.vue";
let Instance;
let ActionSheetInstance = function(message) {
  if (!Instance) {
    Instance = Vue.extend(ActionSheet);
  }
  let component = new Instance({ propsData: message });
  let elem = component.$mount().$el;
  component.show();
  document.body.appendChild(elem);
};
ActionSheetInstance.install = function(Vue) {
  Vue.prototype.$showActionSheet = ActionSheetInstance;
};

export default ActionSheetInstance;
