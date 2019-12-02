/**
 * @name 判断字符串是否是base64格式图片文件
 * @param { string } [ string ]
 * @return [ boolean ]
 */
let baser = function(string) {
  if (typeof string !== "string") throw new Error("The argument must be string.");
  //data:image/jpeg;base64
  const regexp = /^data\:image\/(.*?)\;base64/;
  return regexp.test(string);
};

/**
 * @name  获取based64图片文件的类型
 * @param   { base64 } [ string ] base64格式的图片路径
 * @return { string }
 */

baser.typer = function(base64) {
  if (!baser(base64)) throw new Error("The argument must be base64 string.");
  let type = "";
  base64.replace(/\:(.*?)\;/, function(a, b, c) {
    type = b;
  });
  return type;
};

/**
 * @name 获取base64图片文件的体积
 * @msg   必须是base64格式图片地址
 * @param   { base64 } [ string ]
 * @return  [ number ] 字节大小
 */

baser.size = function(base64) {
  if (!baser(base64)) throw new Error("The argument must be base64 string.");
  let index1 = base64.indexOf(",");
  let index2 = base64.indexOf("=");
  let base = base64.slice(index1 + 1, index2 > -1 ? index2 : base64.length);
  let strLength = base.length;
  let fileLength = parseInt(strLength - (strLength / 8) * 2);
  return fileLength;
};

export default baser;
