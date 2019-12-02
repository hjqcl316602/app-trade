/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangjunquan
 * @Date: 2019-05-24 09:13:26
 * @LastEditors: huangjunquan
 * @LastEditTime: 2019-06-25 12:21:37
 */

// 前瞻：
// exp1(?=exp2) 查找exp2前面的exp1
// 后顾：
// (?<=exp2)exp1 查找exp2后面的exp1
// 负前瞻：
// exp1(?!exp2) 查找后面不是exp2的exp1
// 负后顾：
// (?<!=exp2)exp1 查找前面不是exp2的exp1
// ()表示捕获分组，()会把每个分组里的匹配的值保存起来，使用$n(n是一个数字，表示第n个捕获组的内容)
// (?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来

/**
 * @name 字符串转千分位
 * @msg  判断字符串是否存在'.'，存在则使用Number(value).toLocaleString()，否则正则替换
 * @param { string } [ string,number ]
 * @return [ string ]
 * @example shousand(123456788) => 123,456,788
 * @example shousand(123456788.11) => 123,456,788.11
 */
export default function shousand(string) {
  if (typeof string !== "string" && typeof string !== "number") {
    console.error("[string] is not string or number");
    return string;
  }
  string = String(string);
  return /\./g.test(string) ? Number(string).toLocaleString() : string.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}

// let string = shousand(123456788);
// console.log(string);

// 查找 junquan前面的huang
//  let regex = /huang(?=junquan)/
//  let strings = 'huangjunquan'
//  let strings2 = 'chenjunquan'
//  console.log(regex.test(strings))
//  console.log(strings.replace(regex,'chen'))
//  console.log(regex.test(strings2))
//  console.log(strings2.replace(regex,'huang'))

// 查找 huang后面的junquan
//  let regex = /(?<=huang)junquan/g
//  let strings = 'huangjunquanhuangjunquan'
//  let strings2 = 'chenjunquan'
//  console.log(regex.test(strings))
//  console.log(strings.replace(regex,'lan'))
//  console.log(regex.test(strings2))
//  console.log(strings2.replace(regex,'jun'))
