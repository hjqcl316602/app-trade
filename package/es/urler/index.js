/*
 * @Descripttion:
 * @version:
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-07-17 15:37:04
 */
/**
 * @name 编码和解码
 * @msg 通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。
 * 而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参 数）应当是最常用的，它可以将参数中的中文、特殊字符进行转义，而不会影响整个URL。
 */
export default function Urler() {}
/**
 * @name 字符串编码
 * @msg 该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。其他所有的字符都会被转义序列替换。
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.escape = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return escape(string);
};
/**
 * @name 字符串解码
 * @msg 该方法和escape对应
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.unescape = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return unescape(string);
};
/**
 * @name 字符串编码
 * @msg  该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。 该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.encodeURI = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return encodeURI(string);
};
/**
 * @name 字符串解码
 * @msg 该方法和encodeURI对应
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.decodeURI = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return decodeURI(string);
};
/**
 * @name 字符串编码
 * @msg encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.encodeURIComponent = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return encodeURIComponent(string);
};
/**
 * @name 字符串解码
 * @msg 该方法和encodeURIComponent对应
 * @param { string } [ string ]
 * @return [ string ]
 */
Urler.prototype.decodeURIComponent = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  return decodeURIComponent(string);
};

// let urler = new Urler();
// console.log(urler.encodeURIComponent('http://dhsjhdjshdjhsjhd?name=黄军泉'));
