/**
 * @name  扁平化数组
 * @param { array } [ array ] 需要偏平化的数组
 * @param { deepth } [ number ] 深度
 * @returns [array]
 */

export default function flattener(array, deepth = 1) {
  if (!Array.isArray(array)) {
    console.error("[array] is not array");
    return array;
  }
  let arr = [];
  for (let n = 0; n < array.length; n++) {
    if (deepth > 1) {
      if (!Array.isArray(array[n])) {
        arr.push(array[n]);
      } else {
        arr.push(...flattener(array[n], --deepth));
      }
    } else {
      arr.push(array[n]);
    }
  }
  return arr;
}

//console.log(flatten([1, 2, [3]]));
