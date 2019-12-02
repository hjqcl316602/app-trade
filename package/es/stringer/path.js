/**
 * @name  将字符串转成合法的对象的键
 * @msg
 * a.b.c形式，获取对象属性的时候用'.'，获取数组的时候可以使用'.0'，也可以使用a[0],
 * []只能是数组的角标0-9组成的字符串，并且 [] 中不能再存在 []
 * 不能以'.'开头，且不能有连续的'.'
 * 对象的属性名需要满足js变量命名规则
 *
 * JS标识符的命名规则，即变量的命名规则：
 * 标识符只能由字母、数字、下划线和‘$’组成
 * 数字不可以作为标识符的首字符
 *
 * 对象属性的命名规则
 * 通过[]操作符为对象添加属性时，属性名称可以是任何字符串（包括只包含空格的字符串和空字符串）；
 * 通过.操作符为对象添加属性时，属性名称必须是合法的标识符名称；
 * 如果属性名包含非法的标识符字符，则只能采用obj[“propertyName”]的形式；
 * 如果属性名是合法的标识符，读取时即可以采用obj.propertyName,也可以采用obj[“propertyName”]的形式；
 *
 * @param  { string } [ string ]
 * @return  [ array ]
 * @example path(".a[a].b[0.s..s].c[c].....") => ['a','0','b','0','c','c']
 */
export default function path(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }

  let regex = new RegExp(/\[(.*?)\]/, "g"); // '.'匹配除换行符外的任意字符

  string = string.replace(regex, function(regex, match, index, string) {
    return "." + match;
  });

  return string.split(".").filter(item => !!item);
}

// let string = ".a[a].b[0.s..s].c[c]....."; // => ['a','0','b','0',c','c']

// let arr = toPath(".a[a].b[0.s..s].c[c].....");
// console.log(arr);
