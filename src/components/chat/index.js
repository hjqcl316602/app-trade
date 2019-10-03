
import Chat from './chat.vue'

export default {
  install:function(Vue,params) {
      Vue.component(Chat.name,Chat)
  }
}