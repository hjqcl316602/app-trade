/*
 * @Descripttion: 表单数据验证
 * @version:0.0.1
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: huangjunquan
 * @LastEditTime: 2019-07-05 09:08:50
 * @msg : 首先会判断是否是必填项； 是，则先判断是否有值，再进行后续的验证判断；否，先判断是否有值，无，则跳过该数据的后续验证，有，则继续后续验证、
 * @msg : 支持的类型 regex | len | function
 */
import regexs from "../regexer";

export default function Check() {
  this.data = null;
  this.message = "";
  this.pass = true;
  this.isRequire = false;
  this.sourse = [];
}

/**
 * @name 绑定当前验证的数据
 * @param  { data } [ string ] 验证数据
 * @param { isRequire } [ boolean ] 是否是必填项
 * @param { message } [ string ] 错误提示语
 * @return [ object ] 当前实例
 */
Check.prototype.set = function (data, isRequire = false, message = "") {
  if (typeof data !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof isRequire !== "boolean") {
    throw new Error("The second argument must be boolean.");
  }
  if (isRequire && typeof message !== "string") {
    throw new Error("While the second argument is true,the third argument must be string.");
  }
  if (!this.pass) return this;
  this.isRequire = isRequire;
  this.data = data;
  this.sourse.push({
    data: data,
    require: isRequire
  });
  if (this.isRequire) {
    this.pass = this._isRequire(this.data);
    if (!this.pass) {
      this.message = message;
    }
    return this;
  }
  this.pass = true;
  this.message = "";
  return this;
};

/**
 * @name 数据长度是否是指定长度
 * @param { message } [ string ] 错误提示语
 * @param { len } [ number ] 指定长度
 * @return [ object ]
 */
Check.prototype.len = function (message, len) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (!Number.isInteger(len) || len < 0) {
    throw new Error("The second argument must be int number,and it's must be not less than 0.");
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  let regex = new RegExp(`^[\\s\\S]{${len}}$`);
  this.pass = regex.test(this.data);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};

/**
 * @name 数据长度是否大于指定长度
 * @param { message } [ string ] 错误提示语
 * @param { min } [ number ] 最小长度
 * @return [ object ]
 */
Check.prototype.minLen = function (message, min) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (!Number.isInteger(min) || min < 0) {
    throw new Error("The second argument must be int number,and it's must be not less than 0.");
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  let regex = new RegExp(`^[\\s\\S]{${min},}$`);
  this.pass = regex.test(this.data);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};

/**
 * @name 数据是否在最大长度范围值内
 * @param { message } [ string ] 错误提示语
 * @param { max } [ number ] 最大长度
 * @return [ object ]
 */
Check.prototype.maxLen = function (message, max) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (!Number.isInteger(max) || max < 1) {
    throw new Error("The second argument must be int number,and it's must be greater than 0.");
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  let regex = new RegExp(`^[\\s\\S]{0,${max}}$`);
  this.pass = regex.test(this.data);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};
/**
 * @name 数据是否在指定的范围内
 * @param { message } [ string ] 错误提示语
 * @param { min } [ number ] 最小长度
 * @param { max } [ number ] 最大长度
 * @return [ object ]
 */

Check.prototype.rangeLen = function (message, min, max) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("The second argument and third argument must be int number.");
  }
  if (min < 0 || min >= max) {
    throw new Error("The second argument must be not less than 0 ,and the third argument must be greater than the second argument.");
  }

  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  let regex = new RegExp(`^[\\s\\S]{${min},${max}}$`);
  this.pass = regex.test(this.data);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};

/**
 * @name 通过指定的正则表达式验证数据
 * @param { message } [ string ] 错误提示语
 * @param { type } [ string ] 指定的正则类型
 * @return [ object ]
 */
Check.prototype.regex = function (message, type) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof type !== "string") {
    throw new Error("The second argument must be string.");
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  let regex = regexs.findIndex(reg => reg.type === type);
  if (regex === -1) {
    throw new Error("The regex type is undefined.");
  }
  this.pass = regexs[regex]["value"].test(this.data);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};

/**
 * @name 通过指定的函数验证数据
 * @param { message } [ string ] 错误提示语
 * @param { callback } [ function ] 指定的函数
 * @return [ object ]
 */

Check.prototype.check = function (message, callback) {
  if (typeof message !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof callback !== "function") {
    throw new Error("The second argument must be function.");
  }
  if (!this.pass || (!this.isRequire && !this._isRequire(this.data))) {
    return this;
  }
  this.pass = callback.call(this, this.data, regexs);
  if (!this.pass) {
    this.message = message;
  }
  return this;
};

/**
 * @name 验证字符串是必填项
 * @param { string } [ string ]
 * @return [ boolean ]
 */
Check.prototype._isRequire = function (string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return /^[\s\S]+$/.test(string);
};

// test

// let check = new Check()
//   .set("")
//   .check("长度不少于4", function(value, regex) {
//     return value.length >= 4;
//   })
//   .regex("格式错误", "chinese")
//   .set("1398046423")
//   .regex("格式错误", "mobile");

// console.log(check);
// console.log(check.pass, check.message);
