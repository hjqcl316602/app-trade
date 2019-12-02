/**
 * @name  获取一个字符串包含指定的字符串的所有角标
 * @param   { string } [ string ]
 * @param   { target } [ string ] 指定的字符串
 * @return  [ array ] 角标位置数组
 * @example console.log(contains("insssinsssins", "s")); => [2,3,3,7,8,9,12]
 */

export default function contains(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  let res = [];
  let regex = new RegExp(`${target}`, "g");
  string.replace(regex, function(regex, index, string) {
    res.push(index);
  });
  return res;
}

/**
 * @name  获取一个字符串包含指定的字符串的所有角标
 * @msg 循环方式
 * @param   { string } [ string ]
 * @param   { target } [ string ] 指定的字符串
 * @return  [ array ] 角标位置数组
 * @example console.log(contains("insssinsssins", "s")); => [2,3,3,7,8,9,12]
 */

contains.exec = function(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  let res = [];
  let regex = new RegExp(`${target}`, "g");
  let result;
  do {
    result = regex.exec(string);
    result && res.push(result["index"]);
  } while (result != null);
  return res;
};

/**
 * @name 返字符串中匹配正则表达式的值
 * @msg  replace的callback函数的参数的个数由正则表达式决定的 1.第一个 ： 正则表达式结果;2.倒数第二个：角标;3.倒数第一个：字符串本身;4.剩余的：正则表达式匹配的结果
 * @param  { string }  [ string ]
 * @param  { regexp } [ regexp ]
 * @return [ array<object> ]
 */

contains.with = function(string, regexp) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (regexp.constructor !== RegExp) {
    throw new Error("The second argument must be regexp.");
  }
  let res = [];
  let newRegex = new RegExp(regexp);
  string.replace(newRegex, function(...args) {
    res.push({
      regex: args[0],
      string: args[args.length - 1],
      index: args[args.length - 2],
      match: [...args.slice(1, -2)]
    });
  });
  return res;
};

// let a = /\{(.*?)\}/g;
// console.log(a instanceof RegExp);

// 获取字符串中{}中的值
// let string = "a{b}c{d}e{f}";
// console.log(contains.with(string, /\{(.*?)\}/g));
// 获取字符串中[]中的值
// let string2 = 'a[b]c[d]e[f]'
// console.log(containsWith(string2, /\[(.*?)\]/g))
// 获取字符串中单词中的值
//let string3 = 'ass ass asas asas asas sa'
//console.log(containsWith(string3, /\b(\w+)\b/g))

// 获取url字符串中的key=value
//let string4 = "name=hjq&age=10&address={si}";
//console.log(containsWith(string4, false, /(\w+)(\=)(\w+)/g));
