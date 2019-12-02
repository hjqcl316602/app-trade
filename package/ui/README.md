<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 15:12:37
 * @LastEditTime: 2019-08-09 21:10:26
 * @LastEditors: Please set LastEditors
 -->

# store-vue-ui

npm install store-vue-ui

```js
import { Loading, Input, Image } from 'store-vue-ui';
Vue.use(Loading.Cross)
  .use(Loading.Circle)
  .use(Input)
  .use(Image);
```

注意事项

- 添加 css 时，组件的 css 需要放置在一般的 css 的前面，才能覆盖原本的 css 属性

## accordion

## accordion-item

```js
let accordion = {
  value: '', // v-model 当前选中的名称
  item: {
    name: '', // 名称，
    maxHeight: 100 // 设置一个最大高度 作用于动画
  }
};
```

```html
<vui-accordion active-name="" @change="change" v-model="active">
  <vui-accordion-item name="1" :max-height="50">
    <div slot="header">
      <div v-if="active === '1'">12345</div>
      <div v-else>67890</div>
    </div>
    <div slot="panel">
      <div>多岁的上课了ldkslds</div>
    </div>
  </vui-accordion-item>
  <vui-accordion-item name="2" :max-height="50">
    <div slot="header">
      <div v-if="active === '2'">12345</div>
      <div v-else>67890</div>
    </div>
    <div slot="panel">
      <div>多岁的上课了ldkslds</div>
    </div>
  </vui-accordion-item>
</vui-accordion>
```

## border

```js
const BorderProps = {
  size: 1, // [ Number ] border的尺寸
  color: '#dedede', // [ String] border的颜色
  left: false, // [ Boolean ] 是否显示左边框
  bottom: false, // [ Boolean ] 是否显示下边框
  right: false, // [ Boolean ] 是否显示右边框
  top: false, // [ Boolean ] 是否显示上边框
  round: false, // [ Boolean ] 是否显示四周的边框
  radius: 0, // [ Number ] border-radius 大小
  circle: false, //[ Boolean ] 是否是圆角
  type: 'solid' // [ String ] border样式 solid dashed...
};
```

```html
<vui-border round :size="1 / 2" circle>
  <div></div>
</vui-border>
```

## check

```js
const CheckGroupProps = {
  value: [], // [ Array ]
  max: Infinity, // [ Number ] 最多只能选择几个
  type: 'hor' // [ String ] 类型 hor - 水平 ver - 垂直
};
const CheckProps = {
  value: false, // [ Boolean ]
  disabled: false, // [ Boolean ]
  name: '' // [ String ] 当前Check的名称，如果name值为空，则父元素的value以角标值计算
};
```

```html
<vui-check-group v-model="checkes" type="ver" :max="2">
  <vui-check name="1">
    <div>this is 1</div>
  </vui-check>
  <vui-check name="2">
    <div>this is 2</div>
  </vui-check>
  <vui-check name="3">
    <div>this is 3</div>
  </vui-check>
  <vui-check name="4" disabled>
    <div>this is 4</div>
  </vui-check>
</vui-check-group>
<vui-check v-model="check">
  <div>this is a check,and it status is {{ check }}</div>
</vui-check>
```

## icon

```js
let icon = {
  name: 'tupian', //名称
  size: null, //icon 字体大小,不设置默认值是为了能添加class属性覆盖
  color: '' // icon的颜色
};
```

```html
<vui-icon name="spread-right" class="vui-color--danger vui-font-size--large"></vui-icon> <vui-icon name="top-circle" :size="14"></vui-icon>
```

## Image

```js
let image = {
  src: '', // 图片地址
  lazy: true, //是否懒加载
  lazyThreshold: 40, // 懒加载阈值，即image的顶部距离窗口的底部的差值
  lazyDuration: 1000, // 懒加载图片定时器的时差
  fillType: 'width', //填充方式  width（宽度100%） height（高度100%） min（至少一边100%） max（至多一边100%） cover（两边100%）
  alignType: 'center', // 对齐方式center top bottom left right top-left top-right bottom-left bottom-right
  width: '', // 图片宽
  height: '' // 图片高
};
```

```html
<vui-image :lazy="true" fill-type="width" align-type="bottom" src="http://img4.duitang.com/uploads/item/201511/26/20151126170245_JEKch.jpeg">
  <vui-loading-circle slot="loading"></vui-loading-circle>
  <div slot="error"></div>
  <!-- -->错了
  <div @click="change">
    <div>dshjdshj</div>
    <div>sdsdhdskdjks打开手机框架的</div>
  </div>
</vui-image>
```

## Input

```js
let input = {
  border: true, // 是否显示border
  borderType: 'round', // border的类型 top bottom round
  borderStyleType: 'solid', // border样式的类型，包括 solid dashed
  borderWeightType: 'half', // border粗细类型 half thin thiner
  radius: false, // 是否需要radius,当borderType=round才有效
  radiusType: 'normal', // border-radius的大小 normal round
  size: 'medium', // 尺寸类型,包括smaller small medium large larger,
  placeholder: '', //提示语
  type: 'text', //输入的类型,
  readonly: false // 是否是只读性
};
```

```html
<vui-input border border-type="round" border-weight-type="thiner" border-style-type="dashed" radius radius-type="round" placeholder="请输入您的内容" type="password" size="large">
  <div slot="prepend" style="height:100%;width:40px;text-align:right;line-height:36px;background-color:red">
    姓名
  </div>
  <div slot="append" style="height:100%;width:40px;text-align:left;line-height:36px;background-color:red">
    删除
  </div>
</vui-input>
```

## Loading

```js
let loading = {
  cross: {
    color: '#fff', // 每个圆的颜色
    size: 20 // 每个圆的大小尺寸
  },
  cricle: {
    color: '#fff', // 每个圆的颜色
    size: 6, // 每个圆的大小尺寸
    diameter: 24 // 直径
  },
  wave: {
    color: '#fff', // 每个方块的颜色
    size: 4, // 每个方块的大小尺寸 - 宽
    scale: 8, // 比例
    spacing: 2, // 间距
    alignType: 'start', // 对齐方式 top center bottom
    directionType: 'horizontal' // 排列方式  horizontal vertical
  }
};
```

### Loading.Cross

```html
<vui-loading-cross :size="20" color="red"></vui-loading-cross>
```

### Loading.Circle

```html
<vui-loading-circle color="#fff" :diameter="24" :size="6"></vui-loading-circle>
```

### Loading.Wave

```html
<vui-loading-wave align-type="start" direction-type="horizontal" color="#fff" :size="4" :scale="8" :spacing="2"></vui-loading-wave>
```

## ratio

```js
const RadioGroupProps = {
  value: '', // [ String ]
  least: false, // [ Boolean ] 至少是否有选择 true - 至少选择一个  false - 可以全部不选择
  type: 'hor' // [ String ] 类型 hor - 水平 ver - 垂直
};
const RadioProps = {
  value: false, // [ Boolean ]
  disabled: false, // [ Boolean ]
  name: '' //  [ String ]  当前radio的名称，如果name值为空，则父元素的value以角标值计算
};
```

```html
// 组合使用
<vui-radio-group v-model="index" @change="change">
  <vui-radio name="1">
    <div>
      <span>1</span>
    </div>
  </vui-radio>
  <vui-radio name="2">
    <div>
      <span>2</span>
    </div>
  </vui-radio>
  <vui-radio name="3">
    <div>
      <span>3</span>
    </div>
  </vui-radio>
</vui-radio-group>
//单独使用
<vui-radio v-model="radio" @change="change">
  <div>{{ radio }}</div>
</vui-radio>
```

## upload

```js
let upload = {
  layerSize: 40, // 当其内部是默认的slot，可以设置其尺寸
  accept: 'image/*', // 接受的类型
  isRepeat: false //是否可以重复选择
};
```

```html
<vui-upload @change="change"> </vui-upload>
```
