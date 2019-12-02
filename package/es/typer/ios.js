/**
 * @name  判断客户端是否是ios
 * @return  [boolean]
 */

export default function ios() {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //安卓手机
    // return "Android";
    return false;
  } else if (u.indexOf("iPhone") > -1) {
    //苹果手机
    // return "iPhone";
    return true;
  } else if (u.indexOf("iPad") > -1) {
    //iPad
    // return "iPad";
    return false;
  } else if (u.indexOf("Windows Phone") > -1) {
    //winphone手机
    // return "Windows Phone";
    return false;
  } else {
    return false;
  }
}
