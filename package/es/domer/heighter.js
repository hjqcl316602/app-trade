import checker from "./checker";

/**
 * @name 获取指定元素的高度
 * @param { element } [ window , document , element ]
 * @return [ number ]
 */
let heighter = function(element) {
  if (checker.window(element)) {
    return element.innerHeight;
  } else if (checker.document(element)) {
    return document.documentElement.offsetHeight;
  } else if (checker(element)) {
    return element.offsetHeight;
  } else {
    return 0;
  }
};
/**
 * @name 获取窗口的高度
 * @return [ number ]
 */
heighter.window = function() {
  return window.innerHeight;
};
/**
 * @name 获取整个文档的高度
 * @return [ number ]
 */
heighter.document = function() {
  return document.documentElement.offsetHeight;
};

export default heighter;
