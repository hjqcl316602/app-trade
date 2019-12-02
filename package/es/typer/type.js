/**
 * @name  获取数据类型
 * @param   { value } [ any ]
 * @return  [ string ]
 * @example type('null') => string type(0) => number
 */

export default function type(value) {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
}

//console.log(type('null'))
