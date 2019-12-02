function typer(value) {
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
function checker(type, method = 'support') {
  if (method === 'support') {
    return ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object'].includes(type);
  } else if (method === 'quote') {
    return ['array', 'object'].includes(type);
  } else if (method === 'origin') {
    return ['string', 'number', 'boolean', 'null', 'undefined'].includes(type);
  }
}
/**
 * @name 数据的克隆
 * @msg
 * 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
 * 深拷贝，即和源数据之间不存在引用关系
 * 暂不支持 function、symbol 、regex 等的拷贝
 * 存在__proto__属性时，不通过
 * @param { target } [ 'string', 'number', 'boolean', 'array', 'null', 'undefined', 'object' ] 目标数据
 * @return [ any ]
 * @example
 * cloner({ name: ["", 2, 3, 5] }) => { name: ["", 2, 3, 5] }
 */

export default function cloner(target) {
  let currentType = typer(target);
  if (!checker(currentType)) throw new Error("The argument type must be in ['string', 'number', 'boolean', 'array', 'null', 'undefined','object'].");
  if (currentType === 'object' && !freer(target)) throw new Error('While the argument type is object,it must be created of {} or new Object() or Object.create(null).');

  if (currentType === 'array') {
    let res = [];
    for (let n = 0; n < target.length; n++) {
      res.push(cloner(target[n]));
    }
    return res;
  }
  if (currentType === 'object') {
    let res = {};
    for (let key in target) {
      res[key] = cloner(target[key]);
    }
    return res;
  }
  return target;
}

// let Person = function() {};
// let object = { name: undefined };
// let cloneObject = cloner(object);
// console.log(cloneObject, object);
//console.log(preson, type(preson));

/**
 * @name 数据深拷贝，向后（替换+追加）
 * @msg
 * 只用于满足常用业务逻辑
 * 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
 * 原始 + 原始 | 返回原始next
 * 引用 + 原始 | 返回原始next
 * 原始 + 引用 | 返回引用next的深拷贝
 * 引用 + 引用 | 若类型不一致，则返回next的深拷贝，若类型一直，则判断next中属性在prev中的存在性，若存在，则替换，若不存在，则追加
 * @param { prev } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
 * @param { next } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
 * @return [ any ]
 */

cloner.nexter = function(prev, next) {
  let prevType = typer(prev);
  let nextType = typer(next);
  if (!checker(prevType)) throw new Error('The first argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (!checker(nextType)) throw new Error('The second argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (prevType === 'object' && !freer(prev)) throw new Error('While the first argument type is object,it must be created of {} or new Object() or Object.create(null).');
  if (nextType === 'object' && !freer(next)) throw new Error('While the second argument type is object,it must be created of {} or new Object() or Object.create(null).');
  if (checker(nextType, 'origin')) return next == null ? prev : next;
  if (prevType !== nextType) return cloner(next);
  if (prevType === 'array') {
    let maxLen = Math.max(prev.length, next.length);
    let res = [];
    for (let n = 0; n < maxLen; n++) {
      res.push(cloner.nexter(prev[n], next[n]));
    }
    return res;
  }
  if (prevType === 'object') {
    let prevKeys = Object.keys(prev);
    let nextKeys = Object.keys(next);
    let mergeKeys = [...prevKeys, ...nextKeys].filter((item, index, array) => array.indexOf(item) === index);
    let res = {};
    mergeKeys.forEach(item => {
      res[item] = cloner.nexter(prev[item], next[item]);
    });
    return res;
  }
};

//console.log(cloner.next({ name: null, addree: '' }, { age: 1, name: '', addree: [1, 2, 3] }));

/**
 * @name 数据深拷贝，向前（替换）
 * @msg
 * 只用于满足常用业务逻辑
 * 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
 * 原始 + 原始 | 返回原始next
 * 引用 + 原始 | 返回原始next
 * 原始 + 引用 | 返回引用next的深拷贝
 * 引用 + 引用 | 若类型不一致，则返回next的深拷贝，若类型一直，则判断next中属性在prev中的存在性，若存在，则替换，若不存在，则忽略
 * @param { prev } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
 * @param { next } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
 * @return [ any ]
 */
cloner.prever = function(prev, next) {
  let prevType = typer(prev);
  let nextType = typer(next);
  if (!checker(prevType)) throw new Error('The first argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (!checker(nextType)) throw new Error('The second argument type must be in [ number,string,boolean,null,undefined,array,object ]');
  if (prevType === 'object' && !freer(prev)) throw new Error('While the first argument type is object,it must be created of {} or new Object() or Object.create(null).');
  if (nextType === 'object' && !freer(next)) throw new Error('While the second argument type is object,it must be created of {} or new Object() or Object.create(null).');
  if (checker(nextType, 'origin')) return next == null ? prev : next;
  if (prevType !== nextType) return cloner(next);
  if (prevType === 'array') {
    let res = [];
    for (let n = 0; n < prev.length; n++) {
      res.push(cloner.prever(prev[n], next[n]));
    }
    return res;
  }
  if (prevType === 'object') {
    let prevKeys = Object.keys(prev);
    let res = {};
    prevKeys.forEach(item => {
      res[item] = cloner.prever(prev[item], next[item]);
    });
    return res;
  }
};

// console.log(cloner.nexter({ name: '', age: 0 }, { name: 'huang', a: 12 }));
// console.log(cloner.prever({ name: '', age: 0 }, { name: 'huang', a: 12 }));

// console.log(cloner.prever([1, 2, 3], [1, 2, 4, 5, 6]));
// console.log(cloner.nexter([1, 2, 3], [1, 2, 4, 5, 6]));

// console.log(cloner.nexter([{ name: '', age: 0 }], [{ name: 'hjq' }, 2, 4, 5, 6]));
// console.log(cloner.prever([{ name: '', age: 0 }], [{ name: 'hjq' }, 2, 4, 5, 6]));
