/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-22 13:45:52
 * @LastEditTime: 2019-09-05 12:07:55
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import routes from "./config/routes2.js";
import store from "./config/store.js";
import VueRouter from "vue-router";
import VueQriously from "vue-qriously";
import vueResource from "vue-resource";
import VueI18n from "vue-i18n";
import iView from "iview";
import "iview/dist/styles/iview.css";
import util from "./assets/js/util.js"; //乘除方法
import "./assets/css/index.less"; // store-css-basis，以及一些ivew的重置和添加
import App from "./App"; // 必须要放在css的引用之后，否则页面样式有些不生效

/**********************************************配置***************************************************/
import "./config/mixins.methods";
import "./config/prototype";
import "./config/filters";
import "./config/directive";

Vue.use(iView);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueI18n);
Vue.use(VueQriously);

/**********************************************路由***************************************************/
const router = new VueRouter({
  mode: "hash",
  routes
});

/**
 * 页面切换的时候，让其页面滚动到顶部
 */
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

const i18n = new VueI18n({
  locale: "zh", // 语言标识
  messages: {
    zh: require("./assets/lang/zh.js"),
    en: require("./assets/lang/en.js")
  }
});
/**********************************************axios***************************************************/

Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.timeout = 0;
Vue.http.options.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "Content-Type": "application/json;charset=utf-8"
};

Vue.http.interceptors.push((request, next) => {
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  request.headers.set("x-auth-token", localStorage.getItem("TOKEN"));
  next(response => {
    //登录极验证时需获取后台返回的TOKEN值
    var xAuthToken = response.headers.get("x-auth-token");
    if (xAuthToken != null && xAuthToken != "") {
      localStorage.setItem("TOKEN", xAuthToken);
    }

    if (response.body.code == "4000" || response.body.code == "3000") {
      store.commit("setMember", null);
      router.push("/login");
      return false;
    }
    return response;
  });
});

// 解决打包后 取消日志打印
Vue.config.productionTip = true;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  template: "<App/>",
  components: { App },
  created() {
    // 全局配置提示弹出框
    this.$Notice.config({
      top: 85
    });
  }
});
