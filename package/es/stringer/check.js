/**
 * @name  验证字符串是否是有值
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check("s") => true
 * @example check("") => false
 * @example check(0) => false
 * @example check(" ") => true
 */

export default function check(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return /^[\s\S]+$/.test(string);
}
/**
 * @name  验证字符串是否是包含指定的字符串
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.contain("huang","hua") => true
 */

check.contain = function(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  let regex = new RegExp(`${target}`, "g");
  return regex.test(string);
};
//console.log(check.contain("huangjunquan", "hua"));
/**
 * @name  验证字符串是否是连续的
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.continue("123") => true
 * @example check.continue("abc") => true
 */
check.continue = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  if (string.length < 2) return false;
  for (let n = 1; n < string.length; n++) {
    if (string.charCodeAt(n) - string.charCodeAt(n - 1) !== 1) {
      return false;
    }
  }
  return true;
};
//console.log(check.continue(""));

/**
 * @name  验证字符串是否是重复的-全部是由一个字符组成
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.repeat("aaa")=>true
 * @example check.repeat("abc")=>false
 */
check.repeat = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  if (string.length < 2) return false;
  return string.split("").filter((item, index, array) => array.indexOf(item) === index).length === 1;
};
//console.log(check.repeat("aaa"));

/**
 * @name  验证字符串中部是否是指定的字符串
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.center("huang","a") => true
 */
check.center = function(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  let index = (string.length - target.length) / 2;
  if (!Number.isInteger(index)) return false;
  return string.slice(index, index + target.length) === target;
};
//console.log(check.center("hjq", "j"));

/**
 * @name  验证字符串尾部是否是指定的字符串
 * @param   { string  }  [ string ]
 * @param   { target  }  [ string ]
 * @return  [ boolean ]
 * @example check.end("huang","ng") => true
 */
check.end = function(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  return string.slice(string.length - target.length) === target;
};
//console.log(check.end("hjq", "jq"));

/**
 * @name  验证字符串开头是否是指定的字符串
 * @param   { string  }  [ string ]
 * @param   { target  }  [ string ]
 * @return  [ boolean ]
 * @example check.start("hjq", "hj") => true
 */
check.start = function(string, target) {
  if (typeof string !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof target !== "string") {
    throw new Error("The second argument must be string.");
  }
  return string.slice(0, target.length) === target;
};
//console.log(check.start("hjq", "hj"));

/**
 * @name  验证字符串是否是回文字符串
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.plalin("121") => true
 */
check.plalin = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return (
    string
      .split("")
      .reverse()
      .join("") === string
  );
};
//console.log(check.plalin("121"));

/**
 * @name  验证字符串是否存在空白字符
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.space("121 ") => true
 * @example check.space("  ") => true
 */
check.space = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return string.replace(/\s+/g, "") !== string;
};
//console.log(check.space("121 "));

/**
 * @name  验证字符串是否全部是空白字符组成
 * @param   { string  }  [ string ]
 * @return  [ boolean ]
 * @example check.space.whole(" ") => true
 * @example check.space.whole("") => false
 */
check.space.whole = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return string !== "" && string.replace(/\s+/g, "") === "";
};
//console.log(check.space.whole(" "));
