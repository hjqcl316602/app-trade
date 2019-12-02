/**
 * @name  数组乱序
 * @msg 使用fisher-tayes算法，目前最好的乱序方式，使得每个元素参与的概率一致
 * @param  { array }  [ array ] 数组
 * @return [ array ]
 */
export default function shuffler(array) {
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array.');
  }
  var m = array.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [array[m], array[index]] = [array[index], array[m]];
  }
  return array;
}

/**
 * @name 数组乱序
 * @msg 该方式乱序不完全，由于每个元素参与的次数不一致
 * @param { array }
 * @return:[ array ]
 */

shuffler.sorter = function(array) {
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array.');
  }
  return array.sort(function(a, b) {
    return Math.random() - 0.5;
  });
};

// console.log(
//   shuffle.sort([1, { name: "" }, 3, { name: "好几十" }, 5, 6, 7, 8, 9, 0])
// );
