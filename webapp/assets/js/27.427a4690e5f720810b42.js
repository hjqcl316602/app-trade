webpackJsonp([27],{OjNR:function(t,s){},lgIm:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={components:{},data:()=>({usernameS:"",text1:"",text2:"",btnDisabled:!1,submitBtn:!1,btnType:"",type:"",user:{username:"aaa"},buyPrice:"",nuyNum:0,minLimit:100,maxLimit:1e3,advertiseType:1}),methods:{update(){},transform1(){if(Number.isNaN(Number(this.buyPrice)))return this.text1=this.$t("otc.tradeinfo.warning2")+this.user.minLimit+"~"+this.user.maxLimit,this.submitBtn=!1,!1;this.nuyNum=this.round(this.div(this.buyPrice,this.priceNow),8),/^\d+(\.\d{1,2})?$/.test(this.buyPrice)?this.submitBtn=!0:(this.submitBtn=!1,this.text1=this.$t("otc.tradeinfo.warning1"))},transform2(){return Number.isNaN(Number(this.nuyNum))?(this.text2=this.$t("otc.tradeinfo.warning4")+this.minNum+"~"+this.user.number,this.submitBtn=!1,!1):(this.buyPrice=this.round(this.mul(this.nuyNum,this.priceNow),8),this.nuyNum<=this.user.number?void(/^\d+(\.\d{1,8})?$/.test(this.nuyNum)?this.submitBtn=!0:(this.submitBtn=!1,this.text2=this.$t("otc.tradeinfo.warning3"))):(this.submitBtn=!1,!1))},getIdAdv(){this.$http.post(this.host+"/otc/order/pre",{id:this.$route.query.tradeId}).then(t=>{var s=t.body;0==s.code?(this.user=s.data,this.text1=this.$t("otc.tradeinfo.warning2")+this.user.minLimit+"~"+this.user.maxLimit,this.text2=this.$t("otc.tradeinfo.warning4")+this.minNum+"~"+this.user.number,1==this.user.advertiseType?(this.btnType=this.$t("otc.tradeinfo.confirmbuyin"),this.type=this.$t("otc.tradeinfo.buyin")):0==this.user.advertiseType&&(this.btnType=this.$t("otc.tradeinfo.confirmsellout"),this.type=this.$t("otc.tradeinfo.sellout")),this.usernameS=(this.user.username+"").replace(/^\s+|\s+$/g,"").slice(0,1)):this.$Message.error(s.message)})},submit(){if(this.submitBtn){if(this.btnDisabled=!0,1==this.user.advertiseType){let t={};t.id=this.$route.query.tradeId,t.coinId=this.user.otcCoinId,t.price=this.user.price,t.money=this.buyPrice,t.amount=this.nuyNum,this.$http.post(this.host+"/otc/order/buy",t).then(t=>{this.btnDisabled=!1;var s=t.body;if(0==s.code){this.$Message.success(s.message);let t=this;setTimeout(()=>{t.$router.push("/uc/order/recharge-withdraw")},1e3)}else this.$Message.error(s.message)})}else if(0==this.user.advertiseType){let t={};t.id=this.$route.query.tradeId,t.coinId=this.user.otcCoinId,t.price=this.user.price,t.money=this.buyPrice,t.amount=this.nuyNum,this.$http.post(this.host+"/otc/order/sell",t).then(t=>{this.btnDisabled=!1;var s=t.body;if(0==s.code){this.$Message.success(s.message);let t=this;setTimeout(()=>{t.$router.push("/chat?tradeId="+s.data)},2e3)}else this.$Message.error(s.message)})}}else this.$Message.error(this.$t("otc.tradeinfo.warning5"))},sendMsg(){},mul(t,s){var e=0,i=t.toString(),a=s.toString();try{e+=i.split(".")[1].length}catch(t){}try{e+=a.split(".")[1].length}catch(t){}return Number(i.replace(".",""))*Number(a.replace(".",""))/Math.pow(10,e)},div(t,s){var e,i,a=0,r=0;try{a=t.toString().split(".")[1].length}catch(t){}try{r=s.toString().split(".")[1].length}catch(t){}return e=Number(t.toString().replace(".","")),i=Number(s.toString().replace(".","")),this.mul(e/i,Math.pow(10,r-a))},round(t,s){for(var e=1;s>0;e*=10,s--);for(;s<0;e/=10,s++);return Math.round(t*e)/e},strpro(t){let s=t;var e=(t=t.slice(1)).replace(/[\D\d]*/g,function(t){for(var s="",e=0;e<t.length;e++)s+="*";return s});return s.slice(0,1)+e}},created(){this.getIdAdv()},computed:{priceNow:function(){return(this.user.price+"").replace(/,/g,"").replace(/[^\d|.]/g,"")-0},minNum:function(){return(this.user.minLimit/this.priceNow).toFixed(8)},maxNum:function(){return this.user.maxLimit/this.priceNow}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content-wrap"},[e("div",{staticClass:"container",attrs:{id:"List"}},[e("Row",[e("Col",{attrs:{span:"4"}},[e("div",{staticClass:"leftmenu left-box"},[e("div",{staticClass:"user-info"},[e("div",{staticClass:"avatar-box"},[e("div",{staticClass:"user-face user-avatar-public"},[e("span",{staticClass:"user-avatar-in"},[t._v(t._s(t.usernameS))])]),t._v(" "),e("div",{staticClass:"user-name"})]),t._v(" "),e("span",{staticClass:"ml10",staticStyle:{width:"105px"}},[t._v(t._s(t.strpro(t.user.username)))])]),t._v(" "),e("div",{staticClass:"deal-market-info"},[1==t.user.emailVerified?e("p",[e("i",{staticClass:"iconfont icon-youxiang111"}),t._v(" "),e("span",{staticClass:"unmarket"},[t._v(t._s(t.$t("otc.tradeinfo.emaildone")))])]):e("p",[e("i",{staticClass:"iconfont icon-youxiang"}),t._v(" "),e("span",{staticClass:"unmarket"},[t._v(t._s(t.$t("otc.tradeinfo.emailundo")))])]),t._v(" "),1==t.user.phoneVerified?e("p",[e("i",{staticClass:"iconfont icon-dianhua111"}),t._v(" "),e("span",{},[t._v(t._s(t.$t("otc.tradeinfo.teldone")))])]):e("p",[e("i",{staticClass:"iconfont icon-dianhua"}),t._v(" "),e("span",{},[t._v(t._s(t.$t("otc.tradeinfo.telundo")))])]),t._v(" "),1==t.user.idCardVerified?e("p",[e("i",{staticClass:"iconfont icon-renzheng111"}),t._v(" "),e("span",{},[t._v(t._s(t.$t("otc.tradeinfo.idcarddone")))])]):e("p",[e("i",{staticClass:"iconfont icon-renzheng"}),t._v(" "),e("span",{staticClass:"unmarket"},[t._v(t._s(t.$t("otc.tradeinfo.idcardundo")))])])]),t._v(" "),e("div",{staticClass:"deal-user-trade-info"},[e("p",[t._v("\n              "+t._s(t.$t("otc.tradeinfo.exchangetimes"))+"：\n              "),e("em",{staticClass:"trade-times"},[t._v(t._s(t.user.transactions))])])])])]),t._v(" "),e("Col",{attrs:{span:"20"}},[e("div",{staticClass:"right-safe"},[e("div",{staticClass:"trade-right-box"},[e("div",{staticClass:"trade-price"},[e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.price")))]),t._v(" "),e("span",[t._v(t._s(t.user.price)+" CNY / "+t._s(t.user.unit))])]),t._v(" "),e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.num")))]),t._v(" "),e("span",[t._v(t._s(t.user.number)+" "+t._s(t.user.unit))])]),t._v(" "),e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.paymethod")))]),t._v(" "),e("span",[t._v(t._s(t.user.payMode))])]),t._v(" "),e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.exchangelimitamount")))]),t._v(" "),e("span",[t._v(t._s(t.user.minLimit)+" - "+t._s(t.user.maxLimit)+" CNY")])]),t._v(" "),e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.location")))]),t._v(" "),e("span",[t._v(t._s(t.$t("otc.tradeinfo.location_text")))])]),t._v(" "),e("p",[e("label",[t._v(t._s(t.$t("otc.tradeinfo.exchangeperiod")))]),t._v(" "),e("span",[t._v(t._s(t.user.timeLimit)+t._s(t.$t("otc.tradeinfo.minute")))])])]),t._v(" "),e("div",{staticClass:"trade-operation"},[e("div",{staticClass:"trade-price-input"},[e("p",{staticClass:"price-input-list"},[e("Poptip",{staticStyle:{width:"100%"},attrs:{trigger:"focus",content:t.text1}},[e("Input",{staticStyle:{width:"420px"},attrs:{size:"large",placeholder:t.$t("otc.tradeinfo.amounttip")},on:{"on-change":t.transform1},model:{value:t.buyPrice,callback:function(s){t.buyPrice=s},expression:"buyPrice"}},[e("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("CNY")])])],1)],1),t._v(" "),e("span",{staticClass:"exchange1"},[e("Icon",{attrs:{type:"md-swap"}})],1),t._v(" "),e("p",{staticClass:"price-input-list"},[e("Poptip",{staticStyle:{width:"100%"},attrs:{trigger:"focus",content:t.text2}},[e("Input",{staticStyle:{width:"420px"},attrs:{size:"large",placeholder:t.$t("otc.tradeinfo.numtip")},on:{"on-change":t.transform2},model:{value:t.nuyNum,callback:function(s){t.nuyNum=s},expression:"nuyNum"}},[e("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v(t._s(t.user.unit))])])],1)],1)]),t._v(" "),e("div",{staticClass:"price-box"},[e("p",{staticClass:"show-price"},[e("em",[t._v(t._s(t.type)+":")]),t._v(" "),e("span",[t._v("  "+t._s(t.buyPrice)+" CNY / "+t._s(t.nuyNum)+"\n                    "+t._s(t.user.unit))])]),t._v(" "),e("button",{staticClass:"btn-trade-in",attrs:{disabled:t.btnDisabled},on:{click:t.submit}},[t._v("\n                  "+t._s(t.btnType)+"\n                ")])])]),t._v(" "),e("div",{staticClass:"trade-remark"},[e("h5",{staticClass:"titles"},[e("span",[t._v(t._s(t.$t("otc.tradeinfo.remarktitle")))])]),t._v(" "),e("p",{staticClass:"content"},[t._v("\n                "+t._s(t.user.remark)+"\n              ")]),t._v(" "),e("h5",{staticClass:"titles"},[e("span",[t._v(t._s(t.$t("otc.tradeinfo.exchangetitle")))])]),t._v(" "),e("div",{staticClass:"content"},[e("p",[t._v(t._s(t.$t("otc.tradeinfo.exchange_tip1")))]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.tradeinfo.exchange_tip2")))]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.tradeinfo.exchange_tip3")))]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.tradeinfo.exchange_tip4")))]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.tradeinfo.exchange_tip5")))])])]),t._v(" "),e("div",{staticClass:"modal"})])])])],1)],1)])},staticRenderFns:[]};var r=e("VU/8")(i,a,!1,function(t){e("OjNR")},"data-v-76785534",null);s.default=r.exports}});