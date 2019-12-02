let checker = function(date) {
  return new Date(date).toString() !== "Invalid Date";
};

let formater = function(date, fmt) {
  let checkDate = new Date(date);
  if (!checker(date))
    throw new Error("The first argument must be a valid date.");
  if (typeof fmt !== "string")
    throw new Error("The second argument must be string.");
  date = checkDate;
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

let setStore = function(key, value) {
  if (typeof key !== "string") {
    throw new Error("The first argument must be string.");
  }
  try {
    let result = {};
    result.time = formater(new Date(), "yyyy-MM-dd HH:mm:ss");
    result.path = window.location.href;
    result.type = Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase();
    result.value = value;
    localStorage.setItem(key, JSON.stringify(result));
  } catch (e) {
    throw new Error("This handler is fail.");
  }
};

let getStore = function(key) {
  if (typeof key !== "string") {
    throw new Error("The first argument must be string.");
  }
  try {
    let storage = localStorage.getItem(key);
    storage = storage ? JSON.parse(storage) : {};
    return storage.value;
  } catch (e) {
    throw new Error("This handler is fail.");
  }
};

let removeStore = function(key) {
  if (typeof key !== "string") {
    throw new Error("The first argument must be string.");
  }
  try {
    let storage = localStorage.removeItem(key);
  } catch (e) {
    throw new Error("This handler is fail.");
  }
};

let clearStore = function() {
  try {
    let storage = localStorage.clear();
  } catch (e) {
    throw new Error("This handler is fail.");
  }
};

export default { setStore, getStore, removeStore, clearStore };

/*
 * @Descripttion: 本地存储
 * @version: 0.0.1
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-07-17 15:16:52
 * @msg:暂时只能存储的数据类型 string boolean number null  object array  not function symbol undefined
 */
/**
 * @name 本地存储
 * @param :  { isLocal } [ boolean ] 是否是本地永久存储
 */

// export default function Storager(isLocal = true) {
//   if (typeof isLocal !== "boolean") {
//     throw new Error("The argument must be boolean.");
//   }
//   this.isLocal = typeof isLocal === "boolean" ? isLocal : true;
//   this.storage = window[`${this.isLocal ? "local" : "session"}Storage`];
// }
/**
 * @name 获取存储信息
 * @param  { key } [ string ] 关键字
 * @return [ promise ]
 */
// Storager.prototype.getter = function(key) {
//   if (typeof key !== 'string') {
//     throw new Error('The argument must be string.');
//   }
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         let store = this.storage.getItem(key);
//         let storeFormat = store ? JSON.parse(store) : undefined;
//         resolve(storeFormat && storeFormat['value']);
//       } catch (e) {
//         reject(e);
//       }
//     }, 0);
//   });
// };

/**
 * @name 存储信息
 * @param  { key }
 * @param  { value }
 * @return [ promise ]
 */

// Storager.prototype.setter = function(key, value) {
//   if (typeof key !== 'string') {
//     throw new Error('The first argument must be string.');
//   }
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         let result = {};
//         result.time = formater(new Date(), 'yyyy-MM-dd HH:mm:ss');
//         result.path = window.location.href;
//         result.type = Object.prototype.toString
//           .call(value)
//           .slice(8, -1)
//           .toLowerCase();
//         result.value = value;
//         this.storage.setItem(key, JSON.stringify(result));
//         resolve(value);
//       } catch (e) {
//         reject(e);
//       }
//     }, 0);
//   });
// };

/**
 * @name  移除指定关键字存储信息
 * @param  { key } [ string ]
 * @return [ promise ]
 */

// Storager.prototype.remover = function(key) {
//   if (typeof key !== 'string') {
//     throw new Error('The first argument must be string.');
//   }
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         this.storage.removeItem(key);
//         resolve(this);
//       } catch (e) {
//         reject(e);
//       }
//     }, 0);
//   });
// };

/**
 * @name  清除存储信息
 */

// Storager.prototype.clear = function() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         this.storage.clear();
//         resolve(this);
//       } catch (e) {
//         reject(e);
//       }
//     }, 0);
//   });
// };

// // test
// let storage = new Storager(true);

// storage.setter('message', { name: 'web-app' });
// storage.getter('message').then(res => {
//   console.log(res);
// });
// storage.clear();
