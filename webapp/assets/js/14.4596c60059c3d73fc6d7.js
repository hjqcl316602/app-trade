webpackJsonp([14],{"6eCV":function(t,a){},Snxd:function(t,a){},kRNl:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={data(){return{data:{info:{}},queryId:"",title:"",time:"",content:"",initLang:this.$store.state.lang}},created:function(){this.initialize();this.fetchData(),this.$store.commit("navigate","nav-service")},computed:{lang(){return this.$store.state.lang!=this.initLang&&this.$router.back(),this.$store.state.lang}},methods:{initialize(){this.loadNoticeInfo()},loadNoticeInfo(){let t=this.$route.query.id;null!=t&&""!=t?this.$http.post(this.host+"/uc/announcement/more",{id:t}).then(t=>{var a=t.body;if(0==a.code){const t=a.data;this.data=t}}):this.$router.push("/notice")},fetchData(){this.$route.query.id;this.loadNoticeInfo()}},watch:{$route:"fetchData"}},n={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"notice"},[i("div",{staticClass:"banner"}),t._v(" "),i("div",{staticClass:"content-wrap"},[i("router-link",{staticClass:"link",attrs:{to:"../notice"}},[t._v(" <公告列表")]),t._v(" "),i("div",{staticClass:"header"},[i("h2",[t._v(t._s(t.data.info.title))]),t._v(" "),i("span",[t._v(t._s(t.data.info.createTime))])]),t._v(" "),i("div",{staticClass:"content"},[i("span",{domProps:{innerHTML:t._s(t.data.info.content)}})]),t._v(" "),i("div",{staticClass:"nav-bottom"},[t.data.back?i("div",{staticClass:"left"},[i("router-link",{staticClass:"link",attrs:{to:"../notice/index?id="+t.data.back.id}},[t._v("\n          <上一篇\n          "),i("p",[t._v(t._s(t.data.back.title))])])],1):t._e(),t._v(" "),t.data.next?i("div",{staticClass:"right"},[i("router-link",{staticClass:"link",attrs:{to:"../notice/index?id="+t.data.next.id}},[t._v("下一篇>\n          "),i("p",[t._v(t._s(t.data.next.title))])])],1):t._e()])],1)])},staticRenderFns:[]};var s=i("VU/8")(e,n,!1,function(t){i("Snxd"),i("6eCV")},"data-v-6dfe3086",null);a.default=s.exports}});