/**
 * @name: 生成一个数组模板
 * @param { start = 0 } [ number<int> ]开始值
 * @param { len = 10 } [ number<int> ]长度
 * @param { isUp = true } [ boolean ] 是否是向上递增，否则向下递减
 * @return: array<number>
 */

export default function templater(start = 0, len = 10, isUp = true) {
  if (!Number.isInteger(start)) {
    throw new Error("The first argument must be integer number.");
  }
  if (!Number.isInteger(len) || len <= 0) {
    throw new Error("The first argument must be be integer number and it must be greate than 0.");
  }
  if (typeof isUp !== "boolean") {
    throw new Error("The third argument must be boolean,and this normal is false.");
  }
  let res = [];
  if (isUp) {
    for (let n = start; n < len + start; n++) {
      res.push(n);
    }
  } else {
    for (let n = start; n > start - len; n--) {
      res.push(n);
    }
  }
  return res;
}

/**
 * @name: 随机产生一个指定长度的字符串
 * @param { n } [ number<int> ] 指定长度
 * @return: string
 */
templater._random = function(n = 16) {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("The first argument must be integer number and it must be greater than 0,and this normal is 16.");
  }
  let standard = "abcdefghijklmnopqrstuvwxyz9876543210";
  let len = standard.length;
  let result = "";
  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len));
  }
  return result;
};

/**
 * @name: 生成一个指定长度的数组，每个元素并由指定长度字符串组成
 * @param { len = 10 } [ number<int> ] 指定长度数组
 * @param { charLen = 4 } [ number<int> ] 指定长度的字符串元素
 * @return: [ array<number>]
 */
templater.stringer = function(len = 10, charLen = 4) {
  if (!Number.isInteger(len) || len <= 0) {
    throw new Error("The first argument must be integer number and it must be greater than 0,and this normal is 10.");
  }
  if (!Number.isInteger(charLen) || charLen < 1) {
    throw new Error("The second argument must be integer number and it must be greater than 0,and this normal is 4.");
  }
  let res = [];
  for (let n = 0; n < len; n++) {
    res.push(template._random(charLen));
  }
  return res;
};

/**
 * @name 填充相同值的元素的指定长度的数组
 * @param { len = 10 } [ len ] 数组的指定长度
 * @param { callback } [ function ] 指定函数
 * @param { context = this } [ any ] 函数执行上下文
 * @return:[ array ]
 */

templater.ofer = function(len = 10, callback = function() {}, context = this) {
  return Array.apply(null, Array(len)).map(() => callback.call(context));
};
