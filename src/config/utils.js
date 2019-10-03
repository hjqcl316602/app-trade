/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-21 17:49:07
 * @LastEditTime: 2019-09-05 11:56:41
 * @LastEditors: Please set LastEditors
 */
var moment = require('moment');

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function dateFormat(date, format) {
  return moment(date).format(format);
}

function throttle(method, delay, duration) {
  console.log(method);
  var timer = null;
  var begin = new Date();
  return function() {
    var context = this,
      args = arguments;
    var current = new Date();
    clearTimeout(timer);
    if (current - begin >= duration) {
      method.apply(context, args);
      begin = current;
    } else {
      timer = setTimeout(function() {
        method.apply(context, args);
      }, delay);
    }
  };
}

//数字进行下舍入(舍去)
function toFloor(number, scale = 8) {
  if (new Number(number) == 0) {
    //如果是"0.0000000000000000"
    return 0;
  }
  let str = number + ''; //转字符串
  if (str.indexOf('e') > -1 || str.indexOf('E') > -1) {
    //科学计数法
    let num = new Number(number).toFixed(scale + 1),
      str = num + '';
    return str.substring(0, str.length - 1);
  } else if (str.indexOf('.') > -1) {
    //小数
    if (scale == 0) {
      return str.substring(0, str.indexOf('.'));
    }
    return str.substring(0, str.indexOf('.') + scale + 1); //截取指定位数
  } else {
    //整数
    return str;
  }
}

export default {
  guid,
  dateFormat,
  throttle,
  toFloor
};
