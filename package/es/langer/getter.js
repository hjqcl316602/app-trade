/**
 * @name 按指定的路径获取值
 * @msg
 * 若未取值则返回默认
 * 取到的值若对象类型，则与目标对象之间存在引用关系的
 * @param { object } [ any ] 取值对象
 * @param { path = []} [ array ] 路径
 * @param { defaults } [ any ] 默认值
 * @return [ any ]
 * @example
 * getter({ a: { b: { c: { d: { e: { f: { g: true } } } } } } }, ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 0) => true
 */
export default function getter(object, path = [], defaults) {
  if (!Array.isArray(path)) throw new Error('The second argument must be array');
  let res = object;
  try {
    for (let n = 0; n < path.length; n++) {
      res = res[path[n]];
    }
    return res || defaults;
  } catch (e) {
    return defaults;
  }
}

//console.log(getter({ a: { b: { c: { d: { e: { f: { g: true } } } } } } }, ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 0));
