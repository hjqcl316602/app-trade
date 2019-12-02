import checker from "./checker";
/**
 * @name 获取元素的class属性
 * @param {  elem } [ dom ] dom元素
 * @return [ array ]
 */
const classer = function(elem) {
  if (!checker(elem)) throw new Error("The argument must be HTMLElement.");
  let attr = elem.getAttribute("class");
  return attr === null ? [] : attr.split(" ").filter(Boolean);
};

/**
 * @name 获取元素的中是否存在指定的class属性名
 * @param {  elem } [ dom ] dom元素
 * @param { className } [ string ] 指定的class名
 * @return [ boolean ]
 */
classer.haser = function(elem, className) {
  if (!checker(elem)) throw new Error("The first argument must be HTMLElement.");
  if (typeof className !== "string") throw new Error("The second argument must be string.");
  return classer(elem).findIndex(item => item === className) > -1;
};
/**
 * @name 添加指定的class属性名
 * @param {  elem } [ dom ] dom元素
 * @param { className } [ string ] 指定的class名
 * @return [ elem ]
 */
classer.adder = function(elem, className) {
  if (!checker(elem)) throw new Error("The first argument must be HTMLElement.");
  if (typeof className !== "string") throw new Error("The second argument must be string.");
  if ("classList" in elem) {
    elem.classList.add(className);
  } else {
    let prevClassName = classer(elem);
    let findIndex = prevClassName.findIndex(item => item === className);
    if (findIndex === -1) {
      prevClassName.push(className);
      elem.setAttribute("class", prevClassName.join(" "));
    }
  }

  return elem;
  //"classList" in elem elem.classList.add(className);
};
/**
 * @name 移除指定的class属性名
 * @param {  elem } [ dom ] dom元素
 * @param { className } [ string ] 指定的class名
 * @return [ elem ]
 */
classer.remover = function(elem, className) {
  if (!checker(elem)) throw new Error("The first argument must be HTMLElement.");
  if (typeof className !== "string") throw new Error("The second argument must be string.");
  if ("classList" in elem) {
    elem.classList.remove(className);
  } else {
    let prevClassName = classer(elem).filter(item => item !== className);
    elem.setAttribute("class", prevClassName.join(" "));
  }
  return elem;
};

export default classer;
