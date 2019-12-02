/**
 * @name 验证一个数据是否是对象
 * @param { object } [ any ]
 * @return [ boolean ]
 * @example checker({})=> true
 */

export default function checker(object) {
  return (
    Object.prototype.toString
      .call(object)
      .slice(8, -1)
      .toLowerCase() === 'object'
  );
}

/**
 * @name 验证一个对象地方是空对象
 * @msg 没有自身属性
 * @param { object } [ object ]
 * @return [ boolean ]
 * @example checker.emptyer({}) => true
 */
checker.emptyer = function(object) {
  if (!checker(object)) {
    throw new Error('The argument must be object.');
  }
  return Object.keys(object).length === 0;
};

//console.log(checker.emptyer({}));

/**
 * @name 验证一个数据是否是纯对象
 * @msg 该对象是通过 {} 和 new Object()方式创建
 * @msg Object.getPrototypeOf 不能获取 [ undefined,null ]的原型，所以使用了try catch
 * @param { object } [ any ]
 * @return [ boolean ]
 * @example checker.plainer({}) => true
 * @example checker.plainer(new Object()) => true
 * @example checker.plainer("") => false
 */
checker.plainer = function(object) {
  try {
    let proto = object;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    //console.log(Object.getPrototypeOf(null));
    return Object.getPrototypeOf(object) === proto; // 指向同一个object原型对象
  } catch (error) {
    return false;
  }
};
/**
 * @name 验证一个数据是否是纯对象或没有原型的对象，即常用的业务对象
 * @msg 该对象是通过 {} 、new Object()、Object.create(null)方式创建的
 * @param { object } [ any ]
 * @return [ boolean ]
 * @example
 * checker.freer(Object.create(null)) => true
 * checker.freer({}) => true
 * checker.freer(new Object()) => true
 */
checker.freer = function(object) {
  //当object是undefined，null 会报错： Cannot convert undefined or null to object
  if (object == null) return false;
  return Object.getPrototypeOf(object) === null || Object.getPrototypeOf(Object.getPrototypeOf(object)) === null;
};
// let Person = function(name) {
//   this.name = name;
// };
// Person.prototype.getName = function() {
//   return this.name;
// };
// let o = Object.create(null);
// console.log(o);
//console.log(checker.freer(null));
