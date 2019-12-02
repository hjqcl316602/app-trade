/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:08:40
 * @LastEditTime: 2019-08-14 10:22:23
 * @LastEditors: Please set LastEditors
 */
import TabGroup from './tab-group.vue';
import Tab from './tab.vue';

TabGroup.install = function(Vue) {
  Vue.component(TabGroup.name, TabGroup);
};

Tab.install = function(Vue) {
  Vue.component(Tab.name, Tab);
};
Tab.Group = TabGroup;

export default Tab;
