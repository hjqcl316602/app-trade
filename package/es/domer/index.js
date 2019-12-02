/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 11:43:02
 * @LastEditTime: 2019-08-23 11:21:11
 * @LastEditors: Please set LastEditors
 */
import checker from "./checker";
import classer from "./classer";
import getScrollbarWidth from "./getScrollbarWidth";
import heighter from "./heighter";
import listener from "./listener";
import clienter from "./clienter";
import queryer from "./queryer";
import scroller from "./scroller";
import styler from "./styler";

export default {
  classer,
  checker,
  getScrollbarWidth,
  heighter,
  listener,
  clienter,
  queryer,
  scroller,
  styler
};

// window.innerHeight 各大浏览器表现一致

// clientHeight | scrollHeight | offsetHeight |  offsetTop | scrollTop

// 普通的dom元素，即在非document.body 和 document.documentElement下，各大浏览器的值均一致
// clientHeight : 元素可见高度，包括padding，不包括border，滚动条，必须是块级元素
// scrollHeight : 元素内部可滚动的像素
// offsetHeight : 元素可见高度，包括padding，border，滚动条，也必须是块级元素
// offsetTop : 元素顶部距离父元素的顶部的距离
// scrollTop : 内部的元素被卷起的高度，该值可读也可设置

// 在document.body 和 document.documentElement下
// height:400px,padding:20px,border:10px
// wh - window.innerHeight
// 小于wh时
// 电脑端
// document.body.clientHeight - 460
// document.body.scrollHeight - 460
// document.body.offsetHeight - 460
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - wh
// document.documentElement.offsetHeight - 460
//  手机端
// document.body.clientHeight - 460
// document.body.scrollHeight - wh
// document.body.offsetHeight - 460
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - 460
// document.documentElement.offsetHeight - 460

// height:400px,padding:20px,border:10px,margin-bottom:20px
// 电脑端
// 谷歌
// document.body.clientHeight - 460
// document.body.scrollHeight - 480
// document.body.offsetHeight - 460
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - wh
// document.documentElement.offsetHeight - 480
// 火狐 IE
// document.body.clientHeight - 460
// document.body.scrollHeight - 460
// document.body.offsetHeight - 460
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - wh
// document.documentElement.offsetHeight - 480
// 手机端
// document.body.clientHeight - 460
// document.body.scrollHeight - wh
// document.body.offsetHeight - 460
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - 480
// document.documentElement.offsetHeight - 480

// 大于wh时
// height:1000px,padding:20px,border:10px
// 电脑端 + 手机端
// document.body.clientHeight - 1060
// document.body.scrollHeight - 1060
// document.body.offsetHeight - 1060
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - 1060
// document.documentElement.offsetHeight - 1060

// height:1000px,padding:20px,border:10px
// 电脑端 + 谷歌 + 手机端
// document.body.clientHeight - 1060
// document.body.scrollHeight - 1080
// document.body.offsetHeight - 1060
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - 1080
// document.documentElement.offsetHeight - 1080
// 电脑端 + 火狐 + IE
// document.body.clientHeight - 1060
// document.body.scrollHeight - 1060
// document.body.offsetHeight - 1060
// document.documentElement.clientHeight - wh
// document.documentElement.scrollHeight - 1080
// document.documentElement.offsetHeight - 1080

// 由以上得知，document.documentElement.offsetHeight是文档的高度最好的期望值
