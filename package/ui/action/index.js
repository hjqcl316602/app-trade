/**
 * created by 41587 on 2019/9/21
 */
import UI from "./action.vue";
UI.install = function(Vue, options) {
  Vue.component(UI.name, UI);
};
export default UI;
