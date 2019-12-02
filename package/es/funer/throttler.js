/**
 * @name 执行方法节流-定时器式
 * @msg 就是指连续触发事件但是在 n 毫秒中只执行一次函数，
 * @param { fn } [function]执行方法
 * @param { delay } 间隔多少秒后执行方法
 * @param { type } [ 'timeout','time']
 * @return [ function ]
 */
let throttler = function(fn, delay, type = "timeout") {
  if (typeof fn !== "function") throw new Error("The first argument must be function.");
  if (!Number.isInteger(delay) || delay < 0) throw new Error("The second argument must be int number , and it must be not less than 0.");
  if (["timeout", "time"].findIndex(item => item === type) === -1) throw new Error("The third argument must be in ['timeout', 'time'].");
  if (type === "timeout") {
    let timeout = null;
    let time = 0;
    return function(...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          time++;
          timeout = null;
          fn.call(this, ...args);
        }, delay);
      }
      return time;
    };
  }
  if (type === "time") {
    let previous = 0;
    let time = 0;
    return function(...args) {
      let now = +new Date();
      if (now - previous > delay) {
        time++;
        fn.call(this, ...args);
        previous = now;
      }
      return time;
    };
  }
};
throttler.timeout = function(fn, delay) {
  return throttler(fn, delay, "timeout");
};

throttler.time = function(fn, delay) {
  return throttler(fn, delay, "time");
};

export default throttler;
