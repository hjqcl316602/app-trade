/**
 * @name 方法执行前函数
 * @msg 只支持同步函数
 * @param { fn  } [function] 执行的方法
 * @param { beforefn } [function] 方法执行前需要执行的方法
 * @param [ function ]
 */
export default function beforer(fn, beforefn) {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");
  if (typeof beforefn !== "function") throw new Error("The second argument must be function.");
  return function() {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
}

// let dod = beforer(
//   function() {
//     console.log("do something.");
//   },
//   function() {
//     console.log("before.");
//   }
// );
// dod();
