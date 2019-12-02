/**
 * @name 传入一个现有函数，反柯里化会返回一个新的函数，该新函数接受的第一个实参将绑定为fn中的this的上下文，其他参数将传递给fn作为参数
 * @msg 是对js内置的其他方法的借调，而不用自己去实现一遍
 * @param { fn } 需要反柯里化的函数
 * @return { function }  返回一个新的函数
 *
 */

export default function uncurryer(fn) {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");

  return function(...args) {
    return fn.apply(args[0], args.slice(1));
  };
}

// let split = uncurryer(String.prototype.split);
// console.log(split("a,b,c", ","));
// let push = uncurry(Array.prototype.push)
// let arr = [1,2,3,4]
// push(arr,1,2,3,4)
// console.log(arr)
