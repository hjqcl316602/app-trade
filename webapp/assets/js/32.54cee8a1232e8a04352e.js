webpackJsonp([32],{"t+nv":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"",data:()=>({bind:{code:""},agency:{value:0},message:{},follower:[]}),props:{},computed:{},methods:{init(){this.getAgencyInfo()},getAgencyInfo(){this.$http.post(this.host+"/uc/agency/info").then(t=>{var e=t.body;if(0===e.code){this.message=e.data;let t=this.message.follower,s=[];for(let e=0;e<t.length;e++){let i=Object.assign({handler:0},t[e]);s.push(i)}this.follower=s}else this.$Message.error(e.message)})},bindAgencyInfo(){if(!this.bind.code)return this.$Message.error("请输入您推荐人的推荐码"),!1;this.$http.post(this.host+"/uc/agency/bind",{promotionCode:this.bind.code}).then(t=>{var e=t.body;0===e.code?(this.$Message.success(e.message),this.init()):this.$Message.error(e.message)})},updatePercentBefore(t){if(null==this.agency.value)return this.$Message.error("请输入0-100的数字作为分成比例"),!1;let e=Number(this.message.memberPercent||this.message.highPercent||1.7),s=Number(this.message.lowPercent||1.2),i=((e-s)*this.agency.value/100+s).toFixed(4),a=`你是否确定修改团队成员【${t.userName}】的分成比例为【${this.agency.value}%】？预计分成值为【${i}】。当日生效`;this.$Modal.confirm({title:"确认信息",content:a,onOk:()=>{this.updatePercent(t.memberId)}})},updatePercent(t){this.$http.post(this.host+"/uc/agency/updateAgencyPercent",{memberId:t,bonusPercent:this.agency.value}).then(t=>{var e=t.body;0===e.code?(this.$Message.success(e.message),this.init()):this.$Message.error(e.message)})},handlerFollower(t,e,s){"cancel"===t?this.follower[e].handler=0:"update"===t?(this.follower.forEach(t=>{t.handler=0}),this.follower[e].handler=1,this.agency.value=s.bonusPercent):"save"===t&&this.updatePercentBefore(s)}},mounted(){this.init()}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-wrapper is-wrapper--right vi-padding--large"},[t._m(0),t._v(" "),t._e(),t._v(" "),s("div",[s("div",{staticClass:"app-border app-border-bottom"},[s("div",{staticClass:"vi-flex vi-padding ",staticStyle:{"line-height":"40px"}},[t._m(2),t._v(" "),s("div",{staticClass:"vi-flex--1 vi-padding-left--large vi-padding-right--large"},[t.message.parentName?s("span",[t._v(t._s(t.message.parentName))]):s("div",[s("i-input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"请输入您推荐人的推荐码"},model:{value:t.bind.code,callback:function(e){t.$set(t.bind,"code",e)},expression:"bind.code"}}),t._v(" "),s("i-button",{staticClass:"vi-margin-left",attrs:{type:"primary"},on:{click:t.bindAgencyInfo}},[t._v("\n              绑定\n            ")]),t._v(" "),s("span",{staticClass:"vi-color--danger"},[t._v("\n              请绑定您的推荐人，获取推广红利\n            ")])],1)])])]),t._v(" "),s("div",{staticClass:"app-border app-border-bottom"},[s("div",{staticClass:"vi-flex vi-padding ",staticStyle:{"line-height":"40px"}},[t._m(3),t._v(" "),s("div",{staticClass:"vi-flex--1 vi-padding-left--large vi-padding-right--large"},[s("span",[t._v(t._s(t.message.promotionCode||"--"))])])])]),t._v(" "),s("div",{staticClass:"app-border app-border-bottom"},[s("div",{staticClass:"vi-flex vi-padding ",staticStyle:{"line-height":"40px"}},[t._m(4),t._v(" "),s("div",{staticClass:"vi-flex--1 vi-padding-left--large vi-padding-right--large"},[s("span",[t._v(t._s(t.message.memberPercent||"--")+"%")])])])]),t._v(" "),s("div",{},[s("div",{staticClass:"vi-flex vi-padding ",staticStyle:{"line-height":"40px"}},[t._m(5),t._v(" "),s("div",{staticClass:"vi-flex--1 vi-padding-left--large vi-margin-right--large"},[t.follower.length>0?s("div",[s("div",{staticClass:"app-border app-border-bottom"},[s("Row",[s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("编号")])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("昵称")])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("今日收款")])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("全部收款")])])]),t._v(" "),s("i-col",{attrs:{span:"5"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("分成值")])])]),t._v(" "),s("i-col",{attrs:{span:"7"}},[s("div",{staticClass:"vi-padding"},[s("span",{staticClass:"vi-font-weight--bold"},[t._v("分成比例")])])])],1)],1),t._v(" "),t._l(t.follower,function(e,i){return s("div",{staticClass:"app-border app-border-bottom"},[s("Row",[s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",[t._v(t._s(e.memberId))])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",[t._v(t._s(e.userName))])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",[t._v(t._s(e.totayAmount||"--"))])])]),t._v(" "),s("i-col",{attrs:{span:"3"}},[s("div",{staticClass:"vi-padding"},[s("span",[t._v(t._s(e.totalAmount||"--"))])])]),t._v(" "),s("i-col",{attrs:{span:"5"}},[s("div",{staticClass:"vi-padding"},[s("span",[t._v(t._s(e.agencyPercent||"--"))])])]),t._v(" "),s("i-col",{attrs:{span:"7"}},[s("div",{staticClass:"vi-padding"},[1===e.handler?s("div",[s("Input-number",{attrs:{max:100,min:0},model:{value:t.agency.value,callback:function(e){t.$set(t.agency,"value",e)},expression:"agency.value"}}),t._v(" "),s("span",[t._v("%")]),t._v(" "),s("i-button",{attrs:{type:"primary"},on:{click:function(s){t.handlerFollower("save",i,e)}}},[t._v("\n                        保存\n                      ")]),t._v(" "),s("i-button",{attrs:{type:"error"},on:{click:function(s){t.handlerFollower("cancel",i,e)}}},[t._v("\n                        取消\n                      ")])],1):s("div",[s("span",{staticClass:"vi-margin-right"},[t._v("\n                        "+t._s(e.bonusPercent||"--")+"%\n                      ")]),t._v(" "),s("i-button",{attrs:{type:"default"},on:{click:function(s){t.handlerFollower("update",i,e)}}},[t._v("\n                        修改\n                      ")])],1)])])],1)],1)})],2):s("div",[s("span",[t._v("--")])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"vi-padding--large"},[e("div",{staticClass:"vi-flex vi-align-items--center"},[e("i",{staticClass:"app-tag is-tag--rect vi-margin-right--large"}),this._v(" "),e("span",{staticClass:"vi-font-size--small"},[this._v("推广")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"vi-center"},[e("div",[e("div",[e("span",[this._v("\n            是的山东快书来得快\n          ")])]),this._v(" "),e("div",[e("span",[this._v("\n            的实例多亏了斯柯达\n          ")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large",staticStyle:{width:"142px"}},[e("span",[this._v("我的推荐人")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large",staticStyle:{width:"142px"}},[e("span",[this._v("我的推荐码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large",staticStyle:{width:"142px"}},[e("span",[this._v("我的分成值")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large",staticStyle:{width:"142px"}},[e("span",[this._v("我的团队")])])}]},n=s("VU/8")(i,a,!1,null,null,null);e.default=n.exports}});