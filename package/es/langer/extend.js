import type from '../type/type';
import is from '../type/is';
import clone from './cloner';

// 支持的数据类型
const supportType = ['number', 'string', 'boolean', 'null', 'undefined', 'array', 'object', 'function', 'symbol'];

//原始数据类型,包含null
const originType = ['number', 'string', 'boolean', 'null', 'undefined', 'function', 'symbol'];
// 引用数据类型
const quoteType = ['object', 'array'];

/**
 * @name 数据拷贝-向后
 * @msg 针对引用关系的数据，源数据中存在目标数据没有的属性，则添加该属性，若有该属性，则覆盖该属性值。
 * 返回的新数据与目标数据和源数据均不存在引用关系
 * 原始数据类型：number,string,boolean,null,undefined,function,symbol
 * 引用数据类型：array,object
 * @rule
 * 原始1 + 原始2 => 当原始2为null时，返回原始1，否则原始2 | extend(1, null) => 1 |  extend(1, true ) => true
 * 原始 + 引用 => 原始 | extend(1, [1,2,3]) => 1 | extend(1, { name : 1 } ) =>1
 * 引用 + 原始 => 只对引用类型数据进行深复制即可
 *    array + 原始 |  extend( [1,2,3] , 1 ) => [ 1,2,3]
 *    object + 原始 |  extend( { name : 1 } , 1 ) => { name ： 1 }
 * 引用 + 引用
 *    array1 + array2 => array 向前复制和追加  |  extend( [ 1,2,3] ,[1,2,4,5,6] ) => [ 1,2,4,5,6]
 *    array + object => 只对array进行深复制即可 |  extend( [ 1,2,3] ,{ name : 1 } ) => [1,2,3]
 *    object + array  => 只对object进行深复制即可 |  extend( { a:1,b:2} ,[1,2,4,5,6] ) => { a:1,b:2}
 *   object1 + object2 => object2 向前复制和追加 |  extend( { a:1,b:2} , { b : 3 , c : 4 , e : null } ) => { a : 1 , b : 3 , c : 4 , e : undefined }
 * @param { prev } [ number,string,boolean,null,undefined,array,object ,function,symbol ]
 * @param { next } [ number,string,boolean,null,undefined,array,object ,function,symbol ]
 * @return [ number,string,boolean,null,undefined,array,object ,function,symbol ]
 */

export default function extend(prev, next) {
  if (!is(...supportType)(prev)) {
    throw new Error(`The first argument type must be in [ number,string,boolean,null,undefined,function,symbol,array,object ],but the argument type is ${type(prev)}.`);
  }

  if (!is(...supportType)(next)) {
    throw new Error('The second argument type must be in [ number,string,boolean,null,undefined,function,symbol,array,object ],but the argument type is ' + type(next) + '.');
  }
  let prevType = type(prev);
  let nextType = type(next);
  if (is(...originType)(prev)) {
    if (is(...originType)(next)) {
      return next == null ? prev : next;
    } else {
      return prev;
    }
  }
  if (is(...quoteType)(prev)) {
    if (prevType !== nextType) return clone(prev);
    if (prevType === 'array') {
      let len = Math.max(prev.length, next.length);
      let res = [];
      for (let n = 0; n < len; n++) {
        res.push(extend(prev[n], next[n]));
      }
      return res;
    }
    if (prevType === 'object') {
      let res = {};
      let keys = [...Object.keys(prev), ...Object.keys(next)].filter((item, index, array) => array.indexOf(item) === index);
      for (let n = 0; n < keys.length; n++) {
        res[keys[n]] = extend(prev[keys[n]], next[keys[n]]);
      }
      return res;
    }
  }
}
/**
 * @name 数据拷贝-向前
 * @msg 和extend同理，区别在于，后者和前者的属性名一致，则替换，否则不替换，也不追加
 * @param { prev }
 * @param { next }
 * @return [ any  ]
 * @example extend.replace([1, 2, 3, 4], [true, false, 2, 3, 4, 5, 6]) => [ true,false,2,3]
 * @example extend.replace({ a: 1, b: 2, c: 3 }, { a: true, b: null, d: undefined, e: "'" }) => { a: true, b: 2, c: 3 }
 */

extend.replace = function(prev, next) {
  if (!is(...supportType)(prev)) {
    throw new Error(`The first argument type must be in [ number,string,boolean,null,undefined,function,symbol,array,object ],but the argument type is ${type(prev)}.`);
  }

  if (!is(...supportType)(next)) {
    throw new Error('The second argument type must be in [ number,string,boolean,null,undefined,function,symbol,array,object ],but the argument type is ' + type(next) + '.');
  }
  let prevType = type(prev);
  let nextType = type(next);
  if (is(...originType)(prev)) {
    if (is(...originType)(next)) {
      return next == null ? prev : next;
    } else {
      return prev;
    }
  }
  if (is(...quoteType)(prev)) {
    if (prevType !== nextType) return clone(prev);
    if (prevType === 'array') {
      let len = prev.length;
      let res = [];
      for (let n = 0; n < len; n++) {
        res.push(extend(prev[n], next[n]));
      }
      return res;
    }
    if (prevType === 'object') {
      let res = {};
      let keys = Object.keys(prev);
      for (let n = 0; n < keys.length; n++) {
        res[keys[n]] = extend(prev[keys[n]], next[keys[n]]);
      }
      return res;
    }
  }
};

// let a = Object("{ name: '' }");
// console.log(a);
// console.log({ name: null }, { name: undefined });
