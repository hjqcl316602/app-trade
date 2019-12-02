/**
 * @name 获取页面元素
 * @param { selector }  [ string  ]
 * @param { type ='class'} [ 'class','id','tag']
 * @return [ element ]
 */
let queryer = function(selector, type = "class") {
  if (typeof selector !== "string") throw new Error("The first argument must be string.");
  if (["class", "id", "tag"].findIndex(item => item === type) === -1) throw new Error("The second argument must be in ['class', 'id', 'tag'].");
  if (type === "class") {
    if (document.querySelecotorAll) return document.querySelectorAll("." + selector);
    return document.getElementsByClassName(selector);
  }
  if (type === "id") {
    if (document.querySelecotor) return document.querySelector("#" + selector);
    return document.getElementById(selector);
  }
  if (type === "tag") {
    return document.querySelectorAll ? document.querySelectorAll(selector) : document.getElementsByTagName(selector);
  }
};
queryer.class = function(selector) {
  return queryer(selector, "class");
};
queryer.id = function(selector) {
  return queryer(selector, "id");
};
queryer.tag = function(selector) {
  return queryer(selector, "tag");
};
export default queryer;
