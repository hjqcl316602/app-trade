/**
 * @name: 字符串反向
 * @param { string  } string
 * @return: [string]
 */

export default function reverse(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return string
    .split("")
    .reverse()
    .join("");
}
