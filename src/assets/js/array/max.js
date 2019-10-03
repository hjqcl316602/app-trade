
/**
 * 得到数组的最大值
 * @param {*} arr 
 */

export default function max(arr){
  var max = arr[0];
  var len = arr.length;
  for ( var i = 1; i < len; i++){
    if (arr [i] > max) {
      max = arr[i];
    }
  }
  return max;
}
 