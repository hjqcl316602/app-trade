/**
 * @name 数组去重
 * @msg 只支持 object 类型
 * @param { array }  [ array ]
 * @return [ array]
 */

export default function uniquer(array) {
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array');
  }
  return [...new Set(array)];
}
