webpackJsonp([8],{"9zwK":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("0tEf"),i=e("O3w4");let n=e("09cW");var o={props:["msg","orderType"],data:()=>({audioSrc:n,fOpenAudio:!0,fOpenNotice:!1,showMore:!0,popup:{picture:{show:!1,value:""}},msgParams:{pic:"",message:"",orderId:"",minChatId:"",loading:!1,pageSize:20,push:{finished:!1}},msgLists:[],message:{}}),computed:{msgnameS:function(){return(this.msg.otherSide+"").slice(0,1)},user:function(){return JSON.parse(localStorage.getItem("MEMBER"))},usernameS:function(){return(this.user.username+"").slice(0,1)},orderId:function(){return this.$route.query.tradeId}},mounted(){this.init(),this.getChatHistory(),this.createSocketConnect(),this.getClipboardImage()},watch:{processData:"scrollToBottom"},methods:{init:function(){let t=localStorage.getItem("app/order/custom/message");this.message=t?JSON.parse(t):{}},getClipboardImage(){this.$refs.editable.onpaste=(t=>{let s=t.clipboardData.items[0];if("file"===s.kind&&-1!==s.type.indexOf("image/"))return this.sendPicture(s.getAsFile(),"clipboard"),!1})},showPicture(t){this.popup.picture.value=t,this.popup.picture.show=!0},scrollToBottom:function(){setTimeout(()=>{var t=document.getElementById("scrollChat");t.scrollTop=t.scrollHeight},300)},playAudio:function(){var t=document.getElementById("noticeMusic");null!==t&&t.play()},handleNoticeClick:function(){this.fOpenNotice?window.Notification?"default"==Notification.permission?(this.$Message.info("请点击允许进行开启!"),Notification.requestPermission().then(function(t){"denied"==t&&this.$Message.info("您已屏蔽消息提醒，如需开通，请查看帮助!")})):"denied"==Notification.permission?this.$Message.info("您已屏蔽消息提醒，如需开通，请查看帮助!"):this.$Message.info("您已开启桌面消息提醒!"):this.$Message.info("您的浏览器不支持该功能"):this.$Message.info("您已关闭桌面消息提醒!")},handleAudioClick:function(){this.fOpenAudio?this.$Message.info("您已开启声音消息提醒!"):this.$Message.info("您已关闭声音消息提醒!")},createSocketConnect(){let t=this;new Promise((s,e)=>{this.closeSocket();var n=new i(this.host+"/chat/socket/chat-webSocket");this._stompClient=a.over(n),this._stompClient.debug=function(t){},this._stompClient.connect({},e=>{t.$Notice.success({top:50,duration:3,title:"提示",desc:"聊天室连接成功，可以进行聊天了~"}),s()},s=>{t.$Notice.error({top:50,duration:3,title:"提示",desc:"聊天室连接失败，请重试！"}),e()})}).then(s=>{this._stompClient.subscribe("/topic/chatMsg/cd/"+t.msg.myId,function(s){let e=JSON.parse(s.body);if(("custom"!==t.orderType||3==e.uidType)&&e.orderSn==t.msg.orderSn&&e.uidFrom!=t.msg.myId){if(t.msgLists.push(e),t.fOpenNotice&&window.Notification&&"granted"==Notification.permission){var a=new Notification(t.msg.otherSide+"：",{body:e.content,icon:"https://bihuo-ex.oss-ap-southeast-1.aliyuncs.com/FAA55D97ED0370F08273C3A94F765C22.png"});a.onclick=function(){a.close()}}t.fOpenAudio&&t.playAudio(),t.scrollToBottom()}})})},closeSocket(){this._stompClient&&(this._stompClient.disconnect(),this._stompClient=null)},sendSocketMessage:function(t){let s={};s.uidFrom=this.msg.myId,s.nameFrom=this.user.username,s.orderId=this.msg.orderId,s.orderSn=this.msg.orderSn,s.content=t.content,s.type=t.type,"custom"==this.orderType?(s.uidType=4,s.nameTo=this.message.kfName,s.uidTo=this.message.kfId):(s.uidType=6,s.nameTo=this.msg.otherSide,s.uidTo=this.msg.hisId),this.msgLists.push(s),this.scrollToBottom(),this._stompClient.send("/app/message/chat",{},JSON.stringify(s))},sendMessage:function(){this.msgParams.message?(this.sendSocketMessage({content:this.msgParams.message,type:0}),this.msgParams.message=""):this.$Message.info(this.$t("otc.chatline.contentmsg"))},sendPicture:function(t,s="local"){let e=t;"local"===s&&(e=t.target.files[0]);let a=new FormData;a.append("file",e),this.$http.post(this.image.compress,a).then(t=>{let s=t.data;"000"===s.code?this.sendSocketMessage({content:s.data&&s.data.url,type:1}):this.$Message.error("发送图片失败！")}).catch(()=>{this.$Message.error("发送图片失败！")})},getChatHistory:function(t=!1){if(this.msgParams.loading)return this.$Message.info("请稍等，正在获取聊天记录！");this.msgParams.loading=!0,this.msgParams.minChatId=t?this.msgLists[0].chatId:0;let s={minChatId:this.msgParams.minChatId,orderId:this.msg.orderId},e="custom"==this.orderType?"/chat/getHistoryMessageCdToKf.do":"/chat/getHistoryMessageCdToCd.do";this.$http.post(this.host+e,s).then(s=>{this.msgParams.loading=!1;let e=s.body;if("000"===e.code){let s=e.data?e.data.reverse():[];this.msgParams.push.finished=this.msgParams.pageSize>s.length,t?this.msgLists=[...s,...this.msgLists]:(this.msgLists=s,this.scrollToBottom())}else this.$Message.error("获取历史聊天记录失败！")}).catch(t=>{this.msgParams.loading=!1,this.$Message.error("获取历史聊天记录失败！")})},isChatType(t){let s=0,e=String(t.uidFrom),a=localStorage.getItem("app/order/custom/message"),i=a?JSON.parse(a):{};return e==i.memberId&&(s=2),e==i.customerId&&(s=3),e.indexOf("_")>-1&&e.split("_")[0]==i.customerId&&(s=1),e.indexOf("_")>-1&&e.split("_")[0]==i.memberId&&(s=4),s},CurentTime:function(){var t=new Date,s=t.getFullYear(),e=t.getMonth()+1,a=t.getDate(),i=t.getHours(),n=t.getMinutes(),o=s+"-";return e<10&&(o+="0"),o+=e+"-",a<10&&(o+="0"),o+=a+" ",i<10&&(o+="0"),o+=i+":",n<10&&(o+="0"),o+=n}},beforeDestroy(){this.closeSocket()}},r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("Modal",{staticClass:"ivu-modal--preview",attrs:{width:"100%",title:"图片预览"},model:{value:t.popup.picture.show,callback:function(s){t.$set(t.popup.picture,"show",s)},expression:"popup.picture.show"}},[a("img",{staticClass:"is-preview",attrs:{src:t.popup.picture.value,alt:""}})]),t._v(" "),a("div",{staticClass:"chat-line"},[a("div",{staticClass:"scroll-chat",attrs:{id:"scrollChat"}},[a("div",{staticClass:"chat-container-box",attrs:{id:"sysbox"}},[a("div",{staticClass:"system-box"},[a("p",{directives:[{name:"show",rawName:"v-show",value:1==t.msg.status,expression:"msg.status == 1"}],staticClass:"msg-content"},[t._v("\n            "+t._s(t.$t("otc.chatline.status_1"))+"\n          ")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:2==t.msg.status,expression:"msg.status == 2"}],staticClass:"msg-content"},[t._v("\n            "+t._s(t.$t("otc.chatline.status_2"))+"\n          ")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:3==t.msg.status,expression:"msg.status == 3"}],staticClass:"msg-content"},[t._v("\n            "+t._s(t.$t("otc.chatline.status_3"))+"\n          ")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:4==t.msg.status,expression:"msg.status == 4"}],staticClass:"msg-content"},[t._v("\n            "+t._s(t.$t("otc.chatline.status_4"))+"\n          ")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:0==t.msg.status,expression:"msg.status == 0"}],staticClass:"msg-content"},[t._v("\n            "+t._s(t.$t("otc.chatline.status_5"))+"\n          ")])])]),t._v(" "),a("h5",{directives:[{name:"show",rawName:"v-show",value:!t.msgParams.push.finished,expression:"!msgParams.push.finished"}],staticClass:"more"},[a("Icon",{staticClass:"clock",attrs:{type:"ios-clock-outline"}}),t._v(" "),a("span",{on:{click:function(s){t.getChatHistory(!0)}}},[t._v(t._s(t.$t("otc.chatline.loadmore")))])],1),t._v(" "),t._l(t.msgLists,function(s,e){return[a("div",{directives:[{name:"show",rawName:"v-show",value:s.uidFrom!=t.msg.myId,expression:"item.uidFrom != msg.myId"}],key:e,staticClass:"chat-container-box left"},[a("div",{staticClass:"user-chat-box"},[a("div",{staticClass:"user-avatar-box"},[a("div",{staticClass:"avatar-box"},[a("div",{staticClass:"user-face user-avatar-public"},["custom"==t.orderType?[3==s.uidType?[a("span",{staticClass:"user-avatar-in "},[t._v("客服")])]:t._e()]:[a("span",{staticClass:"user-avatar-in "},[t._v(t._s(s.nameFrom&&s.nameFrom.slice(0,1)))])]],2)])]),t._v(" "),a("div",{staticClass:"user-content-box"},[a("p",{staticClass:"user-name"},[t._v(t._s(s.nameFrom))]),t._v(" "),a("div",{staticClass:"chat-info"},[a("div",{staticClass:"user-desc"},[a("p",{staticClass:"icon"}),t._v(" "),0===s.type?a("em",{staticClass:"input-in"},[t._v(t._s(s.content))]):t._e(),t._v(" "),1===s.type?a("img",{staticStyle:{"max-width":"200px","max-height":"200px"},attrs:{src:s.content,alt:""},on:{click:function(e){t.showPicture(s.content)}}}):t._e()]),t._v(" "),a("span",{staticClass:"times"},[t._v(t._s(s.sendTimeStr))])])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.uidFrom==t.msg.myId,expression:"item.uidFrom == msg.myId"}],key:e+"index",staticClass:"chat-container-box"},[a("div",{staticClass:"user-chat-box self-chat-box"},[a("div",{staticClass:"user-content-box"},[a("p",{staticClass:"user-name"},[t._v(t._s(t.user.username))]),t._v(" "),a("div",{staticClass:"chat-info"},[a("div",{staticClass:"user-desc self-desc"},[a("p",{staticClass:"icon"}),t._v(" "),0===s.type?a("em",{staticClass:"input-in"},[t._v(t._s(s.content))]):t._e(),t._v(" "),1===s.type?a("img",{staticStyle:{"max-width":"200px","max-height":"200px"},attrs:{src:s.content,alt:""},on:{click:function(e){t.showPicture(s.content)}}}):t._e()])])]),t._v(" "),t._m(0,!0)])])]})],2),t._v(" "),a("h5",{staticClass:"spe_show"},[a("i",{staticClass:"iconfont icon-warning"}),t._v("\n      "+t._s(t.$t("otc.chatline.warning"))+"\n    ")]),t._v(" "),a("div",{staticClass:"audio-wrap"},[a("audio",{attrs:{id:"noticeMusic",src:t.audioSrc}},[t._v("\n        您的浏览器不支持 audio 标签。\n      ")])]),t._v(" "),a("div",{staticClass:"send-msg-box"},[a("div",{staticClass:"app-send"},[a("label",{staticClass:"app-send-label",attrs:{for:"file"}},[a("img",{attrs:{src:e("bSNq"),alt:""}}),t._v(" "),a("input",{staticClass:"app-send-input",staticStyle:{display:"none"},attrs:{title:"上传图片",type:"file",accept:"image/jpg,image/jpeg,image/png",id:"file"},on:{change:t.sendPicture}})])]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.msgParams.message,expression:"msgParams.message"}],ref:"editable",staticStyle:{"background-attachment":"scroll","background-size":"16px 18px","background-position":"98% 50%"},attrs:{autocomplete:"off",type:"text",placeholder:t.$t("otc.chatline.contenttip")},domProps:{value:t.msgParams.message},on:{keyup:function(s){return"button"in s||!t._k(s.keyCode,"enter",13,s.key,"Enter")?t.sendMessage(s):null},input:function(s){s.target.composing||t.$set(t.msgParams,"message",s.target.value)}}}),t._v(" "),a("button",{staticClass:"send-btn",on:{click:t.sendMessage}},[a("Icon",{attrs:{type:"md-paper-plane",size:"28",color:"#f0ac19"}})],1),t._v(" "),a("div",{staticClass:"msg-notice"},[a("Checkbox",{on:{"on-change":t.handleNoticeClick},model:{value:t.fOpenNotice,callback:function(s){t.fOpenNotice=s},expression:"fOpenNotice"}},[t._v("开启桌面消息提醒")]),t._v(" "),a("Checkbox",{on:{"on-change":t.handleAudioClick},model:{value:t.fOpenAudio,callback:function(s){t.fOpenAudio=s},expression:"fOpenAudio"}},[t._v("开启声音消息提醒")])],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"user-avatar-box"},[s("div",{staticClass:"avatar-box"},[s("div",{staticClass:"user-face user-avatar-public"},[s("span",{staticClass:"user-avatar-in"},[this._v("我")])])])])}]};var l=e("VU/8")(o,r,!1,function(t){e("IGxK")},"data-v-ed5aaefe",null).exports,c=(e("0tEf"),e("O3w4"),{components:{chatline:l},data:()=>({watching:!1,stompClient:null,reserveTime:"",reserveInteval:null,fundpwd:"",statusBtn:0,tradeType:0,isloading:!0,payTime:"",statusText:"",modal1:!1,modal2:!1,modal3:!1,modal4:!1,modal5:!1,modal6:!1,formItem:{select:"",remark:""},msg:{},realName:"",payInfo:{},bankInfo:{},alipay:{},wechatPay:{},aggregate:{},payCodeUrl:"",payCodeType:0,payPopupMessage:["请用银行卡进行转账","请用手机支付宝扫码或转账","请用手机微信扫码","请用银行卡进行转账"],payCode:{value:"",size:300,backgroundAlpha:1,background:"white",foreground:"black",level:"L"},payStatus:{wx:!1,bank:!1,ali:!1,aggregate:!1},tranfer:{loading:!1,open:!1,number:null,orderSn:"",unit:"",jyPassword:"",otherSide:"",balance:0},params:{orderSn:"",type:"",showBtn:!1},release:{timer:null,backtime:0}}),mounted(){this.init()},computed:{},watch:{modal5(){this.fundpwd=""},"tranfer.open"(){this.tranfer.jyPassword=""}},methods:{init(){this.params.orderSn=this.$route.query.orderSn,this.params.type=this.$route.query.type,this.setDetailTimer()},getTransferBalance(){this.$http.post(this.host+"/otc/advertise/init").then(t=>{var s=t.body;0===s.code?s.data?this.tranfer.balance=s.data.balance:this.$Message.error("获取用户余额信息失败！"):this.$Message.error(s.message)})},setDetailTimer(){this.clearDetailTimer(),this.getDetail(),this._detailTimer=setInterval(()=>{this.getDetail()},1e4)},clearDetailTimer(){clearInterval(this._detailTimer),this._detailTimer=null},isShowCloseCustomBtn(){let t=localStorage.getItem("app/order/custom/message"),s=t?JSON.parse(t):{};return"custom"===this.params.type&&msg.Id===s.memberId},beforeTranfer:function(){this.tranfer.open=!0,this.tranfer.unit=this.msg.unit,this.tranfer.orderSn=this.msg.orderSn,this.tranfer.otherSide=this.msg.otherSide,this.tranfer.number=this.msg.amount,this.getTransferBalance()},handlerCustom:function(){this.$Modal.confirm({title:"温馨提示",content:"是否确定申诉订单已处理！",onOk:()=>{this.$http.post(this.host+"/otc/order/closeAppealOrder",{orderId:this.msg.orderId}).then(t=>{0===t.body.code&&(this.$Message.success("申诉订单已处理完成！"),setTimeout(()=>{this.$router.go(-1)},1500))}).catch(()=>{this.$Message.warning("抱歉，申诉订单处理失败！")})}})},handlerTranfer:function(){return this.tranfer.number<=0?this.$Message.warning("请输入合法的数量！"):this.tranfer.jyPassword?(this.tranfer.loading&&this.$Message.warning("正在转账中..."),this.tranfer.loading=!0,void this.$http.post(this.host+"/otc/order/directTransfer",{number:this.tranfer.number,jyPassword:this.tranfer.jyPassword,orderSn:this.tranfer.orderSn}).then(t=>{this.tranfer.loading=!1,this.tranfer.open=!1;let s=t.body;0===s.code?(this.tranfer.number=0,this.$Message.success("转账成功！")):this.$Message.warning(s.message)})):this.$Message.warning("请输入您的资金密码！")},showQRCode:function(t){this.payCodeType=t,1==t?(this.payCode.value=this.alipay.alipayUrl,this.payCode.imageUrl=this.alipay.alipayCodeUrl):2==t?(this.payCode.imageUrl=this.wechatPay.qrWeCodeUrl,this.payCode.value=this.wechatPay.wechatUrl):3==t?this.payCode.value=this.bankInfo.cardNo:4==t?(this.payCode.imageUrl=this.unionpay.unionpayCodeUrl,this.payCode.value=this.unionpay.unionpayUrl):5==t&&(this.payCode.imageUrl=this.aggregate.aggregateCodeUrl,this.payCode.value=this.aggregate.aggregateUrl),this.modal6=!0},beforeAppear:function(){this.$http.post(this.host+"/otc/order/canAppeal",{orderSn:this.$route.query.tradeId}).then(t=>{var s=t.body;0===s.code?this.modal4=!0:this.$Message.error(s.message)})},beforeRelease(){this.modal5=!0,this.release.backtime=5,this.setReleaseTimer()},setReleaseTimer(){this.clearReleaseTimer(),this.release.timer=setInterval(()=>{this.release.backtime--,0===this.release.backtime&&this.clearReleaseTimer()},1e3)},clearReleaseTimer(){clearInterval(this.release.timer),this.release.timer=null},ok1(){this.$http.post(this.host+"/otc/order/pay",{orderSn:this.$route.query.tradeId}).then(t=>{var s=t.body;0==s.code?(this.$Message.success(s.message),this.getDetail()):this.$Message.error(s.message)})},ok3(){this.$http.post(this.host+"/otc/order/cancel",{orderSn:this.$route.query.tradeId}).then(t=>{var s=t.body;0==s.code?(this.$Message.success(s.message),this.getDetail()):this.$Message.error(s.message)})},ok4(){var t={};t.orderSn=this.$route.query.tradeId,t.remark=this.formItem.remark,this.$http.post(this.host+"/otc/order/appeal",t).then(t=>{var s=t.body;0==s.code?(this.$Message.success(s.message),this.getDetail()):this.$Message.error(s.message)})},ok5(){var t={};t.orderSn=this.$route.query.tradeId,t.jyPassword=this.fundpwd,""!=this.fundpwd?this.$http.post(this.host+"/otc/order/release",t).then(t=>{var s=t.body;0==s.code?(this.modal5=!1,this.$Message.success(s.message),this.getDetail()):this.$Message.error(s.message)}):this.$Message.error(this.$t("otc.chat.msg7tip"))},getDetail(){let t=this.$route.query.tradeId;Boolean(t)&&this.$http.post(this.host+"/otc/order/detail",{orderSn:t}).then(t=>{var s=t.body;if(0==s.code){this.msg=s.data;let t=localStorage.getItem("app/order/custom/message"),e=t?JSON.parse(t):{};if(this.params.showBtn="custom"==this.params.type&&this.msg.myId===e.memberId,this.payInfo=this.msg.payInfo,null==this.payInfo)this.bankInfo=this.alipay=null==this.wechatPay;else{this.bankInfo=this.msg.payInfo.bankInfo;let t=this.msg.payMode&&this.msg.payMode.split(",");this.realName=this.msg.payInfo.realName;let s=this.payInfo.alipay;t.indexOf("支付宝")>-1?(this.payStatus.ali=!0,this.alipay=s||{}):this.payStatus.ali=!1;let e=this.payInfo.wechatPay;t.indexOf("微信")>-1?(this.payStatus.wx=!0,this.wechatPay=e||{}):this.payStatus.wx=!1;let a=this.payInfo.aggregate;t.indexOf("聚合码")>-1?(this.payStatus.aggregate=!0,this.aggregate=a||{}):this.payStatus.aggregate=!1;let i=this.payInfo.bankInfo;t.indexOf("银联")>-1?(this.payStatus.bank=!0,this.bankInfo=i||{}):this.payStatus.bank=!1;let n=this.payInfo.unionpay;t.indexOf("云闪付")>-1?(this.payStatus.unionpay=!0,this.unionpay=n||{}):this.payStatus.unionpay=!1}this.statusBtn=s.data.status,this.tradeType=s.data.type,this.statusText=this.setOrderStatus(this.statusBtn),1==s.data.status?this.setBackTimer():this.clearBackTimer()}else this.$Message.error(s.message)})},setBackTimer(){this.clearBackTimer();let t=+new Date(this.msg.createTime),s=+new Date(this.msg.currentTime),e=60*Number(this.msg.timeLimit)*1e3;this.reserveTime=this.getBackTime(t,s,e),this._backTimer=setInterval(()=>{s+=1e3,this.reserveTime=this.getBackTime(t,s,e)},1e3)},clearBackTimer(){clearInterval(this._backTimer),this._backTimer=null},getBackTime(t,s,e){let a=e-(s-t);if(a<=0)return"";function i(t){return Number(t)>9?t:"0"+t}return function(t){let s=Math.floor(t/36e5),e=Math.floor((t-36e5*s)/6e4),a=Math.floor((t-36e5*s-6e4*e)/1e3);return s>0?`${s}时${i(e)}分${i(a)}秒`:e>0?`${i(e)}分${i(a)}秒`:a>0?`${i(a)}秒`:0}(a)},setOrderStatus:function(t){let s=[{status:0,text:"已取消"},{status:1,text:"等待付款"},{status:2,text:"等待放行"},{status:3,text:"已完成"},{status:4,text:"申诉中"}].find(s=>s.status===t);return!!s&&s.text}},beforeDestroy(){this.clearDetailTimer(),this.clearBackTimer()}}),d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content-wrap"},[e("input",{attrs:{type:"password",hidden:""}}),t._v(" "),e("div",{staticClass:"container chat-in-box",attrs:{id:"List"}},[e("p",{staticStyle:{padding:"10px 0 10px 20px","font-size":"16px"}},[e("span",{staticStyle:{color:"#f0a70a",cursor:"pointer"},on:{click:function(s){t.$router.go(-1)}}},[t._v(t._s(t.$t("otc.myorder")))]),t._v(" "),e("span",{staticStyle:{"font-size":"14px"}},[t._v(" > 订单详情")])]),t._v(" "),e("Row",{staticClass:"chat-in"},[e("Col",{attrs:{span:"4"}},[e("div",{staticClass:"leftmenu left-box chat-right vui-padding--large"},[e("div",{staticClass:"chat-right-in"},[0==t.tradeType?e("div",[e("div",{staticClass:"vui-margin-bottom vui-text-align--center"},[e("span",{staticClass:"vui-color--danger vui-font-weight--bold"},[t._v("温馨提示")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("1.")]),t._v(" "),e("span",[t._v("\n                  请在规定的时限内按照对方给出的账号完成支付，并在本页面点击“\n                ")]),t._v(" "),e("span",{staticClass:"vui-color--danger"},[t._v("\n                  付款完成\n                ")]),t._v(" "),e("span",[t._v("\n                  ”。转账时请在留言中备注好交易单号\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  2.卖方收到款项后会在网站确认收款，系统会自动将您所购买的数字资产发放至您的账户，请注意查收\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  3.请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成\n                ")])])]):e("div",[e("div",{staticClass:"vui-margin-bottom vui-text-align--center"},[e("span",{staticClass:"vui-color--danger  vui-font-weight--bold"},[t._v("温馨提示")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  1.\n                ")]),t._v(" "),e("span",[t._v("\n                  您所出售的数字资产，已交由平台托管冻结。请在确定收到对方付款后，点击“\n                ")]),t._v(" "),e("span",{staticClass:"vui-color--danger"},[t._v("确认放行")]),t._v(" "),e("span",[t._v("\n                  支付数字资产\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  2.请不要相信任何催促放币的理由，确认收到款项后再释放数字资产，避免造成损失！\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  3.在收到账短信后，请务必登录网上银行或手机银行确认款项是否入账，避免因收到诈骗短信错误释放数字资产！\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom",staticStyle:{"text-indent":"20px"}},[e("span",[t._v("\n                  4.请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成\n                ")])])]),t._v(" "),t._e(),t._v(" "),t._e(),t._v(" "),e("div",{staticClass:"bottom-btn"},[e("div",{staticStyle:{"padding-top":"20px"}},[e("h6",{staticStyle:{"font-weight":"600"}},[t._v("\n                  订单状态:\n                  "),e("span",[t._v(t._s(t.statusText))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.statusBtn&&0==t.tradeType,expression:"statusBtn == 1 && tradeType == 0"}]},[e("Button",{attrs:{type:"warning"},on:{click:function(s){t.modal1=!0}}},[t._v("\n                    付款完成\n                  ")]),t._v(" "),e("Button",{attrs:{type:"error"},on:{click:function(s){t.modal3=!0}}},[t._v("\n                    取消交易\n                  ")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:2==t.statusBtn&&0==t.tradeType,expression:"statusBtn == 2 && tradeType == 0"}]},[e("Button",{attrs:{type:"warning"},on:{click:t.beforeAppear}},[t._v("\n                    订单申诉\n                  ")]),t._v(" "),e("Button",{attrs:{type:"error"},on:{click:function(s){t.modal3=!0}}},[t._v("\n                    取消交易\n                  ")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:2==t.statusBtn&&1==t.tradeType,expression:"statusBtn == 2 && tradeType == 1"}]},[e("Button",{attrs:{type:"warning"},on:{click:t.beforeRelease}},[t._v("\n                    确认放行\n                  ")]),t._v(" "),e("Button",{attrs:{type:"error"},on:{click:t.beforeAppear}},[t._v("订单申诉")])],1)]),t._v(" "),e("div",{staticStyle:{"padding-top":"20px"}},[e("div",[e("Button",{attrs:{type:"warning"},on:{click:t.beforeTranfer}},[t._v("直接转账\n                  ")])],1)]),t._v(" "),t.params.showBtn?e("div",{staticStyle:{"padding-top":"20px"}},[e("div",[e("Button",{attrs:{type:"error"},on:{click:t.handlerCustom}},[t._v("关闭申诉\n                  ")])],1)]):t._e()])])])]),t._v(" "),e("Col",{attrs:{span:"20"}},[e("div",{staticClass:"vui-padding--large vui-margin-left",staticStyle:{"background-color":"#141e2b"}},[e("Row",[e("i-col",{attrs:{span:"6"}},[e("div",{staticClass:"vui-margin-bottom--large"},[e("span",{staticClass:"vui-font-weight--bold"},[e("span",{staticClass:"vui-color--primary",staticStyle:{"font-size":"24px"}},[t._v("\n                    "+t._s(t.msg.amount)+"\n                  ")]),t._v("\n                  "+t._s(t.msg.unit)+"\n                ")]),t._v(" "),e("span",[t._v(" | ")]),t._v(" "),e("span",{staticClass:"vui-font-weight--bold"},[e("span",{staticClass:"vui-color--primary",staticStyle:{"font-size":"24px"}},[t._v("\n                    "+t._s(t.msg.money)+"\n                  ")]),t._v("\n                  CNY\n                ")])]),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("订单号：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.orderSn)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("渠道编号：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.channelOrderId||"--")+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("渠道用户编号：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.subMemId||"--")+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("状态：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("h5",[t._v(t._s(t.statusText))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.statusBtn,expression:"statusBtn == 1"}],staticClass:"reserve-time"},[t._v("\n                        "+t._s(t.reserveTime)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("创建时间：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.createTime)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("交易对象：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.otherSide)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("交易价格 | CNY：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.price)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("手续费：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.commission)+"\n                      ")])])])],1)],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("交易方式：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.payMode)+"\n                      ")])])])],1)],1),t._v(" "),t.aggregate.aggregateMode?e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("收款方式：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.aggregate.aggregateMode)+"\n                      ")])])])],1)],1):t._e(),t._v(" "),t.msg.payRemark?e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("备注：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.payRemark)+"\n                      ")])])])],1)],1):t._e(),t._v(" "),t.msg.transferNumber?e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("转账数量 | TTM：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.transferNumber)+"\n                      ")])])])],1)],1):t._e(),t._v(" "),t.msg.transferTime?e("div",{staticClass:"vui-margin-bottom--large"},[e("Row",[e("i-col",{attrs:{span:"8"}},[e("div",{staticClass:"vui-text-align--right"},[e("span",{},[t._v("转账时间：")])])]),t._v(" "),e("i-col",{attrs:{span:"16"}},[e("div",{staticClass:"vui-padding-left vui-text-align--left"},[e("span",{staticClass:"vui-font-weight--bold"},[t._v("\n                        "+t._s(t.msg.transferTime)+"\n                      ")])])])],1)],1):t._e()]),t._v(" "),e("i-col",{attrs:{span:"18"}},[e("div",{staticClass:"vui-margin-bottom--large"},[t.payStatus.bank?[e("div",{staticClass:"vui-flex vui-justify-content--flex-start vui-align-items--center  ",staticStyle:{}},[e("i",{staticClass:"icons is-icons--large bankfor vui-margin-right"}),t._v(" "),e("span",{staticClass:"vui-margin-right",staticStyle:{"font-size":"24px"}},[t._v("\n                      "+t._s(t.bankInfo.bankRealName||"--")+"\n                    ")]),t._v(" "),e("i-button",{attrs:{type:"default"},on:{click:function(s){t.showQRCode(3)}}},[t._v("预览")])],1)]:t._e(),t._v(" "),t.payStatus.wx?[e("div",{staticClass:"vui-flex vui-justify-content--flex-start vui-align-items--center  ",staticStyle:{}},[e("i",{staticClass:"icons is-icons--large wechat vui-margin-right"}),t._v(" "),e("span",{staticClass:"vui-margin-right",staticStyle:{"font-size":"24px"}},[t._v("\n                      "+t._s(t.wechatPay.wechat||"--")+"\n                    ")]),t._v(" "),e("i-button",{attrs:{type:"default"},on:{click:function(s){t.showQRCode(2)}}},[t._v("预览")])],1)]:t._e(),t._v(" "),t.payStatus.ali?[e("div",{staticClass:"vui-flex vui-justify-content--flex-start vui-align-items--center  ",staticStyle:{}},[e("i",{staticClass:"icons is-icons--large alipay vui-margin-right"}),t._v(" "),e("span",{staticClass:"vui-margin-right",staticStyle:{"font-size":"24px"}},[t._v("\n                      "+t._s(t.alipay.alipayRealName||"--")+"\n                    ")]),t._v(" "),e("i-button",{attrs:{type:"default"},on:{click:function(s){t.showQRCode(1)}}},[t._v("预览")])],1)]:t._e(),t._v(" "),t.payStatus.unionpay?[e("div",{staticClass:"vui-flex vui-justify-content--flex-start vui-align-items--center  ",staticStyle:{}},[e("i",{staticClass:"icons is-icons--large unionpay vui-margin-right"}),t._v(" "),e("span",{staticClass:"vui-margin-right",staticStyle:{"font-size":"24px"}},[t._v("\n                      "+t._s(t.unionpay.unionpay||"--")+"\n                    ")]),t._v(" "),e("i-button",{attrs:{type:"default"},on:{click:function(s){t.showQRCode(4)}}},[t._v("预览")])],1)]:t._e(),t._v(" "),t.payStatus.aggregate?[e("div",{staticClass:"vui-flex vui-justify-content--flex-start vui-align-items--center  ",staticStyle:{}},[e("i",{staticClass:"icons is-icons--large polymer vui-margin-right"}),t._v(" "),e("span",{staticClass:"vui-margin-right",staticStyle:{"font-size":"24px"}},[t._v("\n                      "+t._s(t.aggregate.aggregate||"--")+"\n                    ")]),t._v(" "),e("i-button",{attrs:{type:"default"},on:{click:function(s){t.showQRCode(5)}}},[t._v("预览")])],1)]:t._e()],2),t._v(" "),t._e(),t._v(" "),this.msg.orderId?e("chatline",{attrs:{msg:t.msg,orderType:t.params.type}}):t._e()],1)],1)],1)])],1)],1),t._v(" "),e("Modal",{staticClass:"ivu-modal--left",attrs:{title:t.$t("otc.chat.tip"),"mask-closable":!1,width:"400px"},on:{"on-ok":t.ok1},model:{value:t.modal1,callback:function(s){t.modal1=s},expression:"modal1"}},[e("p",{staticStyle:{color:"red","font-weight":"bold"}},[t._v(t._s(t.$t("otc.chat.msg1")))])]),t._v(" "),e("Modal",{attrs:{title:t.$t("otc.chat.tip"),"mask-closable":!1},on:{"on-ok":t.ok3},model:{value:t.modal3,callback:function(s){t.modal3=s},expression:"modal3"}},[e("p",{staticStyle:{color:"red","font-weight":"bold"}},[t._v(t._s(t.$t("otc.chat.msg3")))])]),t._v(" "),e("Modal",{staticClass:"ivu-modal--left",attrs:{title:t.$t("otc.chat.tip"),"mask-closable":!1,width:"400px"},on:{"on-ok":t.ok4},model:{value:t.modal4,callback:function(s){t.modal4=s},expression:"modal4"}},[e("Form",{attrs:{model:t.formItem,"label-width":80}},[e("FormItem",{attrs:{label:t.$t("otc.chat.comptype")}},[e("Select",{model:{value:t.formItem.select,callback:function(s){t.$set(t.formItem,"select",s)},expression:"formItem.select"}},[e("Option",{attrs:{value:"1"}},[t._v(t._s(t.$t("otc.chat.msg4")))]),t._v(" "),e("Option",{attrs:{value:"2"}},[t._v(t._s(t.$t("otc.chat.msg5")))])],1)],1),t._v(" "),e("FormItem",{attrs:{label:t.$t("otc.chat.compremark")}},[e("Input",{attrs:{type:"textarea",autocomplete:"off",autosize:{minRows:2,maxRows:5},placeholder:t.$t("otc.chat.willcomp")},model:{value:t.formItem.remark,callback:function(s){t.$set(t.formItem,"remark",s)},expression:"formItem.remark"}})],1)],1)],1),t._v(" "),e("Modal",{attrs:{title:"放行",width:"500px"},model:{value:t.modal5,callback:function(s){t.modal5=s},expression:"modal5"}},[e("div",{attrs:{slot:"footer"},slot:"footer"},[t.release.backtime?e("i-button",{attrs:{type:"default"}},[t._v(t._s(t.release.backtime)+"秒后操作")]):e("i-button",{attrs:{type:"primary"},on:{click:t.ok5}},[t._v("确认放行")])],1),t._v(" "),e("div",{staticClass:"vui-margin-bottom"},[e("p",{staticClass:"vui-color--danger vui-font-weight--bold"},[t._v("温馨提示")]),t._v(" "),e("p",{staticClass:"vui-color--danger",staticStyle:{"text-indent":"20px","line-height":"36px"}},[t._v("\n        一、最近骗子猖獗，请再次核对金额，金额正确才放行，没有收到款或者收到金额不符款项，请务放行，\n        有任何问题请及时联系客服处理。\n      ")]),t._v(" "),e("p",{staticClass:"vui-color--danger",staticStyle:{"text-indent":"40px","line-height":"36px"}},[t._v("\n        例如：付款方会更改自己的昵称，**通过扫码向你付款5000.00元，来迷惑收款方，其实付款方只付款了0.1元，\n        已经有多名币商被骗，请一定要谨慎操作\n      ")]),t._v(" "),e("p",{staticClass:"vui-color--danger",staticStyle:{"text-indent":"20px","line-height":"36px"}},[t._v("\n        二、自己不认真核对金额造成损失的，损失由自己承担。\n      ")]),t._v(" "),e("p",{staticClass:"vui-color--danger",staticStyle:{"text-indent":"20px","line-height":"36px"}},[t._v("\n        三、请谨慎放行，确认收到款项再放行，确认收到款项再放行，确认收到款项再放行。\n      ")])]),t._v(" "),e("P",{staticStyle:{color:"red","font-weight":"bold"}},[e("Input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{type:"password",placeholder:t.$t("otc.chat.msg7"),autocomplete:"off"},model:{value:t.fundpwd,callback:function(s){t.fundpwd=s},expression:"fundpwd"}}),t._v(" "),e("Input",{attrs:{type:"password",placeholder:t.$t("otc.chat.msg7"),autocomplete:"off"},model:{value:t.fundpwd,callback:function(s){t.fundpwd=s},expression:"fundpwd"}})],1)],1),t._v(" "),e("Modal",{staticClass:"ivu-modal--left",attrs:{title:"转账给"+t.tranfer.otherSide,"mask-closable":!1,width:"400px"},model:{value:t.tranfer.open,callback:function(s){t.$set(t.tranfer,"open",s)},expression:"tranfer.open"}},[e("div",{attrs:{slot:"footer"},slot:"footer"},[e("i-button",{attrs:{type:"primary",disabled:t.tranfer.loading},on:{click:t.handlerTranfer}},[t._v("确定")])],1),t._v(" "),e("Input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{type:"password",placeholder:t.$t("otc.chat.msg7"),autocomplete:"off"},model:{value:t.fundpwd,callback:function(s){t.fundpwd=s},expression:"fundpwd"}}),t._v(" "),e("div",{staticClass:"vui-margin-bottom"},[e("div",{staticStyle:{"line-height":"36px"}},[e("span",{staticClass:"vui-color--danger vui-font-weight--bold"},[t._v("温馨提示")])]),t._v(" "),e("div",{staticStyle:{"line-height":"32px"}},[e("span",[t._v(" 当前可用数量 | "+t._s(t.msg.unit)+"： ")]),t._v(" "),e("span",{staticClass:"vui-color--danger"},[t._v("\n          "+t._s(t.tranfer.balance)+"\n        ")])]),t._v(" "),e("div",{staticStyle:{"line-height":"32px"}},[e("span",[t._v("计算格式：")]),t._v(" "),e("span",{staticClass:"vui-color--danger"},[t._v("\n          数量 = 金额 / 单价、 1 "+t._s(t.msg.unit)+" = 1 CNY/ "+t._s(t.msg.price)+" CNY\n        ")])])]),t._v(" "),e("div",{staticStyle:{"margin-bottom":"20px",display:"flex"}},[e("div",{staticClass:"vp-number--block ",staticStyle:{flex:"1"}},[e("Input-number",{attrs:{min:0,placeholder:"请输入要转账的"+t.tranfer.unit+"数量"},model:{value:t.tranfer.number,callback:function(s){t.$set(t.tranfer,"number",s)},expression:"tranfer.number"}})],1)]),t._v(" "),e("div",[e("Input",{attrs:{type:"password",placeholder:"请输入资金密码",autocomplete:"off"},model:{value:t.tranfer.jyPassword,callback:function(s){t.$set(t.tranfer,"jyPassword",s)},expression:"tranfer.jyPassword"}})],1)],1),t._v(" "),e("Modal",{staticClass:"ivu-modal--left",attrs:{width:"400px"},model:{value:t.modal6,callback:function(s){t.modal6=s},expression:"modal6"}},[e("div",{attrs:{slot:"header"},slot:"header"},[e("p",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.payPopupMessage[t.payCodeType]))])]),t._v(" "),e("div",{staticStyle:{"text-align":"center",padding:"20px 0"}},[3==t.payCodeType?e("div",{staticClass:"text-align:center;"},[e("div",{staticStyle:{color:"white","font-size":"24px","margin-bottom":"10px"}},[t._v("\n          "+t._s(t.bankInfo.bankRealName)+"\n        ")]),t._v(" "),e("div",{staticStyle:{color:"white","font-size":"24px","margin-bottom":"10px"}},[t._v("\n          "+t._s(t.bankInfo.bank)+"\n        ")]),t._v(" "),e("div",{staticStyle:{color:"white","font-size":"36px","margin-bottom":"10px"}},[t._v("\n          "+t._s(t.payCode.value)+"\n        ")])]):e("div",[t.payCode.value?e("div",{staticStyle:{position:"relative"}},[e("div",{staticStyle:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)","background-color":"white"}},[e("i",{staticClass:"icons ",class:{"alipay-plus":1==t.payCodeType,"wechat-plus":2==t.payCodeType,"unionpay-plus":4==t.payCodeType,"polymer-plus":5==t.payCodeType},staticStyle:{height:"50px",width:"50px"}})]),t._v(" "),e("qriously",{attrs:{value:t.payCode.value,size:t.payCode.size,level:t.payCode.level,background:t.payCode.background,foreground:t.payCode.foreground,backgroundAlpha:t.payCode.backgroundAlpha}})],1):e("div",[e("img",{staticStyle:{"max-height":"300px"},attrs:{src:t.payCode.imageUrl,alt:""}})])])]),t._v(" "),1==t.payCodeType?e("div",[e("div",{staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{"font-size":"16px","font-weight":"800",color:"#fff"}},[t._v("\n          "+t._s(t.alipay.alipay)+"\n        ")])]),t._v(" "),e("div",{staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{"font-size":"16px","font-weight":"800",color:"#fff"}},[t._v("\n          "+t._s(t.alipay.alipayRealName)+"\n        ")])])]):t._e(),t._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},staticRenderFns:[]};var p=e("VU/8")(c,d,!1,function(t){e("WnyZ"),e("u5qF")},"data-v-52fa4118",null);s.default=p.exports},IGxK:function(t,s){},WnyZ:function(t,s){},u5qF:function(t,s){}});