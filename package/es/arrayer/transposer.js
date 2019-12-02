import dimener from './dimener';

// 判断数组子元素的长度是否一致
let equalLen = function(arr) {
  return (
    arr.findIndex((element, index, array) => {
      return element.length !== array[0].length;
    }) > -1
  );
};
/**
 * @name 数组置换
 * @param {array} [array] 需要置换的数组
 * @msg 目标数组必须是二维数组，并且每一个元素的长度一致
 * @return  [array]
 */

export default function transposer(array) {
  // 判断是否是数组
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array.');
  }
  // 判断是否是二维数组，以及子元素的长度是否一致
  if (!dimener(array) || equalLen(array)) {
    throw new Error("The argument must be dimener array,and it's item length must be equal.");
  }
  let resArr = [];
  for (let k = 0; k < array[0].length; k++) {
    resArr.push([]);
  }
  for (let n = 0; n < array.length; n++) {
    for (let k = 0; k < array[n].length; k++) {
      resArr[k][n] = array[n][k];
    }
  }
  return resArr;
}

//console.log(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
