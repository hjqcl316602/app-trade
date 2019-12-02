/**
 * @name 过滤掉数组中的falsy值
 * @msg [ false , 0 , null, undefined , NaN , ""] 表示falsy值
 * @param { array } [ array ]
 * @return: array
 */

export default function trulyer(array) {
  if (!Array.isArray(array)) {
    throw new Error("The argument must be a array.");
  }
  return array.filter(Boolean);
}
