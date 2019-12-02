import UI from "./popup.vue";
UI.install = function(Vue, options) {
  Vue.component(UI.name, UI);
};
export default UI;
