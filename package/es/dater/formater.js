import checker from "./checker";
/**
 * @name 时间格式化
 * @param {date} [date] 需要格式化的时间
 * @param {fmt} [ string ] 格式化规则 yyyy-MM-dd HH:mm:ss
 * @example console.log(formater(new Date(), "yyyy-MM-dd HH:mm:ss ")); => 2019-06-28 18:19:16
 */
let formater = function(date, fmt) {
  let checkDate = new Date(date);
  if (!checker(date)) throw new Error("The first argument must be a valid date.");
  if (typeof fmt !== "string") throw new Error("The second argument must be string.");
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
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  return fmt;
};

export default formater;
//console.log(formater("new Date()", "yyyy-MM-dd HH:mm:ss "));
