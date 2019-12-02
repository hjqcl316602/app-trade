/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 14:51:55
 * @LastEditTime: 2019-08-10 09:53:13
 * @LastEditors: Please set LastEditors
 * 注意事项
 * 1. 通过安装时添加默认参数的方式的问题，更新代码时会出现不能获取到该值，只能刷新页面才能获取到，暂时放弃该方式。
    const TabProps = {
      name: '' // [ String ] 当前tab的名称
    };
    Tab.install = function(Vue, options) {
      Tab.props = mergeProps(Tab.props, Object.assign(TabProps, options));
      Vue.component(Tab.name, Tab);
    }; 
    export default Tab;
 */


 
export let input = {
  border: true, // 是否显示border
  borderType: 'round', // border的类型 top bottom round
  borderStyleType: 'solid', // border样式的类型，包括 solid dashed
  borderWeightType: 'half', // border粗细类型 half thin thiner
  radius: false, // 是否需要radius,当borderType=round才有效
  radiusType: 'normal', // border-radius的大小 normal round
  size: 'medium', // 尺寸类型,包括smaller small medium large larger,
  placeholder: '', //提示语
  type: 'text', //输入的类型,
  readonly: false, // 是否是只读性
  align: 'left' // 文本对齐方式
};

export let image = {
  src: '', // 图片地址
  lazy: true, //是否懒加载
  lazyThreshold: 40, // 懒加载阈值，即image的顶部距离窗口的底部的差值
  lazyDuration: 1000, // 懒加载图片定时器的时差
  fillType: 'width', //填充方式  width（宽度100%） height（高度100%） min（至少一边100%） max（至多一边100%） cover（两边100%）
  alignType: 'center', // 对齐方式center top bottom left right top-left top-right bottom-left bottom-right
  width: '', // 图片宽
  height: '' // 图片高
};

export let slider = {
  layerColor: '#e5e5e5',
  color: '#000',
  size: 2
};

export let upload = {
  layerSize: 40, // 当其内部是默认的slot，可以设置其尺寸
  accept: 'image/*', // 接受的类型
  isRepeat: false //是否可以重复选择
};

export let tag = {
  label: '', // 显示信息
  direction: 'top-right' //位置信息 top-right top-left bottom-right bottom-left top-center bottom-center left-center right-center
};

export let icon = {
  name: 'tupian', //名称
  size: null, //icon 字体大小,不设置默认值是为了能添加class属性覆盖
  color: '' // icon的颜色
};

export let ratio = {
  ratio: 1 // 等比缩放比例 ratio =  宽/高
};

export let accordion = {
  value: '', // v-model 当前选中的名称
  item: {
    name: '', // 名称，
    maxHeight: 100 // 设置一个最大高度 作用于动画
  }
};

export let mask = {
  value: false,
  closable: true, // 背景是否可单击关闭,
  scrollable: false // 页面是否可滚动
};

export let message = {
  message: '', // 显示的信息
  type: 'primary', // 类型 waring success danger primary default
  zIndex: 999,
  lock: true // 是否阻止用户进行操作，单击事件，复制等
};

export let confirm = {
  value: false,
  title: '',
  closable: true, // 背景是否可单击关闭,
  scrollable: false, // 是否禁止页面滚动
  maskShow: true, //是否显示背景
  okShow: true,
  CancelShow: true,
  okText: '确认',
  cancalText: '取消'
};
