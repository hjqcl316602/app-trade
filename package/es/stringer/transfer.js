/**
 * @name 字符串的转义
 * @param {string} [ string ]
 * @return  [ string ]
 * @example transfer("< >") => &lt;&nbsp;&gt;
 */

export default function transfer(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  string = string.replace(/&/gi, "&amp;");
  string = string.replace(/</gi, "&lt;");
  string = string.replace(/>/gi, "&gt;");
  string = string.replace(" ", "&nbsp;");
  return string;
}

//console.log(transfer("< >"));
