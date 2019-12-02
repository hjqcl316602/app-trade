/*
 * @Descripttion: 数学计算
 * @version: 0.0.1
 * @Author: huangjunquan
 * @Date: 2019-06-11 18:07:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-07-17 15:29:48
 * @msg
 * 小数与整数的积也不能得到期望值，1.2334567 * 1000 = 1233.4567000000002
 * 两数乘积可能会超安全数范围
 * 有些特殊的数字会自动转为科学计数，当数值为整数时，后面有21个0时， 9000000000000000000000 => 9e+21 ； 当数值为浮点数时，一个不为0的数前面有7个0时，0.0000001 => 1e-7
 *
 */

export default function Calcer() {}
/**
 * @description 按指定的函数返回值填充指定长度的数组
 * @param { len = 10 } [ number ] 指定长度
 * @param { callback } [ function ] 指定函数返回值
 * @param { context = this } [ any ] 函数执行上下文
 * @return [ array ]
 */
//
Calcer.prototype._template = function(len = 10, callback = function() {}, context = this) {
  return Array.apply(null, Array(len)).map(() => callback.call(context));
};

/**
 * @name 向字符串指定的角标后面插入指定字符串
 * @param { string } [ string ]  目标字符串
 * @param { index } [ number ] 角标值
 * @param { target } [ string ] 插入的字符串
 * @return [ string ]
 */

Calcer.prototype._insert = function(string, index = 0, target = '') {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  if (!Number.isInteger(index) || index < 0 || index > string.length) {
    throw new Error('The second argument must be int number,and it must not less than 0 and not greater than the first argument length.');
  }
  if (typeof target !== 'string') {
    throw new Error('The third argument must be string.');
  }
  return string.slice(0, index) + target + string.slice(index);
};

/**
 * @name 数字格式化
 * @msg
 * 1.是否存在'.'，若存在，去掉开头和结尾的0，否则，只去掉开头的0
 * 2.当以'.'开头，则前面补'0'
 * 3.当以'.'结尾，则去掉结尾的'.'
 * 4.若为空，则返回0
 * @param { string } [ string]
 * @return string
 * @example console.log(calcer.format("000.0001"));=> '0.0001'
 */
Calcer.prototype._format = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  if (string.indexOf('.') > -1) {
    string = string.replace(/(0+)$/, '');
  }
  string = string.replace(/^(0+)/, '');
  if (string.startsWith('.')) {
    string = '0' + string;
  }
  string = string.replace(/\.$/, '');
  return string.length === 0 ? '0' : string;
};
/**
 * @name 是否是合法的可计算的数字
 * @param { string } [ string ]
 * @return [ boolean ]
 * @example isFreeNumber("0.0") => true
 * @example isFreeNumber("0.") => false
 * @example isFreeNumber("001") => false
 * @example isFreeNumber(".0") => false
 * @example isFreeNumber("-1") => false
 * @example isFreeNumber("+1") => false
 */
Calcer.prototype._isFreeNumber = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  let regex = /(^[0](\.[0-9]+)?$)|(^[1-9]([0-9]+)?(\.[0-9]+)?$)/; ///(^0\.([0-9]*)?[1-9]+([0-9]*)?$)|(^[0]{1}$)|(^[1-9]([0-9]+)?(\.[0-9]+)?$)/;
  return regex.test(string);
};

/**
 * @name 转可用的数字
 * @msg
 * number类型
 * 数字必须大于等于0
 * 将科学计数方式的数字转为可用的数字，小数点后面位数加整数部分的长度为16位，才能正确获取数字
 * string类型
 * 是合法的数字即可，整数部分和小数部分均是任意长度
 * 以'0'开头，若后面没有有小数点，则'0'本身；若后面有小数点，则小数点后面有至少一位的数字
 * 不以'0'开头，后面跟任意位的数字，若有小数点，后面至少需要一位以上的数字
 * @param { value } [ number | string ]
 * @return [string]
 */
Calcer.prototype._toFreeNumber = function(value) {
  if (typeof value !== 'number' && typeof value !== 'string') throw new Error('The argument must be string or number.');
  if (typeof value === 'number') {
    let result = String(value);
    let index = result.indexOf('-');
    if (index === 0) {
      throw new Error('The argument must be not less than 0.');
    } else if (index > 0) {
      result = '0' + String(Number(result) + 1).substr(1);
    }
    return result;
  } else {
    let regex = /(^[0](\.[0-9]+)?$)|(^[1-9]([0-9]+)?(\.[0-9]+)?$)/;
    if (!regex.test(value)) throw new Error('The argument must be a free number.');
    return value;
  }
};
/**
 * @name 加法运算
 * @param { prev } [ number | string ]
 * @param { next } [ number | string ]
 * @return [ string ]
 * @example console.log(calc.add("1.123", "0.877")); // => 2
 * @example console.log(calc.add("0.1", "0.2")); // 0.3
 * @example console.log(calc.add("0.1", "1.23")); // => 1.33
 * @example console.log(calc.add("1000", "0.0001")); //=>1000.0001
 * @example console.log(calc.add("00001", "1")); // => 2
 * @example console.log(calc.add("99999999999999999", "1")); //=> 1000000000000000
 */

Calcer.prototype.adder = function(prev, next) {
  prev = this._toFreeNumber(prev);
  next = this._toFreeNumber(next);
  let prevSplit = prev.split('.'),
    nextSplit = next.split('.');
  let prevIntLen = prevSplit[0].length,
    nextIntLen = nextSplit[0].length,
    minusIntLen = prevIntLen - nextIntLen,
    maxIntLen = Math.max(prevIntLen, nextIntLen);
  let prevFloatLen = prevSplit[1] ? prevSplit[1].length : 0,
    nextFloatLen = nextSplit[1] ? nextSplit[1].length : 0,
    minusFloatLen = prevFloatLen - nextFloatLen,
    maxFloatLen = Math.max(prevFloatLen, nextFloatLen);
  // 进行整数部分0的补位
  let intZero = this._template(Math.abs(minusIntLen), () => '0').join('');
  if (minusIntLen > 0) {
    next = intZero + next;
  } else if (minusIntLen < 0) {
    prev = intZero + prev;
  }
  // 进行浮点数部分0的补位
  let floatZero = this._template(Math.abs(minusFloatLen), () => '0').join('');
  if (minusFloatLen > 0) {
    next = next + floatZero;
  } else if (minusFloatLen < 0) {
    prev = prev + floatZero;
  }
  next = next.replace('.', '');
  prev = prev.replace('.', '');
  prev = prev.split('').reverse();
  next = next.split('').reverse();
  let resArr = [];
  for (let i = 0; i < prev.length; i++) {
    let addRes = Number(prev[i] || 0) + Number(next[i] || 0) + Number(resArr[i] || 0);
    resArr[i] = addRes % 10;
    let res = (addRes - (addRes % 10)) / 10;
    res > 0 ? (resArr[i + 1] = res) : null;
  }
  let res = resArr.reverse().join('');
  let resSlot = this._insert(res, res.length - maxFloatLen, '.');

  return this._format(resSlot);
};

/**
 * @name 乘法运算
 * @param { prev } [ number | string ]
 * @param { next } [ number | string ]
 * @return [ string ]
 * @example console.log(calc.mul("0.1", "0.7")); => '0.07'
 * @example console.log(calc.mul("123456", "0.123456")); => '15241.383936'
 */

Calcer.prototype.muler = function(prev, next) {
  prev = this._toFreeNumber(prev);
  next = this._toFreeNumber(next);
  let prevSplit = prev.split('.'),
    nextSplit = next.split('.');
  let prevIntLen = prevSplit[0].length,
    nextIntLen = nextSplit[0].length,
    minusIntLen = prevIntLen - nextIntLen,
    maxIntLen = Math.max(prevIntLen, nextIntLen);
  let prevFloatLen = prevSplit[1] ? prevSplit[1].length : 0,
    nextFloatLen = nextSplit[1] ? nextSplit[1].length : 0,
    addFloatLen = prevFloatLen + nextFloatLen,
    maxFloatLen = Math.max(prevFloatLen, nextFloatLen);
  prev = prev.replace('.', '');
  next = next.replace('.', '');
  let res = [];
  for (let n = prev.length - 1; n >= 0; n--) {
    for (let k = next.length - 1; k >= 0; k--) {
      let value = Number(prev[n] || 0) * Number(next[k] || 0) + (res[n + k + 1] || 0);

      let value1 = value % 10;
      let value2 = (value - value1) / 10;
      res[n + k + 1] = value1;
      res[n + k] = value2 + Number(res[n + k] || 0);
    }
  }
  let resJoin = res.join('');
  let resInsert = this._insert(resJoin, resJoin.length - addFloatLen, '.');
  let resFormat = this._format(resInsert);
  return resFormat;
};

// let calcer = new Calcer();
// console.log(calcer.adder(0.0000000000123455, 0.0000000000123455));
