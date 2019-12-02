/**
 * @name 执行方法去抖动
 * @msg 如果一个函数持续地触发，那么只在它结束后过一段时间只执行一次
 *  使用闭包的作用，独立每个的bounce，互相不影响
 * @param { fn } [function] 执行的方法
 * @param { delay }  等待多少时间触发
 * @return [ function ]
 */

export default function debouncer(fn, delay) {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");
  if (!Number.isInteger(delay) || delay < 0) throw new Error("The second argument must be int number , and it must be not less than 0.");
  let timeout = null;
  let time = 0;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      time++;
      fn.call(this, ...args);
    }, delay);
    return time;
  };
}
