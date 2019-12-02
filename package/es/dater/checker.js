/**
 * @name 验证一个数据是否是合法的时间格式
 * @param { date } [ any ]
 * @msg 当 date 是 null true 1 等值时，可以得到合法的时间
 * @return [ boolean ]
 * @example  console.log(checker(new Date())); // => true
 */
let checker = function(date) {
  return new Date(date).toString() !== "Invalid Date";
};

export default checker;

//console.log(checker(new Date())); // => true
