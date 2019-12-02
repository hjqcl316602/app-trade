/**
 * @name  数组排序
 * @msg 不支持对象类型元素,会改变原数组的顺序
 * @param { array } [ array ]
 * @param { isUp = true } [ boolean ] 是否是升序
 * @return  [ array ]
 */

export default function sorter(array = [], isUp = true) {
  if (!Array.isArray(array)) {
    throw new Error('The first argument must be array.');
  }
  if (typeof isUp !== 'boolean') {
    throw new Error('The second argument must be boolean.');
  }
  return array.sort((a, b) => {
    return isUp ? a - b : b - a;
  });
}

/**
 * @name 数组排序-快速
 * @msg 不支持对象元素
 * @param { array } [ array ]
 * @param { isUp = true } [ boolean ] 是否是升序
 * @return: [ array ]
 */

sorter.quicker = function(array = [], isUp = true) {
  if (!Array.isArray(array)) {
    throw new Error('The first argument must be array.');
  }
  if (typeof isUp !== 'boolean') {
    throw new Error('The second argument must be boolean.');
  }
  if (array.length === 0) {
    return array;
  }
  let mid = array[0];
  let left = [],
    right = [];
  for (let n = 1; n < array.length; n++) {
    let element = array[n];
    element < mid ? left.push(element) : right.push(element);
  }
  return sorter.quicker(left).concat([mid], sorter.quicker(right));
};

/**
 * @name 数组排序-快速
 * @msg 支持对象元素的排序
 * @param { array } [array]
 * @param { callback } [ function ] 通过指定的函数
 * @param { context } [ any ] 执行方法的执行上下文
 * @return:[ array ]
 */

sorter.quicker.with = function(array = [], callback = function() {}, context = this) {
  if (!Array.isArray(array)) {
    throw new Error('The first argument must be array.');
  }
  if (typeof callback !== 'function') {
    throw new Error('The second argument must be function.');
  }
  if (array.length === 0) {
    return array;
  }
  let mid = array[0];
  let left = [],
    right = [];
  for (let n = 1; n < array.length; n++) {
    let element = array[n];
    let res = callback.call(context, element, mid, array);
    res ? left.push(element) : right.push(element);
  }
  return sorter.quicker.with(left, callback, context).concat([mid], sorter.quicker.with(right, callback, context));
};

/**
 * @name 数组排序(冒泡)
 * @msg 所有排序中速度最慢的
 * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 * 针对所有的元素重复以上的步骤，除了最后一个。
 * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 冒泡排序总的平均时间复杂度为O(n^2)
 * @param {arr} [ array] 数组
 * @param { isUp = true } [ boolean] 是否是升序
 * @return [array]
 */
sorter.subbinger = function(array = [], isUp = true) {
  if (!Array.isArray(array)) {
    throw new Error('The first argument must be array.');
  }
  if (typeof isUp !== 'boolean') {
    throw new Error('The second argument must be boolean.');
  }
  let len = array.length;
  for (let n = 0; n < len - 1; n++) {
    for (let k = 0; k < len - n - 1; k++) {
      if ((isUp && array[k] > array[k + 1]) || (!isUp && array[k] < array[k + 1])) {
        [array[k], array[k + 1]] = [array[k + 1], array[k]];
      }
    }
  }
  return array;
};
