import { Base64 } from "js-base64";

export default function Cookie() {
  /**
   * 设置cookie
   *
   * key [string] cookie字段名
   * value [any] 任意的值
   * expires [number] 过期时间
   */
  this.setItem = function(key, value, expires) {
    expires =
      Number(expires) === expires && expires > 0
        ? expires
        : 7 * 24 * 60 * 60 * 1000;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({ status: this.set(key, value, expires) });
        } catch (e) {
          reject({ msg: e });
        }
      }, 0);
    });
  };

  /**
   * 获取cookie
   *
   * key [string] cookie字段名
   * value [any] 任意的值
   * expires [number] 过期时间
   */

  this.getItem = function(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.get(key));
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  };

  /**
   * 获取全部的cookies
   */

  this.getItems = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let cookie = document.cookie;
          let cookieSplit = cookie.split("; ");
          let obj = {};
          for (let n = 0; n < cookieSplit.length; n++) {
            let keyAndValue = cookieSplit[n].split("=");
            let key = keyAndValue[0];
            let value = this.get(key);
            obj[key] = value;
          }
          resolve(obj);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  };

  /**
   * 移除指定字段的cookie
   */

  this.removeItem = function(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let value = this.get(key);
          let res = this.set(key, value, -1000);
          resolve({ status: res });
        } catch (e) {
          reject({ msg: e });
        }
      }, 0);
    });
  };

  /**
   * 清除所有的cookie
   */

  this.clear = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let cookie = document.cookie;
          let cookieSplit = cookie.split("; ");
          let obj = [];
          for (let n = 0; n < cookieSplit.length; n++) {
            let keyAndValue = cookieSplit[n].split("=");
            let key = keyAndValue[0];
            let value = this.get(key);
            obj.push(this.set(key, value, -1000));
          }
          // 判断是否全部清除
          let isStatus = obj.every(item => !!item);
          resolve({ status: isStatus });
        } catch (e) {
          reject({ msg: e });
        }
      }, 0);
    });
  };

  this.get = function(key) {
    if (String(key) !== key || !key.trim()) return undefined;
    let cookie = document.cookie;
    let cookieSplit = cookie.split("; ");
    for (let n = 0; n < cookieSplit.length; n++) {
      let item = cookieSplit[n].split("=");
      let itemKey = item[0];
      let itemValue = item[1];
      if (itemKey === key) {
        let decode = Base64.decode(itemValue);
        return decode ? JSON.parse(decode)["value"] : undefined;
      }
    }
    return undefined;
  };

  this.set = function(key, value, expires) {
    if (String(key) !== key || !key.trim()) return false;

    let valuePack = Base64.encode(JSON.stringify({ value: value }));

    let date = new Date();
    date.setTime(date.getTime() + expires);
    let timeString = date.toGMTString();
    let cookie = `${key}=${valuePack};expires=${timeString}`;
    document.cookie = cookie;
    return true;
  };
}

//let cookie = new Cookie()

// cookie.setItem('name3',undefined, 50 * 1000).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// cookie.removeItem('name').then(res=>{
//   console.log('remove-name2',res)
// })

// cookie.getItem('name2').then(res => {
//   console.log('name2', res)
// }).catch(err => {
//   console.log(err)
// })

// cookie.getItems().then(res => {
//   console.log(  res)
// }).catch(err => {
//   console.log(err)
// })

// cookie.clear().then(res=>{
//   console.log('clear',res)
// })
