/*
 * @Descripttion:url 字符串处理
 * @version:0.0.1
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: huangjunquan
 * @LastEditTime: 2019-06-24 10:57:12
 * @msg:对象转字符串，字符串转对象后，数字和布尔均会变成字符串
 */

const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = c => "%" + c.charCodeAt(0).toString(16);
const commaRE = /%2C/g;

export default function Query() {}

/**
 * @name 编码
 * @param  { string } [ string ]
 * @return [ string ]
 */

Query.prototype.encode = function(string) {
  return encodeURIComponent(string)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ",");
};

/**
 * @name 解码
 * @param  { string } [ string ]
 * @return [ string ]
 */

Query.prototype.decode = decodeURIComponent;

/**
 * @name 对象转字符串
 * @param  { obj } [ object ]
 * @return [ string ]
 */

Query.prototype.stringify = function stringify(obj) {
  const res = obj
    ? Object.keys(obj)
        .map(key => {
          const val = obj[key];

          if (val === undefined) {
            return "";
          }

          if (val === null) {
            return this.encode(key);
          }

          if (Array.isArray(val)) {
            const result = [];
            val.forEach(val2 => {
              if (val2 === undefined) {
                return;
              }
              if (val2 === null) {
                result.push(this.encode(key));
              } else {
                result.push(this.encode(key) + "=" + this.encode(val2));
              }
            });
            return result.join("&");
          }

          return this.encode(key) + "=" + this.encode(val);
        })
        .filter(x => x.length > 0)
        .join("&")
    : null;
  return res ? `?${res}` : "";
};

/**
 * @name 字符串转对象
 * @param  { query } [ string ]
 * @return [ object ]
 */

Query.prototype.parse = function parse(query) {
  if (String(query) !== query) return query;

  const res = {};

  query = query.trim().replace(/^(\?|#|&)/, "");

  if (!query) {
    return res;
  }

  query.split("&").forEach(param => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = this.decode(parts.shift());
    const val = parts.length > 0 ? this.decode(parts.join("=")) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
};

// let query = new Query();

// let stringify = query.stringify({
//   name: "黄军泉",
//   age: 100,
//   num: [12, 3, [5, [1, 2, 3], 3, 4]],
//   is: false
// });

// console.log(stringify);

// let parse = query.parse(stringify);
// console.log(parse);
