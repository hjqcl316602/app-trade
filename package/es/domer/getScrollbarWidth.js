/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 10:01:31
 * @LastEditTime: 2019-08-14 10:02:22
 * @LastEditors: Please set LastEditors
 */
let getScrollbarWidth = (function() {
  let barWidth = 0;
  let outer = document.createElement('div');
  let inner = document.createElement('div');
  let outerStyle = outer.style;
  let innerStyle = inner.style;
  outerStyle.position = 'absolute';
  outerStyle.top = 0;
  outerStyle.left = 0;
  outerStyle.pointerEvents = 'none';
  outerStyle.visibility = 'hidden';
  outerStyle.width = '200px';
  outerStyle.height = '150px';
  innerStyle.width = '100%';
  innerStyle.height = '200px';
  outer.appendChild(inner);
  document.body.appendChild(outer);
  let prevInnerWidth = inner.offsetWidth;
  outerStyle.overflow = 'scroll';
  let nextOuterWidth = inner.offsetWidth;
  barWidth = prevInnerWidth - nextOuterWidth;
  document.body.removeChild(outer);
  return _ => barWidth;
})();

export default getScrollbarWidth;
