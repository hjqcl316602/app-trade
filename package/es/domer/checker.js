/**
 * @name 判断元素类型
 * @care
 * console.log(document.__proto__); // HTMLDocument
 * console.log(document.__proto__.__proto__); // Document
 * console.log(document.__proto__.__proto__.__proto__); // Node
 * console.log(document.__proto__.__proto__.__proto__.__proto__); // EventTarget
 *
 * console.log(window.__proto__); // Window
 * console.log(window.__proto__.__proto__); // WindowProperties
 * console.log(window.__proto__.__proto__.__proto__); // Node
 * console.log(window.__proto__.__proto__.__proto__.__proto__); // EventTarget
 *
 * console.log(document.body.__proto__); // HTMLBodyElement
 * console.log(document.body.__proto__.__proto__); // HTMLElement
 * console.log(document.body.__proto__.__proto__.__proto__); // Element
 * console.log(document.body.__proto__.__proto__.__proto__.__proto__); // Node
 * console.log(document.body.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
 *
 * console.log(document.documentElement.__proto__); // HTMLHtmlElement
 * console.log(document.documentElement.__proto__.__proto__); // HTMLElement
 * console.log(document.documentElement.__proto__.__proto__.__proto__); // Element
 * console.log(document.documentElement.__proto__.__proto__.__proto__.__proto__); // Node
 * console.log(document.documentElement.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
 * @param { elem } [ any<require> ]
 * @param { type = 'dom'} [ 'dom','document','window']
 * @return [ boolean ]
 */

let checker = function(elem, type = "dom") {
  if (elem == null) throw new Error("The argument must be require.");
  if (type === "dom") {
    return typeof elem === "object" && elem.nodeType === 1 && typeof elem.nodeName === "string";
  } else if (type === "document") {
    return typeof elem === "object" && elem.nodeType === 9 && elem.nodeName === "#document";
  } else if (type === "window") {
    return elem === elem.window;
  }
};
checker.dom = function(elem) {
  return checker(elem, "dom");
};
checker.document = function(elem) {
  return checker(elem, "document");
};
checker.window = function(elem) {
  return checker(elem, "window");
};
export default checker;

//console.log(checker.window(window));
