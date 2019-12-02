/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 11:43:02
 * @LastEditTime: 2019-08-24 09:14:58
 * @LastEditors: Please set LastEditors
 */
export default function power(a, v) {
  for (var n = 0; n < 10; n++) {
    var num = Math.pow(a, n);
    if (num == v) {
      return n;
    }
  }
  return -1;
}
power(2, 512);
