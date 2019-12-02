/**
 * @name 判断数组是二维数组
 * @msg 子元素全部是数组组成的数组
 * @param { array } [ array ]
 * @return [ boolean ]
 */
export default function dimener(array) {
  if (!Array.isArray(array)) {
    throw new Error("The argument must be array.");
  }
  for (let n = 0; n < array.length; n++) {
    if (!Array.isArray(array[n])) {
      return false;
    }
  }
  return true;
}
