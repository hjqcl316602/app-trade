/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:37:26
 * @LastEditTime: 2019-08-09 23:19:44
 * @LastEditors: Please set LastEditors
 */
import Tag from './tag.vue';
Tag.install = function(Vue, options) {
  Vue.component(Tag.name, Tag);
};
export default Tag;
