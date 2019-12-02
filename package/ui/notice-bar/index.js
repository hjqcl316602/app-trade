/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 17:45:41
 * @LastEditTime: 2019-09-09 14:43:05
 * @LastEditors: Please set LastEditors
 */
import UI from './notice-bar.vue';
UI.install = function(Vue, options) {
  Vue.component(UI.name, UI);
};
export default UI;
