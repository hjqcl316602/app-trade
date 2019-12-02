/*
 * @Descripttion:字符串的转码
 * @version:
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-07-17 15:35:19
 */

export default function Hexer() {}
/**
 * @name 16进制编码
 * @msg 不支持中文编码，以及中文相关的标点符号等，适合单纯的数字和英文字母组成的字符串
 * @param { string } [ string ]
 * @return [ string ]
 */
Hexer.prototype.escape = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The argument must be string.');
  }
  var hexCharCode = [];
  hexCharCode.push('0x');
  for (var i = 0; i < string.length; i++) {
    hexCharCode.push(string.charCodeAt(i).toString(16));
  }
  return hexCharCode.join('');
};

/**
 * @name 16进制解码
 * @msg 必须要要使用encode编码的字符串才能进行解
 * @param { string } [ string ] 16进制编码字符串
 * @return [ string ]
 */

Hexer.prototype.unescape = function(hexCharCodeStr) {
  if (typeof hexCharCodeStr !== 'string') {
    throw new Error('The argument must be string.');
  }
  var trimedStr = hexCharCodeStr.trim();
  var rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
  var len = rawStr.length;
  if (len % 2 !== 0) {
    alert('Illegal Format ASCII Code!');
    return '';
  }
  var curCharCode;
  var resultStr = [];
  for (var i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join('');
};

/**
 * @name 字符串转16进制
 * @msg 该方式是通过将每个字符串转成对应的16进制，并以指定的连接符连接
 * 支持任何字符串
 * @param { string } [ string ]
 * @param { concat = ',' } [ string ]
 * @return [ string ]
 */
Hexer.prototype.encodeURI = function(string, concat = ',') {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  if (typeof concat !== 'string') {
    throw new Error('The second argument must be string.');
  }
  var val = '';
  for (var i = 0; i < string.length; i++) {
    if (val == '') val = string.charCodeAt(i).toString(16);
    else val += concat + string.charCodeAt(i).toString(16);
  }
  return val;
};

/**
 * @name 字符串转16进制
 * @msg  必须要使用encodeURI编码的字符串
 * @param { string } [ string ]
 * @param { concat = ',' } [ string ]
 * @return [ string ]
 */

Hexer.prototype.decodeURI = function(string, concat = ',') {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  if (typeof concat !== 'string') {
    throw new Error('The second argument must be string.');
  }
  var val = '';
  var arr = string.split(concat);
  for (var i = 0; i < arr.length; i++) {
    val += String.fromCharCode(parseInt(arr[i], 16));
  }
  return val;
};

/**
 * @name 16进制转字符串
 * @param { string }
 * @return [ string]
 */
Hexer.prototype.decodeComponent = function(string) {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  var buf = [];
  for (var i = 0; i < string.length; i += 2) {
    let code = string.substring(i, i + 2);
    buf.push(parseInt(string.substring(i, i + 2), 16));
  }
  return this.readUTF(buf);
};

/**
 * @name 中文编码处理
 * @param { arr }
 * @return [ string ]
 */
Hexer.prototype.readUTF = function(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('The argument must be array.');
  }
  var UTF = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);

    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);

      for (var st = 1; st < bytesLength; st++) {
        //console.log(_arr[st + i], _arr[st + i].toString(2), _arr[st + i].toString(2).slice(2));
        store += _arr[st + i].toString(2).slice(2);
      }

      UTF += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
      //console.log(_arr[i], i, one, v, bytesLength, store, UTF);
    } else {
      UTF += String.fromCharCode(_arr[i]);
    }
  }
  return UTF;
};
