/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-21 17:49:08
 * @LastEditTime: 2019-09-05 11:57:02
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import { Base64 } from 'js-base64';
import utils from './utils';
import api from './api';
Object.defineProperties(Vue.prototype, {
  ['$utils']: { value: utils, writable: false, enumerable: false },
  ['$base64']: { value: Base64, writable: false, enumerable: false }
});

Object.defineProperties(window, {
  ['Utils']: { value: utils, writable: false, enumerable: false },
  ['Base64']: { value: Base64, writable: false, enumerable: false }
});

//判断当前环境 开发还是正式环境
const isLocal =
  ['localhost', '192.168', 'file://'].findIndex(ele => {
    return window.location.href.indexOf(ele) > -1;
  }) > -1;

// 基础路径

const isUseProd = false;
const host = isLocal ? (!isUseProd ? 'http://trade.bstchain.com' : 'http://103.91.217.22') : window.location.origin;

// 配置图片上传路径 可以将 trade localhost等作为测试

const isTest =
  ['localhost', 'trade'].findIndex(item => {
    return window.location.origin.indexOf(item) > -1;
  }) > -1;

const image = {
  compress: (isTest ? 'http://trade.bstchain.com' : window.location.origin) + '/res/upload/image/compress.do',
  qr: (isTest ? 'http://trade.bstchain.com' : window.location.origin) + '/res/upload/image/qr.do' //
};

// export { $base64, $utils, toFloor, api, isLocal, host, image };

Vue.prototype.toFloor = utils.toFloor; // 兼容之前的写法
Vue.prototype.isLocal = isLocal;
Vue.prototype.host = host;
Vue.prototype.image = image;
Vue.prototype.api = api;
