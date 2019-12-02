/***
 * @name 延迟多少时间触发事件
 * @param {fn} [function] 触发的方法
 * @param { wait }  等待的时长
 * @param { ..args} 方法的参数
 * @return [ function ]
 */

export default function delayer(fn, wait, ...args) {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("The second argument must be int number , and it must be not less than 0.");
  return function() {
    setTimeout(fn, wait, ...args);
  };
}

// let test = delayer(
//   function(...args) {
//     console.log(...args);
//   },
//   2000,
//   "hjq",
//   "hjsh"
// );
// test();
