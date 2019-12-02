export default {
  type: "english",
  rules: ["只能由'a-z'|'A-Z'组成的非空字符串"],
  text: "是否是英文",
  success: ["qazxsw", "QAZWSX", "qazWSX"],
  error: ["123456", "123qaz"],
  value: /^[a-zA-Z]+$/
};
