/**
 * @name 偏函數
 * @msg 
 * 创建一个调用另一部分参数或变量已经预置的函数
 * 可以先进行一些参数的设置
 * @param { fn }  [ function ]
 * @param {...args }
 * @return [ function ]
 */

export default function partialer(fn, ...args) {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");
  return function(...rest) {
    return fn.apply(this, [...args, ...rest]);
  };
}

// let cur = partial(function(a,b){
//   return a + b
// },1)

// console.log(cur(2))

// 偏函数的应用场景

// function isType(type) {
//   return function(value) {
//     return (
//       Object.prototype.toString
//         .call(value)
//         .slice(8, -1)
//         .toLowerCase() === type
//     );
//   };
// }

// let isString = isType('string')
// let isFunction = isType('function')
// let isNumber = isType('number')

// console.log(isString(''))
