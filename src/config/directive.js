// 动态css
import Vue from 'vue'
import { css, flex, flexItem } from "store-vue-directive";
let color = [
  { label: 'primary', value: '#f0ac19' },
  { label: 'danger', value: '#f15057' },
  { label: 'success', value: '#00b275' }
]
let backgroundColor = [
  { label: 'primary', value: "#f0ac19" }
] 
Vue.use(css, { configs: { color, backgroundColor } }).use(flex).use(flexItem);