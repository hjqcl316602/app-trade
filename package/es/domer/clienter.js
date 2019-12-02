/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 11:18:05
 * @LastEditTime: 2019-08-23 11:20:48
 * @LastEditors: Please set LastEditors
 */

let client = {};

client.getX = function(event) {
  if (event.touches && event.touches[0]) {
    return event.touches[0].pageX || event.touches[0].clientX;
  } else {
    return event.pageX || event.clientX;
  }
};

client.getWidth = function(elem) {
  return elem.getBoundingClientRect().width;
};

export default client;
