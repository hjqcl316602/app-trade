webpackJsonp([23],{aS6m:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:()=>({pageNo:1,pageSize:10,totalNum:0,FAQList:[]}),created:function(){this.init()},computed:{lang(){return this.$store.state.lang}},methods:{init(){this.$store.state.HeaderActiveName="1-7",this.$store.commit("navigate","nav-service"),this.loadDataPage(this.pageNo)},loadDataPage(t){var e={};e.pageNo=t,e.pageSize=this.pageSize,this.$http.post(this.host+this.api.uc.announcement,e).then(t=>{var e=t.body;if(0==e.code){if(0==e.data.content.length)return;this.FAQList=e.data.content,this.totalNum=e.data.totalElements}else this.$Notice.error({title:this.$t("common.tip"),desc:e.message})})},noticedeail(t){var e={path:"/notice/index",query:{id:t}};this.$router.push(e)},titleLang:t=>new RegExp("[\\u4E00-\\u9FFF]+","g").test(t)?"简体中文":"English"}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notice"},[t._m(0),t._v(" "),i("div",{staticClass:"main"},[i("div",{staticClass:"list"},t._l(t.FAQList,function(e){return i("div",{staticClass:"item",on:{click:function(a){t.noticedeail(e.id)}}},[i("span",{staticClass:"text"},[t._v(t._s(e.title))]),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:0==e.isTop,expression:"item.isTop==0"}],staticClass:"iconimg",attrs:{src:a("qvs8"),alt:""}}),t._v(" "),i("span",{staticClass:"time"},[t._v("\n          "+t._s(e.createTime)+"\n        ")])])})),t._v(" "),i("div",{staticClass:"page"},[i("Page",{attrs:{total:t.totalNum,pageSize:t.pageSize,current:t.pageNo},on:{"on-change":t.loadDataPage}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("span",[this._v("公告板")])])}]};var n=a("VU/8")(i,s,!1,function(t){a("tJFV")},"data-v-ab4e78b8",null);e.default=n.exports},tJFV:function(t,e){}});