import RadioGroup from './radio-group.vue';
import Radio from './radio.vue';
import { mergeProps } from '../utils/lang';

const RadioGroupProps = {
  value: '',
  least: false, // 至少是否有选择 true - 至少选择一个  false - 可以全部不选择
  type: 'hor' // 类型 hor - 水平 ver - 垂直
};
const RadioProps = {
  value: false,
  disabled: false,
  name: '' // 当前radio的名称，如果name值为空，则父元素的value以角标值计算
};

RadioGroup.install = function(Vue, options) {
  RadioGroup.props = mergeProps(RadioGroup.props, Object.assign(RadioGroupProps, options));
  Vue.component(RadioGroup.name, RadioGroup);
};

Radio.install = function(Vue, options) {
  Radio.props = mergeProps(Radio.props, Object.assign(RadioProps, options));
  Vue.component(Radio.name, Radio);
};
Radio.Group = RadioGroup;

export default Radio;
