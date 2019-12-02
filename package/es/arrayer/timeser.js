/**
 * @name 数组中元素出现的次数信息统计
 * @msg 不支持对象类型[ objecy,array ]统计，支持NaN
 * @param { array = [] } [ array ]
 * @return: [ array<object> ]
 */
import sorter from './sorter';
export default function timeser(array = []) {
  if (!Array.isArray(array)) {
    throw new Error('The first argument must be array.');
  }
  let ret = [];
  for (let n = 0; n < array.length; n++) {
    let element = array[n];
    let index = ret.findIndex(item => {
      let nan = Number.isNaN(item['value']) && Number.isNaN(element);
      return item['value'] === element || nan;
    });
    if (index === -1) {
      ret.push({
        value: element,
        times: 1,
        indexs: [n]
      });
    } else {
      ret[index]['times'] += 1;
      ret[index]['indexs'].push(n);
    }
  }
  return ret;
}

/**
 * @name 判断数组中出现最多次数的值
 * @param { array = [] } [ array ]
 * @return:[ array<object>]
 */
timeser.maxer = function(array = []) {
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array.');
  }
  let ret = times(array);
  let sortRet = sorter.quicker.with(ret, function(prev, next) {
    return prev.times > next.times;
  });
  return sortRet.filter(function(item, index, target) {
    return item['times'] === target[0]['times'];
  });
};

/**
 * @name 判断数组中出现最少次数的值
 * @param { array = [] } [ array ]
 * @return:[ array<object> ]
 */
timeser.miner = function(array = []) {
  if (!Array.isArray(array)) {
    throw new Error('The argument must be array.');
  }
  let ret = times(array);
  let sortRet = sorter.quicker.with(ret, function(prev, next) {
    return prev.times < next.times;
  });
  return sortRet.filter(function(item, index, target) {
    return item['times'] === target[0]['times'];
  });
};
