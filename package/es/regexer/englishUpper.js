export default {
  type: "english-upper",
  rules: ["只能由'A-Z'组成的非空字符串"],
  text: "是否是大写英文",
  success: ["QAZWSX"],
  error: ["qazwsx"],
  value: /^[A-Z]+$/
};
