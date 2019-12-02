import checker from "./checker";
/**
 * @name 获取最近的祖先元素是滚动元素的
 * @param { element } [ element ]
 * @param { rootParent = window } [ element ]
 * @return [ number ]
 */
let scroller = function(element, rootParent = window) {
  if (!checker(element))
    throw new Error("The first argument must be HTMLElement.");
  let node = element;
  while (
    node &&
    node.tagName !== "HTML" &&
    node.tagName !== "BODY" &&
    node.nodeType === 1 &&
    node !== rootParent
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === "scroll" || overflowY === "auto") {
      return node;
    }
    node = node.parentNode;
  }
  return rootParent;
};

/**
 * @name 获取指定元素的滚动距离
 * @msg 当元素是window时，window并没有scrollTop属性值，pageYOffset代表该值
 * 当客户端为手机端时，得到的是 document.body值，而document.documentElement值为0 ，为电脑时，反之
 * @param { element } [ element ]
 * @param { top }  [ number ]
 * @return
 * 当 top = null时，则是获取值，否则是设置值
 */
scroller.scrollTop = function(element, top) {
  if (top == null) {
    let scrollTop = 0;
    if (checker.window(element)) {
      scrollTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
    } else {
      scrollTop = element.scrollTop;
    }
    return scrollTop;
  } else {
    if (checker.window(element)) {
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    } else {
      element.scrollTop = top;
    }
  }
};
/**
 * @name 获取指定元素的滚动内容高度
 * @param { element } [ element ]
 */
scroller.scrollHeight = function(element) {
  if (checker.dom(element)) {
    return element.scrollHeight;
  }
  return document.documentElement.scrollHeight || document.body.scrollHeight;
};

export default scroller;

//document.body.scrollTop - 手机端支持 ， 否则为0
//document.documentElement.scrollTop - 电脑端支持 ，否则为0

// let scrollHeight = this.$refs["outer"].scrollHeight;
// domer.scroller.top(this.$refs["outer"], scrollHeight);
