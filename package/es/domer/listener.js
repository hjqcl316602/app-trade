/**
 * @name 添加事件
 * @param { elem } [ element ]
 * @param { type } [ string ]
 * @param { handler } [ function ]
 * @return void
 */
const listener = (function() {
  if (window.addEventListener) {
    // 标准浏览器
    return function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    // IE浏览器
    return function(elem, type, handler) {
      elem.attachEvent("on" + type, handler);
    };
  }
})();

/**
 * @name 取消事件
 * @param { elem } [ element ]
 * @param { type } [ string ]
 * @param { handler } [ function ]
 * @return void
 */

listener.closer = (function() {
  if (window.removeEventListener) {
    // 标准浏览器
    return function(elem, type, handler) {
      elem.removeEventListener(type, handler, false);
    };
  } else if (window.detachEvent) {
    // IE浏览器
    return function(elem, type, handler) {
      elem.detachEvent("on" + type, handler);
    };
  }
})();
/**
 * @name 事件类型
 */
listener.typer = ["click", "mouseover", "mouseout", "mousedown", "mouseup"];
export default listener;
