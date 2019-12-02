/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 11:43:02
 * @LastEditTime: 2019-08-23 11:18:49
 * @LastEditors: Please set LastEditors
 */
/**
 * @name 驼峰字符串转链接字符串
 * @param  { string }  [ string ]
 * @return [ string ]
 * @example hump('name-name') => nameName
 */
export default function hump(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  let regex = new RegExp(/\-(\w)/g);
  return string.replace(regex, function(m, c) {
    return c ? c.toUpperCase() : '';
  });
}

/**
 * @name  驼峰字符串转链接字符串
 * @param  {string} [string]
 * @return  [string]
 * @example hump.spread("asashAHjjasHsa") => asash-a-hjjas-hsa
 */

hump.spread = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return string.replace(/([A-Z])/g, function(a, b, c) {
    return '-' + b.toLowerCase();
  });
};
//console.log(hump.spread("nameNameNameLeight"));
