webpackJsonp([13],{C1pr:function(e,t){},QvC0:function(e,t){},WnK7:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={components:{},data:()=>({loading:!0,hasRealName:!1,usernameS:"",user:{username:"",email:!0,mobileNo:!1,idCard:!0},tableOrderSell:[],tableOrderBuy:[]}),created(){this.getAdv()},computed:{isLogin:function(){return this.$store.getters.isLogin},member:function(){return this.$store.getters.member},tableColumnsOrderSell(){let e=this,t=[];return t.push({title:this.$t("otc.checkuser.col_symbol"),key:"unit"}),t.push({title:this.$t("otc.checkuser.col_paymode"),key:"payMode"}),t.push({title:this.$t("otc.checkuser.col_num"),key:"remainAmount"}),t.push({title:this.$t("otc.checkuser.col_price")+"/BTC",key:"price",width:170,render:function(e,t){return e("div",[e("p",{attrs:{class:"price"}},t.row.price+"CNY"),e("p",{attrs:{class:"price2"}},t.row.minLimit+"-"+t.row.maxLimit+"CNY")])}}),t.push({title:this.$t("otc.checkuser.col_created"),key:"createTime",width:160}),t.push({title:this.$t("otc.checkuser.col_operate"),key:"buyBtn",render:function(t,s){return t("p",[t("a",{on:{click:function(){e.isLogin?e.member.realName?e.$router.push("/otc/tradeInfo?tradeId="+s.row.advertiseId):(e.$Message.error(e.$t("otc.checkuser.operatemsg")),setTimeout(()=>{e.$router.push("/uc/safe")},2e3)):e.$router.push("/login")}},style:{color:"#fff"}},[t("Button",{props:{type:"success",long:!0},style:{marginRight:"8px",width:"80%"}},e.$t("otc.checkuser.buyin"))])])}}),t},tableColumnsOrderBuy(){let e=this,t=[];return t.push({title:this.$t("otc.checkuser.col_symbol"),key:"unit"}),t.push({title:this.$t("otc.checkuser.col_paymode"),key:"payMode"}),t.push({title:this.$t("otc.checkuser.col_num"),key:"remainAmount"}),t.push({title:this.$t("otc.checkuser.col_price")+"/BTC",key:"price",width:170,render:function(e,t){return e("div",[e("p",{attrs:{class:"price"}},t.row.price+"CNY"),e("p",{attrs:{class:"price2"}},t.row.minLimit+"-"+t.row.maxLimit+"CNY")])}}),t.push({title:this.$t("otc.checkuser.col_created"),key:"createTime",width:160}),t.push({title:this.$t("otc.checkuser.col_operate"),key:"buyBtn",render:function(t,s){return t("p",[t("a",{on:{click:function(){e.isLogin?e.member.realName?e.$router.push("/otc/tradeInfo?tradeId="+s.row.advertiseId):(e.$Message.error(e.$t("otc.checkuser.operatemsg")),setTimeout(()=>{e.$router.push("/uc/safe")},2e3)):e.$router.push("/login")}},style:{color:"#fff"}},[t("Button",{props:{type:"error",long:!0},style:{marginRight:"8px",width:"80%"}},e.$t("otc.checkuser.sellout"))])])}}),t}},methods:{changePage(){},getAdv(){this.$http.post(this.host+"/otc/advertise/member",{name:this.$route.query.id}).then(e=>{var t=e.body;0==t.code?(this.loading=!1,this.tableOrderBuy=t.data.buy,this.tableOrderSell=t.data.sell,this.user=t.data,this.usernameS=(this.user.username+"").replace(/^\s+|\s+$/g,"").slice(0,1)):this.$Message.error(t.message)})},strpro(e){let t=e;var s=(e=e.slice(1)).replace(/[\D\d]*/g,function(e){for(var t="",s=0;s<e.length;s++)t+="*";return t});return t.slice(0,1)+s}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content-wrap",attrs:{id:"List"}},[s("div",{staticClass:"container"},[s("Row",[s("Col",{attrs:{span:"4"}},[s("div",{staticClass:"leftmenu left-box"},[s("div",{staticClass:"user-info"},[s("div",{staticClass:"avatar-box"},[s("div",{staticClass:"user-face user-avatar-public"},[null!=e.user.avatar&&""!=e.user.avatar?s("img",{staticStyle:{"border-radius":"50%"},attrs:{src:e.user.avatar,width:"60px",height:"60px"}}):s("span",{staticClass:"user-avatar-in"},[e._v(e._s(e.usernameS))])]),e._v(" "),s("div",{staticClass:"user-name"})]),e._v(" "),s("span",{staticClass:"ml10"},[e._v("\r\n                      "+e._s(e.user.username)+"\r\n                      ")])]),e._v(" "),s("div",{staticClass:"deal-market-info"},[1==e.user.emailVerified?s("p",[s("i",{staticClass:"iconfont icon-youxiang111"}),e._v(" "),s("span",{staticClass:"unmarket"},[e._v(e._s(e.$t("otc.checkuser.emaildone")))])]):s("p",[s("i",{staticClass:"iconfont icon-youxiang"}),e._v(" "),s("span",{staticClass:"unmarket"},[e._v(e._s(e.$t("otc.checkuser.emailundo")))])]),e._v(" "),1==e.user.phoneVerified?s("p",[s("i",{staticClass:"iconfont icon-dianhua111"}),e._v(" "),s("span",{},[e._v(e._s(e.$t("otc.checkuser.teldone")))])]):s("p",[s("i",{staticClass:"iconfont icon-dianhua"}),e._v(" "),s("span",{},[e._v(e._s(e.$t("otc.checkuser.telundo")))])]),e._v(" "),1==e.user.realVerified?s("p",[s("i",{staticClass:"iconfont icon-renzheng111"}),e._v(" "),s("span",{},[e._v(e._s(e.$t("otc.checkuser.idcarddone")))])]):s("p",[s("i",{staticClass:"iconfont icon-renzheng"}),e._v(" "),s("span",{staticClass:"unmarket"},[e._v(e._s(e.$t("otc.checkuser.idcardundo")))])])])])]),e._v(" "),s("Col",{attrs:{span:"20"}},[s("div",{staticClass:"right-safe"},[s("div",{staticClass:"trade-right-box"},[s("div",{staticClass:"trade-price"},[s("Row",{staticClass:"tit"},[s("Col",{attrs:{span:"6"}},[e._v(e._s(e.$t("otc.checkuser.language"))+": "+e._s(e.$t("otc.checkuser.languagetext")))]),e._v(" "),s("Col",{attrs:{span:"6"}},[e._v(e._s(e.$t("otc.checkuser.registtime"))+": "+e._s(e.user.createTime))]),e._v(" "),s("Col",{attrs:{span:"6"}},[e._v(e._s(e.$t("otc.checkuser.exchangetimes"))+": "+e._s(e.user.transactions))])],1)],1)]),e._v(" "),s("div",{staticClass:"trade-operation"},[s("div",{staticClass:"trade-group merchant-top"},[s("i",{staticClass:"merchant-icon tips"}),e._v(" "),s("span",{staticClass:"tips-word"},[e._v(e._s(e.user.username&&e.user.username&&e.strpro(e.user.username))+e._s(e.$t("otc.checkuser.exchangeinfo")))])])]),e._v(" "),s("div",{staticClass:"demo-tabs-style1 tabbox"},[s("Tabs",{attrs:{value:"name1"}},[s("TabPane",{attrs:{label:e.$t("otc.checkuser.tablabel1"),name:"name1"}},[s("div",{staticClass:"order-table"},[s("Table",{attrs:{columns:e.tableColumnsOrderSell,data:e.tableOrderSell,loading:e.loading,"disabled-hover":!0}})],1)]),e._v(" "),s("TabPane",{attrs:{label:e.$t("otc.checkuser.tablabel2"),name:"name2"}},[s("div",{staticClass:"order-table"},[s("Table",{attrs:{columns:e.tableColumnsOrderBuy,data:e.tableOrderBuy,loading:e.loading,"disabled-hover":!0}})],1)])],1)],1)])])],1)],1)])},staticRenderFns:[]};var i=s("VU/8")(a,r,!1,function(e){s("C1pr"),s("QvC0")},"data-v-6f7ca692",null);t.default=i.exports}});