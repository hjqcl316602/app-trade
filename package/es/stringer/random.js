/**
 * @name  生成随机字符串
 * @param  { n } [ number ] 指定长度 ， 默认长度为16
 * @return  [ string ]
 * @example random(16) => n568c2cjdbdi3oop
 */

export default function random(n) {
  if (!(Number.isInteger(n) && n > 0)) {
    console.error("[n] is not integer or less than 1");
    n = 16;
  }
  let standard = "abcdefghijklmnopqrstuvwxyz9876543210";
  let len = standard.length;
  let result = "";
  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len));
  }
  return result;
}

/**
 * @name  随机生成颜色字符串
 * @param  { isOpacity } [ boolean ] 是否需要透明度
 * @return  [string]
 * @example random.color(true) => rgba(226,180,173,0.3421123393946621)
 * @example random.color() => rgba(226,180,173)
 */

random.color = function(isOpacity) {
  if (typeof isOpacity !== "boolean") {
    throw new Error("The argument must be boolean.");
  }
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let a = Math.random();
  return isOpacity ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
};

/**
 * @name  随机生成颜色字符串-16进制字符串
 * @return  [string]
 * @example random.color.hex() => #3e7fce
 */
random.color.hex = function() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

//console.log(random.color.hex());
