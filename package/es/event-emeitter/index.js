/*
 * @Descripttion: 发布、订阅模式
 * @version: 1.0.0
 * @Author: huangjunquan
 * @Date: 2019-05-24 11:24:11
 * @LastEditors: huangjunquan
 * @LastEditTime: 2019-06-25 14:21:54
 */

export default function EventEmeitter() {
  this.events = new Map();
}
/**
 * @name: 监听名为type的事件
 * @param { type } [ string ]
 * @param { fn } [ function ]
 * @return: 当前实例
 */
EventEmeitter.prototype.addListener = function(type, fn) {
  if (typeof type !== "string" || type === "") {
    throw new Error("The first argument must be string and it must be not empty.");
  }

  if (typeof fn !== "function") {
    throw new Error("The second argument must be function.");
  }

  let handler = this.events.get(type);
  if (!handler) {
    this.events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    this.events.set(type, [handler, fn]);
  } else {
    handler.push(fn);
  }
  return this;
};
/**
 * @name 触发名为type的事件
 * @param { type } [string]
 * @param { ...args } [ any ]
 * @return 当前实例
 */
EventEmeitter.prototype.emit = function(type, ...args) {
  if (typeof type !== "string" || type === "") {
    throw new Error("The first argument must be string and it must be not empty.");
  }
  let handler = this.events.get(type);
  if (!handler) {
    throw new Error("The event " + type + " is not addListener.");
  }

  if (Array.isArray(handler)) {
    handler.forEach(handlerItem => {
      handlerItem.call(this, ...args);
    });
  } else if (typeof handler === "function") {
    handler.call(this, ...args);
  }
  return this;
};
/**
 * @name: 移除监听事件
 * @param {type} 事件名
 * @return: 当前实例
 */
EventEmeitter.prototype.removeListener = function(type) {
  if (typeof type !== "string" || type === "") {
    throw new Error("The first argument must be string and it must be not empty.");
  }
  this.events.delete(type);
};

