function type(value) {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
}
// 验证一个数据是否是纯对象或没有原型的对象，即常用的业务对象
function freer(object) {
  //当object是undefined，null 会报错： Cannot convert undefined or null to object
  if (object == null) return false;
  return Object.getPrototypeOf(object) === null || Object.getPrototypeOf(Object.getPrototypeOf(object)) === null;
}
// 检查是否在指定的类型当中
function checker(type) {
  return ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object'].includes(type);
}

/**
 * @name 判断两个数据的属性值是否相等
 * @msg
 * 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
 * @param { prev } [ number,string,boolean,null,undefined,array,object ]
 * @param { next } [ number,string,boolean,null,undefined,array,object ]
 * @return: [ boolean ]
 * @example
 * equal(NaN, NaN) => true
 * equaler([NaN, { name: true }], [NaN, { name: true }]) => true
 */

export default function equaler(prev, next) {
  let prevType = type(prev);
  let nextType = type(next);
  if (!checker(prevType)) throw new Error('The first argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (!checker(nextType)) throw new Error('The second argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (prevType === 'object' && !freer(prev)) throw new Error('While the first argument type is object,it must be created of {} or new Object() or Object.create(null).');
  if (nextType === 'object' && !freer(next)) throw new Error('While the second argument type is object,it must be created of {} or new Object() or Object.create(null).');

  if (prevType !== nextType) return false;
  if (prevType === 'string' || prevType === 'boolean' || prevType === 'null' || prevType === 'undefined') return prev === next;
  if (prevType === 'number') return prev === next || (Number.isNaN(prev) && Number.isNaN(next));
  if (prevType === 'object') {
    let prevKeys = Object.keys(prev);
    let nextKeys = Object.keys(next);
    if (prevKeys.length !== nextKeys.length) return false;
    for (let n = 0; n < prevKeys.length; n++) {
      let isCheck = equaler(prev[prevKeys[n]], next[prevKeys[n]]);
      if (!isCheck) {
        return false;
      }
    }
    return true;
  }
  if (prevType === 'array') {
    if (prev.length !== next.length) return false;
    for (let n = 0; n < prev.length; n++) {
      let isCheck = equaler(prev[n], next[n]);
      if (!isCheck) {
        return false;
      }
    }
    return true;
  }
}

// console.log(equaler(NaN, NaN));
// console.log(equaler([NaN, { name: true }], [NaN, { name: true }]));
// console.log(equaler([1, 2, true, NaN, [1, 2, true, NaN, [1, 2, true, NaN]]], [1, 2, true, NaN, [1, 2, true, NaN, [1, 2, true, NaN]]]));
