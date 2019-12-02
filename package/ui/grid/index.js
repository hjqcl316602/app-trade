/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:08:40
 * @LastEditTime: 2019-08-21 13:04:14
 * @LastEditors: Please set LastEditors
 */
import Grid from './grid.vue';
import GridChild from './grid-child.vue';

Grid.install = function(Vue) {
  Vue.component(Grid.name, Grid);
};

GridChild.install = function(Vue) {
  Vue.component(GridChild.name, GridChild);
};
Grid.Child = GridChild;

export default Grid;
