/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 09:51:00
 * @LastEditTime: 2019-09-04 11:28:08
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Message from "./message.vue";

let Instance;
let zIndex = 99999;
let MessageInstance = function(
  message,
  duration = 1500,
  lock = false,
  type = "primary"
) {
  if (!Instance) {
    Instance = Vue.extend(Message);
  }
  zIndex++;
  let component = new Instance({ propsData: { type, message, zIndex, lock } });
  let elem = component.$mount().$el;
  document.body.appendChild(elem);
  let status = false;
  setTimeout(() => {
    component.changeVisible((status = true));
  }, 20);
  setTimeout(() => {
    component.changeVisible((status = false));
  }, duration);

  elem.addEventListener("transitionend", function(e) {
    if (!status && elem) {
      document.body.removeChild(elem);
      elem = null;
    }
  });
};
MessageInstance.danger = (message, duration, lock) =>
  MessageInstance(message, duration, lock, "danger");
MessageInstance.warning = (message, duration, lock) =>
  MessageInstance(message, duration, lock, "warning");
MessageInstance.success = (message, duration, lock) =>
  MessageInstance(message, duration, lock, "success");
MessageInstance.primary = (message, duration, lock) =>
  MessageInstance(message, duration, lock, "primary");
MessageInstance.default = (message, duration, lock) =>
  MessageInstance(message, duration, lock, "default");
MessageInstance.install = function(Vue) {
  Vue.prototype.$message = MessageInstance;
};

export default MessageInstance;
