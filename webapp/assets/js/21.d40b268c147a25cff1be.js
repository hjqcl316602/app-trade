webpackJsonp([21],{"2lFy":function(t,e){},ovyI:function(t,e){},p7kG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={components:{},data:()=>({activename:"1-1",opennames:["1"],routeArr:{"/uc/safe":"1-1","/uc/account":"1-2","/uc/account/manage":"1-2","/uc/apiset":"1-3","/uc/helper":"1-4","/uc/team":"1-5","/uc/money":"2-1","/uc/record":"2-2","/uc/recharge":"2-3","/uc/withdraw":"2-4","/uc/trade":"2-5","/uc/paydividends":"2-6","/uc/blc":"2-7","/uc/bjc":"2-8","/uc/entrust/current":"3-1","/uc/entrust/history":"3-2","/uc/ad":"4-1","/uc/order":"4-2","/uc/order/withdraw":"4-3","/uc/order/recharge":"4-4","/uc/order/recharge-withdraw":"4-5","/uc/order/custom":"4-6","/uc/withdraw/address":"2-4","/uc/ad/create":"4-3","/uc/ad/update":"4-4","/uc/ad/createCoin":"4-1","/uc/ad/updateCoin":"4-6","/uc/financeRecharge":"5-1","/uc/financeWithdraw":"5-2"}}),computed:{member:function(){return this.$store.getters.member}},created:function(){this.init();const t=this.$route.path;this.heightLightMenu(t)},methods:{init(){this.$store.state.HeaderActiveName="1-6",localStorage.TOKEN&&localStorage.MEMBER||(this.$Message.success(this.$t("common.logintip")),this.$router.push("/login"))},sss(t){let e=1;t.length>=1&&(e=t[t.length-1],this.opennames=[e],this.activename=e+"-1",this.link(this.activename))},link(t){switch(t){case"1-1":this.$router.push("/uc/safe");break;case"2-1":this.$router.push("/uc/money");break;case"3-1":this.$router.push("/uc/entrust/current");break;case"4-1":this.$router.push("/uc/ad");break;case"5-1":this.$router.push("/uc/financeRecharge");break;default:this.$router.push("/uc/safe")}},heightLightMenu(t){let e=this.routeArr[t]||"1-1",a=e.split("-")[0];this.opennames=[a],this.activename=e,this.$nextTick(function(){this.$refs.test.updateOpened(),this.$refs.test.updateActiveName()})}},watch:{$route(t,e){this.heightLightMenu(t.path)}},mounted:function(){this.$nextTick(function(){this.$refs.test.updateOpened(),this.$refs.test.updateActiveName()})}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mymsg_wrapper"},[a("div",{staticClass:"vui-padding--large"},[a("div",{staticClass:"wrapper"},[a("Menu",{ref:"test",attrs:{"active-name":t.activename,"open-names":t.opennames,accordion:!0},on:{"on-open-change":t.sss}},[a("div",{staticClass:"title"},[t._v("个人中心")]),t._v(" "),a("Submenu",{attrs:{name:"1"}},[a("template",{slot:"title"},[a("span",{staticClass:"isclick"}),t._v(" "),a("span",{staticClass:"content"},[t._v("账户管理")])]),t._v(" "),a("MenuItem",{attrs:{name:"1-1"}},[a("router-link",{attrs:{to:"/uc/safe"}},[t._v("安全设置")])],1),t._v(" "),a("MenuItem",{attrs:{name:"1-2"}},[a("router-link",{attrs:{to:"/uc/account"}},[t._v("账户设置")])],1),t._v(" "),a("MenuItem",{attrs:{name:"1-3"}},[a("router-link",{attrs:{to:"/uc/apiset"}},[t._v("API设置")])],1),t._v(" "),0===t.member.channelFlag?[a("MenuItem",{attrs:{name:"1-4"}},[a("router-link",{attrs:{to:"/uc/helper"}},[t._v("收款助手")])],1),t._v(" "),a("MenuItem",{attrs:{name:"1-5"}},[a("router-link",{attrs:{to:"/uc/team"}},[t._v("推广")])],1)]:t._e()],2),t._v(" "),a("Submenu",{attrs:{name:"2"}},[a("template",{slot:"title"},[a("span",{staticClass:"isclick"}),t._v(" "),a("span",{staticClass:"content"},[t._v("资产管理")])]),t._v(" "),a("MenuItem",{attrs:{name:"2-1"}},[a("router-link",{attrs:{to:"/uc/money"}},[t._v("个人资产")])],1),t._v(" "),a("MenuItem",{attrs:{name:"2-2"}},[a("router-link",{attrs:{to:"/uc/record"}},[t._v("资产流水")])],1),t._v(" "),a("MenuItem",{attrs:{name:"2-3"}},[a("router-link",{attrs:{to:"/uc/recharge"}},[t._v("充币")])],1),t._v(" "),a("MenuItem",{attrs:{name:"2-4"}},[a("router-link",{attrs:{to:"/uc/withdraw"}},[t._v("提币")])],1)],2),t._v(" "),a("Submenu",{attrs:{name:"3"}},[a("template",{slot:"title"},[a("span",{staticClass:"isclick"}),t._v(" "),a("span",{staticClass:"content"},[t._v("币币管理")])]),t._v(" "),a("MenuItem",{attrs:{name:"3-1"}},[a("router-link",{attrs:{to:"/uc/entrust/current"}},[t._v("当前委托")])],1),t._v(" "),a("MenuItem",{attrs:{name:"3-2"}},[a("router-link",{attrs:{to:"/uc/entrust/history"}},[t._v("历史委托")])],1)],2),t._v(" "),a("Submenu",{attrs:{name:"4"}},[a("template",{slot:"title"},[a("span",{staticClass:"isclick"}),t._v(" "),a("span",{staticClass:"content"},[t._v("法币管理")])]),t._v(" "),0===t.member.channelFlag?[a("MenuItem",{attrs:{name:"4-1"}},[a("router-link",{attrs:{to:"/uc/ad"}},[t._v("我的广告")])],1)]:t._e(),t._v(" "),a("MenuItem",{attrs:{name:"4-2"}},[a("router-link",{attrs:{to:"/uc/order"}},[t._v("我的订单")])],1),t._v(" "),0===t.member.channelFlag?[a("MenuItem",{attrs:{name:"4-5"}},[a("router-link",{attrs:{to:"/uc/order/recharge-withdraw"}},[t._v("\n                未完成订单\n              ")])],1)]:t._e()],2),t._v(" "),a("Submenu",{attrs:{name:"5"}},[a("template",{slot:"title"},[a("span",{staticClass:"isclick"}),t._v(" "),a("span",{staticClass:"content"},[t._v("财务管理")])]),t._v(" "),a("MenuItem",{attrs:{name:"5-1"}},[a("router-link",{attrs:{to:"/uc/financeRecharge"}},[t._v("充值")])],1),t._v(" "),a("MenuItem",{attrs:{name:"5-2"}},[a("router-link",{attrs:{to:"/uc/financeWithdraw"}},[t._v("提现")])],1)],2)],1),t._v(" "),a("router-view")],1)])])},staticRenderFns:[]};var n=a("VU/8")(s,r,!1,function(t){a("ovyI"),a("2lFy")},"data-v-0d570f16",null);e.default=n.exports}});