webpackJsonp([20],{"351C":function(t,i){},"9Q3t":function(t,i){},cjTN:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={data(){return{isSpinShow:!0,isId:!1,disAllowBtn:!1,coinList:[],balance:100,cankao:"",price:"",symbol:"",gongshi:1,wantstyle:this.$t("otc.publishad.sellout"),wantTime:"15-120",areas:[],form:{advertiseType:"1",coin:"1",country:"china",rmb:"",fixed:!1,premisePrice:"",fixedPrice:"",number:"",timeLimit:"",payMode:[],minLimit:"",maxLimit:"",autoReply:!1,remark:"",priceW:"",autoword:""},ruleValidate:{advertiseType:[{required:!0,trigger:"change"}],coin:[{required:!0,message:this.$t("otc.publishad.inputtip1"),trigger:"change"}],country:[{required:!0,message:this.$t("otc.publishad.inputtip2"),trigger:"change"}],rmb:[{required:!0,message:this.$t("otc.publishad.inputtip2"),trigger:"change"}],premisePrice:[{validator:(t,i,e)=>{if(0==this.form.fixed){if(!i||0==i)return e(new Error(this.$t("otc.publishad.warning2")));Number.isNaN(Number(i))?e(new Error("")):i<0||i>20?e(new Error(this.$t("otc.publishad.warning1"))):e()}else e()},message:this.$t("otc.publishad.inputtip3"),trigger:"blur"}],fixedPrice:[{validator:(t,i,e)=>{1==this.form.fixed?""===i?e(new Error(this.$t("otc.publishad.warning1"))):/^[0-9]+(.[0-9]{2})?/.test(i)?e():e(new Error(this.$t("otc.publishad.warning1"))):e()},message:this.$t("otc.publishad.inputtip4"),trigger:"blur"}],number:[{required:!0,validator:(t,i,e)=>{""===i||0==i?e(new Error(this.$t("otc.publishad.warning1"))):Number.isNaN(Number(i))?e(new Error(this.$t("otc.publishad.warning1"))):e()},message:this.$t("otc.publishad.inputtip5"),trigger:"blur"}],timeLimit:[{required:!0,validator:(t,i,e)=>{""!==i&&/^\d+$/.test(i)||e(new Error(this.$t("otc.publishad.warning1"))),1==this.form.advertiseType&&(i<15||i>120?e(new Error(this.$t("otc.publishad.warning1"))):e()),0==this.form.advertiseType&&(i<10||i>30)?e(new Error(this.$t("otc.publishad.warning1"))):e()},message:this.$t("otc.publishad.inputtip6"),trigger:"blur"}],payMode:[{required:!0,type:"array",min:1,message:this.$t("otc.publishad.inputtip7"),trigger:"change"}],minLimit:[{required:!0,validator:(t,i,e)=>{if(!i||0==i)return e(new Error(this.$t("otc.publishad.warning7")));/^\d+$/.test(i)?parseFloat(i)<10&&e(new Error(this.$t("otc.publishad.warning8"))):e(new Error(this.$t("otc.publishad.warning4"))),this.form.maxLimit&&0!=this.form.maxLimit&&parseFloat(i)>this.form.maxLimit-0?e(new Error(this.$t("otc.publishad.warning9"))):e()},trigger:"blur"}],maxLimit:[{required:!0,validator:(t,i,e)=>{let s=(this.price+"").replace(/,/g,"").replace(/[^\d|.]/g,"")-0;if(s=this.round(this.mul(s,this.form.number),8),!i||0==i)return e(new Error(this.$t("otc.publishad.warning3")));/^[0-9]+(.[0-9]{2})?$/.test(i)?parseFloat(i)<parseFloat(this.form.minLimit)?e(new Error(this.$t("otc.publishad.warning5"))):parseFloat(i)>parseFloat(s)?e(new Error(this.$t("otc.publishad.warning6")+s+"CNY！")):e():e(new Error(this.$t("otc.publishad.warning4")))},trigger:"blur"}],priceW:[{required:!0,message:this.$t("otc.publishad.inputtip8"),trigger:"blur"}]},payModeList:[{value:this.$t("otc.publishad.zfb"),label:this.$t("otc.publishad.zfb"),isOpen:!0},{value:this.$t("otc.publishad.wx"),label:this.$t("otc.publishad.wx"),isOpen:!0},{value:this.$t("otc.publishad.unionpay"),label:this.$t("otc.publishad.unionpay"),isOpen:!0}]}},methods:{changeCoin(){let t=this.getCoin(this.form.coin);if(null!=t){this.cankao=t.marketPrice+"";let i=(1+this.form.premisePrice/100).toFixed(4),e=this.cankao.replace(/,/g,"").replace(/[^\d|.]/g,"")-0;this.price=(e*i).toLocaleString(),this.symbol=t.unit}},mul(t,i){var e=0,s=t.toString(),r=i.toString();try{e+=s.split(".")[1].length}catch(t){}try{e+=r.split(".")[1].length}catch(t){}return Number(s.replace(".",""))*Number(r.replace(".",""))/Math.pow(10,e)},div(t,i){var e,s,r=0,a=0;try{r=t.toString().split(".")[1].length}catch(t){}try{a=i.toString().split(".")[1].length}catch(t){}return e=Number(t.toString().replace(".","")),s=Number(i.toString().replace(".","")),this.mul(e/s,Math.pow(10,a-r))},round(t,i){for(var e=1;i>0;e*=10,i--);for(;i<0;e/=10,i++);return Math.round(t*e)/e},handleSubmit(t){this.$refs[t].validate(t=>{if(t){this.disAllowBtn=!0;var i={};i.price=(this.price+"").replace(/[^\d|.]/g,"")-0,i.advertiseType=this.form.advertiseType,i["coin.id"]=this.form.coin,i.minLimit=this.form.minLimit,i.maxLimit=this.form.maxLimit,i.timeLimit=this.form.timeLimit,i.country=this.form.country,1==this.form.fixed?i.priceType=0:0==this.form.fixed&&(i.priceType=1),i.premiseRate=this.form.premisePrice,i.remark=this.form.remark,i.number=this.form.number,i.pay=this.form.payMode,i.jyPassword=this.form.priceW,1==this.form.autoReply?i.auto=1:0==this.form.autoReply&&(i.auto=0),i.autoword=this.form.autoword;var e={};e.id=this.$route.query.id,e.advertiseType=this.form.advertiseType,e.price=(this.price+"").replace(/[^\d|.]/g,"")-0,e["coin.id"]=this.form.coin,e.minLimit=this.form.minLimit,e.maxLimit=this.form.maxLimit,e.timeLimit=this.form.timeLimit,e.country=this.form.country,1==this.form.fixed?e.priceType=0:0==this.form.fixed&&(e.priceType=1),e.premiseRate=this.form.premisePrice,e.remark=this.form.remark,e.number=this.form.number,e.pay=this.form.payMode,e.jyPassword=this.form.priceW,1==this.form.autoReply?e.auto=1:0==this.form.autoReply&&(e.auto=0),e.autoword=this.form.autoword,this.isId?this.$http.post(this.host+"/otc/advertise/update",e).then(t=>{var i=t.body;if(0==i.code){this.$Message.success(i.message);var e=this;setTimeout(()=>{e.$router.push("/uc/ad")},3e3)}else this.$Message.error(i.message),this.disAllowBtn=!1}):this.$http.post(this.host+"/otc/advertise/create",i).then(t=>{var i=t.body;if(0==i.code){this.$Message.success(i.message);var e=this;setTimeout(()=>{e.$router.push("/uc/ad")},3e3)}else this.$Message.error(i.message),this.disAllowBtn=!1})}else this.disAllowBtn=!1,this.$Message.error(this.$t("otc.publishad.submit_failure"))})},handleReset(t){this.$refs[t].resetFields()},onAreaChange(t){for(var i=0;i<this.areas.length;i++)this.areas[i].zhName==t&&(this.form.rmb=this.areas[i].localCurrency)},findCoin(t){for(let i=0;i<this.coinList.length;i++)if(this.coinList[i].id==t)return this.coinList[i].unit},getCoin(t){for(let i=0;i<this.coinList.length;i++)if(this.coinList[i].id==t)return this.coinList[i]},getAreas(){this.$http.post(this.host+"/uc/support/country").then(t=>{var i=t.body;this.areas=i.data,this.form.country=this.areas[0].zhName,this.form.rmb=this.areas[0].localCurrency})},getMember(){this.$http.get(this.host+this.api.uc.identification).then(t=>{2==t.body.data.certifiedBusinessStatus?this.getAccount():(this.$Message.warning("请先申请商家认证!"),this.$router.push("/identbusiness"))})},getAccount(){let t=this;this.$http.post(this.host+"/uc/approve/account/setting").then(i=>{var e=i.body;0==e.code?(0==e.data.bankVerified&&0==e.data.aliVerified&&0==e.data.wechatVerified&&(this.$Message.success(this.$t("otc.publishad.submittip4")),t.$router.push("/uc/account")),1==e.data.aliVerified&&(this.payModeList[0].isOpen=!1),1==e.data.wechatVerified&&(this.payModeList[1].isOpen=!1),1==e.data.bankVerified&&(this.payModeList[2].isOpen=!1)):(this.msg=e.message,this.$Message.error(e.message))})},getDetailAd(){this.isId=!0,this.$http.post(this.host+"/otc/advertise/detail",{id:this.$route.query.id}).then(t=>{var i=t.body;0==i.code?(this.form.coin=i.data.coinId+"",this.form.country=i.data.country.zhName,this.cankao=i.data.marketPrice+"",0==i.data.priceType?(this.form.fixed=!0,this.form.fixedPrice=i.data.price):1==i.data.priceType&&(this.form.fixed=!1),this.price=i.data.price,this.symbol=i.data.coinUnit,this.form.advertiseType=i.data.advertiseType+"",this.form.minLimit=i.data.minLimit,this.form.maxLimit=i.data.maxLimit,this.form.remark=i.data.remark,this.form.timeLimit=i.data.timeLimit,this.form.premisePrice=i.data.premiseRate,this.form.payMode=(i.data.payMode+"").split(","),this.form.number=i.data.number,1==i.data.auto?this.form.autoReply=!0:0==i.data.auto&&(this.form.autoReply=!1),this.form.autoword=i.data.autoword):this.$Message.error(i.message),this.isSpinShow=!1})}},mounted(){},computed:{wantHistory(){return this.form.advertiseType},premisePriceHistory(){return this.form.premisePrice},fixedPriceHistory(){return this.form.fixedPrice}},watch:{wantHistory(t,i){"1"==t?(this.wantstyle=this.$t("otc.publishad.sellout"),this.wantTime="15-120"):(this.wantstyle=this.$t("otc.publishad.buyin"),this.wantTime="10-30")},premisePriceHistory(t,i){let e=(1+t/100).toFixed(4),s=this.cankao.replace(/,/g,"").replace(/[^\d|.]/g,"")-0;this.price=this.round(this.mul(s,e),2).toLocaleString(),this.gongshi=1+t/100},fixedPriceHistory(t,i){this.price=(t-0).toLocaleString()}},created(){this.getMember(),this.getAreas();let t=(1+this.form.premisePrice/100).toFixed(4);this.$http.post(this.host+"/otc/coin/allExPlat").then(i=>{var e=i.body;if(0==e.code){this.coinList=e.data,this.form.coin=e.data[0].id,this.cankao=e.data[0].marketPrice+"";let i=this.cankao.replace(/,/g,"").replace(/[^\d|.]/g,"")-0;this.price=(i*t).toLocaleString(),this.symbol=e.data[0].unit}else this.$Message.error(e.message);this.$route.query.id?this.getDetailAd():this.isSpinShow=!1})}},r={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"my_ad_container"},[e("div",{staticClass:"contbox"},[e("Spin",{directives:[{name:"show",rawName:"v-show",value:t.isSpinShow,expression:"isSpinShow"}],staticClass:"my_ad_container_spin",attrs:{fix:""}}),t._v(" "),e("div",{},[e("div",{staticClass:"send-box"},[e("div",{staticClass:"title-box"},[e("h6",{staticClass:"titles"},[t._v(t._s(t.$t("otc.publishad.createad"))+"\n            "),e("i",{staticClass:"iconfont icon-hongjiantou"})]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.publishad.msg1"))+"\n            "),e("router-link",{attrs:{to:"/otc/trade/usdt"}},[t._v(t._s(t.$t("otc.publishad.tradead")))]),t._v("\n            。\n          ")],1),t._v(" "),e("p",[t._v(t._s(t.$t("otc.publishad.msg2"))+t._s(t.$t("otc.publishad.msg3"))+"。")]),t._v(" "),e("p",[t._v(t._s(t.$t("otc.publishad.msg4"))+"\n            "),e("router-link",{attrs:{to:"/uc/ad"}},[t._v(t._s(t.$t("otc.publishad.myad")))]),t._v("\n            。\n          ")],1)]),t._v(" "),e("div",{staticClass:"formbox send-form"},[e("Form",{ref:"form",attrs:{model:t.form,rules:t.ruleValidate,"label-width":90}},[e("FormItem",{attrs:{label:t.$t("otc.publishad.iwant"),prop:"advertiseType"}},[e("RadioGroup",{model:{value:t.form.advertiseType,callback:function(i){t.$set(t.form,"advertiseType",i)},expression:"form.advertiseType"}},[e("Radio",{attrs:{label:"1",disabled:t.isId}},[t._v(t._s(t.$t("otc.publishad.sellonline")))]),t._v(" "),e("Radio",{attrs:{label:"0",disabled:t.isId}},[t._v(t._s(t.$t("otc.publishad.buyonline")))])],1)],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.exchangecoin"),prop:"coin"}},[e("Select",{attrs:{disabled:t.isId},on:{"on-change":t.changeCoin},model:{value:t.form.coin,callback:function(i){t.$set(t.form,"coin",i)},expression:"form.coin"}},t._l(t.coinList,function(i,s){return e("Option",{key:s,attrs:{value:i.id}},[t._v(t._s(i.unit))])}))],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.country"),prop:"country"}},[e("Select",{on:{"on-change":t.onAreaChange},model:{value:t.form.country,callback:function(i){t.$set(t.form,"country",i)},expression:"form.country"}},t._l(t.areas,function(i,s){return e("Option",{key:s,attrs:{value:i.zhName}},[t._v(t._s(i.zhName))])}))],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.currency"),prop:"rmb"}},[e("Input",{attrs:{disabled:"",placeholder:""},model:{value:t.form.rmb,callback:function(i){t.$set(t.form,"rmb",i)},expression:"form.rmb"}})],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.openfixedprice")}},[e("i-switch",{attrs:{size:"large"},model:{value:t.form.fixed,callback:function(i){t.$set(t.form,"fixed",i)},expression:"form.fixed"}},[e("span",{attrs:{slot:"open"},slot:"open"},[t._v(t._s(t.$t("otc.publishad.open")))]),t._v(" "),e("span",{attrs:{slot:"close"},slot:"close"},[t._v(t._s(t.$t("otc.publishad.close")))])])],1),t._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:t.form.fixed,expression:"form.fixed"}],staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.usetip")))]),t._v(" "),e("FormItem",{directives:[{name:"show",rawName:"v-show",value:!t.form.fixed,expression:"!form.fixed"}],staticClass:"ivu-form-item-required",attrs:{label:t.$t("otc.publishad.premiseprice"),prop:"premisePrice"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.premisepricetip")},model:{value:t.form.premisePrice,callback:function(i){t.$set(t.form,"premisePrice",i)},expression:"form.premisePrice"}},[e("span",{attrs:{slot:"append"},slot:"append"},[t._v("%")])])],1),t._v(" "),e("FormItem",{directives:[{name:"show",rawName:"v-show",value:t.form.fixed,expression:"form.fixed"}],staticClass:"ivu-form-item-required",attrs:{label:t.$t("otc.publishad.fixedprice"),prop:"fixedPrice"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.fixedpricetip")},model:{value:t.form.fixedPrice,callback:function(i){t.$set(t.form,"fixedPrice",i)},expression:"form.fixedPrice"}},[e("span",{attrs:{slot:"append"},slot:"append"},[t._v(t._s(t.form.rmb))])])],1),t._v(" "),e("p",{staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.marketprice"))+"：\n              "),e("span",{staticClass:"cankao"},[t._v(t._s(t.cankao))])]),t._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:!t.form.fixed,expression:"!form.fixed"}],staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.marketpricetip"))+t._s(t.wantstyle)+"。")]),t._v(" "),e("div",{staticClass:"ivu-form-item"},[e("label",{staticClass:"ivu-form-item-label",staticStyle:{width:"90px"}},[t._v(t._s(t.$t("otc.publishad.exchangeprice")))]),t._v(" "),e("div",{staticClass:"ivu-form-item-content",staticStyle:{"margin-left":"90px"}},[e("div",{staticClass:"ivu-input-wrapper ivu-input-type",attrs:{id:"price"}},[t._v("\n                  "+t._s(t.price)+" CNY/"+t._s(t.symbol)+"\n                ")])])]),t._v(" "),e("p",{staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.formual"))+"：（Bitstamp+Bitfinex+Coinbase）/ 3 *"+t._s(t.gongshi.toFixed(4)))]),t._v(" "),e("FormItem",{attrs:{label:t.wantstyle+t.$t("otc.publishad.num"),prop:"number"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.num_text1")+t.wantstyle+t.$t("otc.publishad.num_text2")},model:{value:t.form.number,callback:function(i){t.$set(t.form,"number",i)},expression:"form.number"}})],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.exchangeperiod"),prop:"timeLimit"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.exchangeperiod_text1")+"("+t.wantTime+t.$t("otc.publishad.minute")+")"},model:{value:t.form.timeLimit,callback:function(i){t.$set(t.form,"timeLimit",i)},expression:"form.timeLimit"}},[e("span",{attrs:{slot:"append"},slot:"append"},[t._v(t._s(t.$t("otc.publishad.minute")))])])],1),t._v(" "),e("p",{staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.tip1"))+" ")]),t._v(" "),e("router-link",{staticStyle:{"padding-left":"90px",color:"#f0ac19"},attrs:{to:"/uc/account"}},[t._v(t._s(t.$t("otc.publishad.tip2")))]),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.paymode"),prop:"payMode"}},[e("Select",{attrs:{multiple:""},model:{value:t.form.payMode,callback:function(i){t.$set(t.form,"payMode",i)},expression:"form.payMode"}},t._l(t.payModeList,function(i,s){return e("Option",{key:i.value,attrs:{value:i.value,disabled:i.isOpen}},[t._v(t._s(i.label))])}))],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.minlimit"),prop:"minLimit"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.tip3")},model:{value:t.form.minLimit,callback:function(i){t.$set(t.form,"minLimit",i)},expression:"form.minLimit"}},[e("span",{attrs:{slot:"append"},slot:"append"},[t._v("CNY")])])],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.maxlimit"),prop:"maxLimit"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.tip4")},model:{value:t.form.maxLimit,callback:function(i){t.$set(t.form,"maxLimit",i)},expression:"form.maxLimit"}},[e("span",{attrs:{slot:"append"},slot:"append"},[t._v("CNY")])])],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.remark"),prop:"remark"}},[e("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:t.$t("otc.publishad.tip5")},model:{value:t.form.remark,callback:function(i){t.$set(t.form,"remark",i)},expression:"form.remark"}})],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.openautoreply")}},[e("i-switch",{attrs:{size:"large"},model:{value:t.form.autoReply,callback:function(i){t.$set(t.form,"autoReply",i)},expression:"form.autoReply"}},[e("span",{attrs:{slot:"open"},slot:"open"},[t._v(t._s(t.$t("otc.publishad.open")))]),t._v(" "),e("span",{attrs:{slot:"close"},slot:"close"},[t._v(t._s(t.$t("otc.publishad.close")))])])],1),t._v(" "),e("p",{staticClass:"msg"},[t._v(t._s(t.$t("otc.publishad.msg5")))]),t._v(" "),e("FormItem",{directives:[{name:"show",rawName:"v-show",value:t.form.autoReply,expression:"form.autoReply"}],attrs:{label:t.$t("otc.publishad.autoreply"),prop:"autoword"}},[e("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:t.$t("otc.publishad.autoreplytip")},model:{value:t.form.autoword,callback:function(i){t.$set(t.form,"autoword",i)},expression:"form.autoword"}})],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.publishad.fundpwd"),prop:"priceW"}},[e("Input",{attrs:{placeholder:t.$t("otc.publishad.fundpwdtip"),type:"password"},model:{value:t.form.priceW,callback:function(i){t.$set(t.form,"priceW",i)},expression:"form.priceW"}})],1),t._v(" "),e("FormItem",[e("Button",{staticStyle:{background:"#f0a70a",color:"#fff",border:"1px solid #f0a70a"},attrs:{long:"",disabled:t.disAllowBtn},on:{click:function(i){t.handleSubmit("form")}}},[t._v(t._s(t.$t("otc.publishad.submit")))])],1)],1)],1)])])],1)])},staticRenderFns:[]};var a=e("VU/8")(s,r,!1,function(t){e("9Q3t"),e("351C")},"data-v-170ca109",null);i.default=a.exports}});