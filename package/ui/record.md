# 组件编写记录

## 安装组件传递默认参数

通过安装时添加默认参数的方式的问题，更新代码时会出现不能获取到该值，只能刷新页面才能获取到，暂时放弃该方式

```js
const TabProps = {
  name: '' // [ String ] 当前tab的名称
};
Tab.install = function(Vue, options) {
  Tab.props = mergeProps(Tab.props, Object.assign(TabProps, options));
  Vue.component(Tab.name, Tab);
};
export default Tab;
```
