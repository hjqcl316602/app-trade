export default {
  type: "chinese",
  rules: ["只能由中文汉字组成的非空字符串"],
  text: "是否是中文",
  success: ["一二三"],
  error: ["123456", "qazxsw"],
  value: /^[\u4E00-\u9FA5]+$/
};
