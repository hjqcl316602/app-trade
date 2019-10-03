/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-09-02 17:01:33
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const origin = window.location.origin; // 域名地址
const localSign = ['localhost', '192.168', 'file://']; // 开发环境的标志
const isLocal = localSign.findIndex(item => origin.indexOf(item) > -1) > -1; // 验证是否是本地
const originTest = 'http://trade.bstchain.com';
export default new Vuex.Store({
  state: {
    basis: {
      origin,
      isLocal,
      originTest
    },
    member: null,
    activeNav: '',
    lang: '',
    exchangeSkin: 'day'
  },
  mutations: {
    navigate(state, nav) {
      state.activeNav = nav;
    },
    setMember(state, member) {
      state.member = member;
      localStorage.setItem('MEMBER', JSON.stringify(member));
    },
    recoveryMember(state) {
      state.member = JSON.parse(localStorage.getItem('MEMBER'));
    },
    setlang(state, lang) {
      state.lang = lang;
      localStorage.setItem('LANGUAGE', JSON.stringify(lang));
    },
    initLang(state) {
      if (localStorage.getItem('LANGUAGE') == null) {
        state.lang = '简体中文';
      } else {
        state.lang = JSON.parse(localStorage.getItem('LANGUAGE'));
      }
    },
    setSkin(state, skin) {
      state.exchangeSkin = skin;
    }
  },
  getters: {
    member(state) {
      return state.member;
    },
    isLogin(state) {
      return state.member != null;
    },
    lang(state) {
      return state.lang;
    }
  }
});
