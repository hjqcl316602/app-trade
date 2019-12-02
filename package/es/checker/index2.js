/*
 * @Descripttion: 表单数据验证
 * @version:0.0.1
 * @Author: huangjunquan
 * @Date: 2019-06-12 11:17:47
 * @LastEditors: huangjunquan
 * @LastEditTime: 2019-06-13 11:01:52
 * @msg : 首先会判断是否是必填项； 是，则先判断是否有值，再进行后续的验证判断；否，先判断是否有值，无，则跳过该数据的后续验证，有，则继续后续验证、
 * @msg : 暂时
 */
import regex from "../regex";

export default function Check(data) {
  this.data = data;
  this.pass = true;
  this.message = "";
  this.check = function check() {
    for (let n = 0; n < this.data.length; n++) {
      let value = this.data[n]["value"];
      let rules = this.data[n]["rules"];
      let msg = this.data[n]["message"];
      let require = this.data[n]["require"];

      this.pass = require ? isRequire(value) : true;
      this.message = !this.pass ? msg : "";

      if ((require && this.pass) || (!require && isRequire(value))) {
        for (let k = 0; k < rules.length; k++) {
          let rule = rules[k]["rule"];

          let message = rules[k]["message"];

          let isString = isType(rule)("string");
          let isFunction = isType(rule)("function");

          if (isString || isFunction) {
            if (isString) {
              let isLen = startWith(rule, "len");
              let isRegex = startWith(rule, "regex");
              if (isLen || isRegex) {
                if (isLen) {
                  this.pass = getLenRegex(rule).test(value);
                }
                if (isRegex) {
                  let findRegex = regex.find(
                    ele => ele.type === rule.split(":")[1]
                  );
                  if (findRegex) {
                    this.pass = findRegex["value"].test(value);
                  }
                }
              } else {
                this.pass = false;
              }
            }
            if (isFunction) {
              this.pass = rule.call(this, value, regex);
            }
          } else {
            this.pass = false;
          }

          if (this.pass) {
            this.message = "";
          } else {
            this.message = message;
            return this;
          }
        }
      }
    }
    return this;
  };
}

// let data = [
//   {
//     value: '13980464237',
//     require: true,
//     message: '电话号码不能为空！',
//     rules: [
//       { message: '电话号码格式验证失败！', rule: 'regex:mobile' }
//     ]
//   },
//   {
//     value: '黄军泉',
//     require: false,
//     rules: [
//       { message: '姓名的长度不能超过5位', type : 1, rule: 'len:max|5' },
//       { message: '姓名的长度不能少于2位', type : 2, rule: 'len:min|4' },
//       { message: '必须是中文字符组成', type : 1, rule: 'regex:chinese' },
//       { message: "必须是以'黄'开头", type : 1, rule: function(value){ return value.startsWith('黄')} },
//     ]
//   }
// ]
// let check = new Check(data)
// check.check()
// console.log(check.message, check.pass)

/***
 * 验证是否有值
 */

function isRequire(str) {
  /**
   * 任意字符正则 - [\s\S] | [\d\D] | [\w\W] 均可以
   */
  return String(str) === str && /^[\s\S]+$/.test(str);
}

/**
 * 判断字符串是否以指定字符串开头
 * @param {str} 验证的字符串
 * @param {prex} 自定字符串
 */

function startWith(str, prex) {
  return (
    String(str) === str &&
    String(prex) === prex &&
    str.slice(0, prex.length) === prex
  );
}

/**
 * 获取数据的类型
 *
 * @param {value} 数据
 *
 * isType('')('string','boolean') => true
 *
 */
function isType(value) {
  let type = Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
  return function findType(...args) {
    return args.findIndex(arg => arg === type) > -1;
  };
}

/***
 * 获取len相关的regex
 */

function getLenRegex(string) {
  let stringSplit = string.split("|");
  let type = stringSplit[0];
  let params = stringSplit[1].split(":");
  let len1 = params[0];
  let len2 = params[1];
  let regex = null;
  switch (type) {
    case "len:len":
      regex = new RegExp(`^[\\s\\S]{${len1}}$`);
      break;
    case "len:min":
      regex = new RegExp(`^[\\s\\S]{${len1},}$`);
      break;
    case "len:max":
      regex = new RegExp(`^[\\s\\S]{0,${len1}}$`);
      break;
    case "len:range":
      regex = new RegExp(`^[\\s\\S]{${len1},${len2}}$`);
      break;
    default:
      regex = null;
  }
  return regex;
}
