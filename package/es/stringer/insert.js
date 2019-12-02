/**
 * @name 向字符串指定的角标后面插入指定字符串
 * @param { string } [ string ]  目标字符串
 * @param { index } [ number ] 角标值
 * @param { target } [ string ] 插入的字符串
 * @return [ string ]
 */

export default function insert(string, index = 0, target = "") {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (!Number.isInteger(index) || index < 0 || index > string.length) {
    throw new Error("The second argument must be int number,and it must not less than 0 and not greater than the first argument length.");
  }
  if (typeof target !== "string") {
    throw new Error("The third argument must be string.");
  }
  return string.slice(0, index) + target + string.slice(index);
}
/**
 * @name 向字符串指定的字符串后面插入指定字符串
 * @param { string } [ string ]  目标字符串
 * @param { code } [ string ] 目标位置字符串
 * @param { target } [ string ] 插入的字符串
 * @return [ string ]
 */
insert.code = function(string, code = "", target = "") {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof code !== "string") {
    throw new Error("The second argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The third argument must be string.");
  }
  let index = string.indexOf(code);
  return index > -1 ? string.slice(0, index) + target + string.slice(index) : string;
};
