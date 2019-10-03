/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-09-05 11:58:54
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import utils from './utils';
var moment = require('moment');

const timeFormat = function(tick) {
  return moment(tick).format('HH:mm:ss');
};

const dateFormat = function(tick) {
  return moment(tick).format('YYYY-MM-DD HH:mm:ss');
};

const toFixed = function(number, scale) {
  return new Number(number).toFixed(scale);
};

const toPercent = function(point) {
  var str = Number(point * 100).toFixed(1);
  str += '%';
  return str;
};

const toPayType = function(type){
  return ['银联','微信','支付宝','云闪付','聚合支付'][type - 1 ]
}

Vue.filter('timeFormat', timeFormat);
Vue.filter('dateFormat', dateFormat);
Vue.filter('toFixed', toFixed);
Vue.filter('toPercent', toPercent);
Vue.filter('toFloor', utils.toFloor);
Vue.filter('toPayType', toPayType);
