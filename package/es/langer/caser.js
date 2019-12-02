/**
 * @description 实例化
 * @param { p } [ function ] 构造方法
 * @return [ object ]
 */

let caser = function(p) {
  if (typeof p !== 'function') throw new Error('The first argument must be function.');
  let o = {};
  let arg = Array.prototype.slice.call(arguments, 1);
  o.__proto__ = p.prototype;
  p.prototype.constructor = p;
  p.apply(o, arg);
  return o;
};

export default caser;

// let Person = function(name) {
//   this.name = name;
// };
// Person.prototype.getName = function() {
//   return this.name;
// };

// let person = caser('', 'huang');
// console.log(person);
