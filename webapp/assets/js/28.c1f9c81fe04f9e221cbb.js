webpackJsonp([28],{nOft:function(e,t){},z7ba:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"AdCoin",components:{},mixins:[],data(){return{form:{advertiseType:"1",number:"",payMode:[],priceW:""},base:{limit:0,balance:0,leftBuyLimit:0,leftSellLimit:0},edit:{type:"insert",id:""},ruleValidate:{advertiseType:[{required:!0,trigger:"change"}],number:[{required:!0,validator:(e,t,s)=>{""===t||t<100?s(new Error("请输入正确的数量！不小于100")):Number.isNaN(Number(t))?s(new Error("请输入正确的数值！")):s()},trigger:"blur"}],payMode:[{required:!0,type:"array",min:1,message:this.$t("otc.publishad.inputtip7"),trigger:"change"}],priceW:[{required:!0,message:this.$t("otc.publishad.inputtip8"),trigger:"blur"}]},isId:!1,payModeList:[]}},mounted(){},created(){this.initPage()},activated(){},methods:{async initPage(){this.getMember(),this.getDetailAd(),this.getBaseMessage()},getBaseMessage(){this.$http.post(this.host+"/otc/advertise/init").then(e=>{var t=e.body;0===t.code?t.data?this.base=Object.assign(this.base,t.data):this.$Message.error("获取用户剩余额度等信息失败！"):this.$Message.error(t.message)})},getDetailAd(){this.edit.id=this.$route.query.id,this.edit.id?(this.edit.type="update",this.$http.post(this.host+"/otc/advertise/detail",{id:this.edit.id}).then(e=>{var t=e.body;if(0==t.code){let e=t.data;this.form.advertiseType=e.advertiseType+"",this.form.number=e.number,this.form.payMode=(e.payMode+"").split(",")}else this.$Message.error(t.message)})):this.edit.type="insert"},getMember(){this.$http.get(this.host+this.api.uc.identification).then(e=>{2==e.body.data.certifiedBusinessStatus?this.getAccount():(this.$Message.warning("请先申请商家认证!"),this.$router.push("/identbusiness"))})},getAccount(){this.$http.post(this.host+"/uc/approve/account/setting").then(e=>{var t=e.body;if(0==t.code){let e=(t.data||[]).filter(e=>1===e.checked);e.findIndex(e=>1===e.type)>-1&&this.payModeList.push({label:"银联",value:"银联"}),e.findIndex(e=>2===e.type)>-1&&this.payModeList.push({label:"微信",value:"微信"}),e.findIndex(e=>3===e.type)>-1&&this.payModeList.push({label:"支付宝",value:"支付宝"}),e.findIndex(e=>4===e.type)>-1&&this.payModeList.push({label:"云闪付",value:"云闪付"})}else this.msg=t.message,this.$Message.error(t.message)})},handleSubmit(){this.$refs.form.validate(e=>{if(e){let e={};e.advertiseType=this.form.advertiseType,e.number=this.form.number,e.pay=this.form.payMode,e.jyPassword=this.form.priceW,"insert"==this.edit.type?this.$http.post(this.host+"/otc/advertise/createStable",e).then(e=>{var t=e.body;if(0==t.code){this.$Message.success(t.message);var s=this;setTimeout(()=>{s.$router.push("/uc/ad")},1e3)}else this.$Message.error(t.message)}):(e.id=this.edit.id,this.$http.post(this.host+"/otc/advertise/updateStable",e).then(e=>{var t=e.body;if(0==t.code){this.$Message.success(t.message);var s=this;setTimeout(()=>{s.$router.push("/uc/ad")},1e3)}else this.$Message.error(t.message)}))}else this.$Message.error(this.$t("otc.publishad.submit_failure"))})}},watch:{"":{handler(e,t){},deep:!0,immediate:!0}}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"my_ad_container"},[s("input",{attrs:{type:"text",hidden:""}}),e._v(" "),s("input",{attrs:{type:"password",hidden:""}}),e._v(" "),s("div",{staticClass:"contbox"},[s("div",{},[s("div",{staticClass:"send-box"},[s("div",[s("span",{staticStyle:{color:"#aaa",fontSize:"14px","padding-left":"20px"}},[e._v("【 承兑额度 】 "),s("span",[e._v(e._s(e.base.limit))])]),e._v(" "),s("span",{staticStyle:{color:"#aaa",fontSize:"14px","padding-left":"20px"}},[e._v("【 余额 】 "),s("span",[e._v(e._s(e.base.balance))])])]),e._v(" "),s("div",{staticClass:"formbox send-form"},[s("Form",{ref:"form",attrs:{model:e.form,rules:e.ruleValidate,"label-width":90}},[s("FormItem",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"余额"}},[s("Input",{attrs:{value:e.base.balance,readonly:""}})],1),e._v(" "),s("FormItem",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"额度"}},[s("Input",{attrs:{value:e.base.limit,readonly:""}})],1),e._v(" "),s("FormItem",{attrs:{label:e.$t("otc.publishad.iwant"),prop:"advertiseType"}},[s("RadioGroup",{model:{value:e.form.advertiseType,callback:function(t){e.$set(e.form,"advertiseType",t)},expression:"form.advertiseType"}},[s("Radio",{attrs:{label:"1",disabled:"update"===e.edit.type}},[e._v(e._s(e.$t("otc.publishad.sellonline")))]),e._v(" "),s("Radio",{attrs:{label:"0",disabled:"update"===e.edit.type}},[e._v(e._s(e.$t("otc.publishad.buyonline")))])],1)],1),e._v(" "),"1"==e.form.advertiseType?s("span",{staticStyle:{"padding-left":"90px",color:"#f0ac19"},attrs:{tag:"div"}},[e._v("【可出售】"+e._s(e.base.leftSellLimit)+"\n            ")]):e._e(),e._v(" "),"0"==e.form.advertiseType?s("span",{staticStyle:{"padding-left":"90px",color:"#f0ac19"},attrs:{tag:"div"}},[e._v("【可购买】"+e._s(e.base.leftBuyLimit)+"\n            ")]):e._e(),e._v(" "),s("FormItem",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:"交易数量",prop:"number"}},[s("Input",{attrs:{placeholder:"请输入您的交易数量",autocomplete:"off"},model:{value:e.form.number,callback:function(t){e.$set(e.form,"number",t)},expression:"form.number"}})],1),e._v(" "),s("FormItem",{attrs:{label:"交易数量",prop:"number"}},[s("Input",{attrs:{placeholder:"请输入您的交易数量",autocomplete:"off"},model:{value:e.form.number,callback:function(t){e.$set(e.form,"number",t)},expression:"form.number"}})],1),e._v(" "),s("router-link",{staticStyle:{"padding-left":"90px",color:"#f0ac19"},attrs:{to:"/uc/account"}},[e._v(e._s(e.$t("otc.publishad.tip2")))]),e._v(" "),s("FormItem",{attrs:{label:e.$t("otc.publishad.paymode"),prop:"payMode"}},[s("Select",{attrs:{multiple:""},model:{value:e.form.payMode,callback:function(t){e.$set(e.form,"payMode",t)},expression:"form.payMode"}},e._l(e.payModeList,function(t){return s("Option",{key:t.value,attrs:{value:t.value,disabled:t.isOpen}},[e._v(e._s(t.label))])}))],1),e._v(" "),s("FormItem",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{label:e.$t("otc.publishad.fundpwd"),prop:"priceW"}},[s("Input",{attrs:{placeholder:e.$t("otc.publishad.fundpwdtip"),type:"password",autocomplete:"off"},model:{value:e.form.priceW,callback:function(t){e.$set(e.form,"priceW",t)},expression:"form.priceW"}})],1),e._v(" "),s("FormItem",{attrs:{label:e.$t("otc.publishad.fundpwd"),prop:"priceW"}},[s("Input",{attrs:{placeholder:e.$t("otc.publishad.fundpwdtip"),type:"password",autocomplete:"off"},model:{value:e.form.priceW,callback:function(t){e.$set(e.form,"priceW",t)},expression:"form.priceW"}})],1),e._v(" "),s("FormItem",[s("Button",{staticStyle:{background:"#f0a70a",color:"#fff",border:"1px solid #f0a70a"},attrs:{long:""},on:{click:function(t){e.handleSubmit("form")}}},[e._v(e._s(e.$t("otc.publishad.submit")))])],1)],1)],1),e._v(" "),e._m(0)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",{staticStyle:{"font-size":"18px","font-weight":"600","line-height":"50px"}},[this._v("\n            温馨提示\n          ")]),this._v(" "),t("p",{staticStyle:{"font-size":"14px","line-height":"24px"}},[this._v("\n            • 承兑额度=出售或购买的上限\n          ")]),this._v(" "),t("p",{staticStyle:{"font-size":"14px","line-height":"24px"}},[this._v("\n            • 承兑额度增加=用其他数字货币兑换TTM会增加TTM数量的额度\n          ")]),this._v(" "),t("p",{staticStyle:{"font-size":"14px","line-height":"24px"}},[this._v("\n            • 承兑额度的减少=用TTM兑换其他数字货币会减少TTM数量的额度\n          ")])])}]};var r=s("VU/8")(a,i,!1,function(e){s("nOft")},"data-v-2bf5f710",null);t.default=r.exports}});