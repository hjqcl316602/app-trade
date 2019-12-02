/**
 * @name  函数绑定执行上下文
 * @param { fn } [function] 方法
 * @param { context } [any]  执行的上下文
 * @return [ function ]
 */
export default function binder(fn, context = this) {
  if (typeof fn !== "function") throw new Error("The fisrt argument must be function.");
  return function(...args) {
    return fn.call(context, ...args);
  };
}

// let bin = bind(function(age){
//   console.log(this,age)
// },{ name :'hjq'})

// bin('1111')
