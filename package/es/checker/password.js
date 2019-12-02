/**
 * @description 校验密码的强度
 *
 * @param { string } string
 *
 * @returns [boolean]
 *
 * @needs
 * 长度应不少于8位 /^[\S\s]{8,}$/
 * 包含数字、小写字母、大写字母、特殊字符（_$@），其中至少包含 3 种字符
 */

export default function isPass(str) {
  let regex = /^[\S\s]{8,}$/;
  let regex_2 = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])|(?=.*[0-9])(?=.*[a-z])(?=.*[_$@])|(?=.*[0-9])(?=.*[A-Z])(?=.*[_$@])|(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@])|(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@])/;

  return regex.test(str) && regex_2.test(str);
}
