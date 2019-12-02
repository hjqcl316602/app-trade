# store-css

## 使用

npm install store-css-store

### 不需要自定义主题

```js
// 单独引入模块
import "store-css-store/store/index.css";
import "store-css-store/main/index.css";
// or
// 全部引入
import "store-css-store";
```

### 需要自定义主题

需要自定义主题，则需要创建一个 theme 文件夹，在创建一个 index.less 文件 ,
在 less 文件中覆盖原有的主题，如果编辑器能自动编译 less，则生成 index.css 之后，在 main.js 中引入即可

```less
@import "../../node_modules/store-css-store/store/index.less";
@color-bg: #dedede;
@root-font-size: 16px;

@import "../../node_modules/store-css-store/main/index.less";

@color-primary: #409eff;
@color-danger: #ddc1ba;
@color-warning: #e6a23c;
@color-success: #67c23a;
@color-black: #000;
@color-dark: #333;
@color-light: #666;
@color-gray: #999;
@color-white: #fff;

@border-color-lighter: #c0c0c0;
@border-color-light: #aaa;
@border-color: #999;
@border-color-dark: #666;
@border-color-darker: #333;

@border-radius-smaller: 2px;
@border-radius-small: 4px;
@border-radius-medium: 8px;
@border-radius-large: 16px;
@border-radius-larger: 32px;

@text-size-smaller: 12px;
@text-size-small : 14px;
@text-size-medium: 16px;
@text-size-large : 18px;
@text-size-larger : 20px;

@text-letter-spacing-smaller: 2px;
@text-letter-spacing-small: 4px;
@text-letter-spacing-medium: 6px;
@text-letter-spacing-large: 8px;
@text-letter-spacing-larger: 10px;

@text-word-spacing-smaller: 4px;
@text-word-spacing-small: 8px;
@text-word-spacing-medium: 12px;
@text-word-spacing-large: 16px;
@text-word-spacing-larger: 20px;

@text-indent-smaller: 16px;
@text-indent-small: 24px;
@text-indent-medium: 32px;
@text-indent-large: 40px;
@text-indent-larger: 48px;

@text-height-smaller: 1;
@text-height-small: 1.25;
@text-height-medium: 1.5;
@text-height-large: 1.75;
@text-height-larger: 2;

@gutter-smaller: 4px;
@gutter-small: 8px;
@gutter-medium: 12px;
@gutter-large: 16px;
@gutter-larger: 20px;

@padding-smaller: 2px;
@padding-small : 4px;
@padding-medium: 8px;
@padding-large : 16px;
@padding-larger : 32px;

@margin-smaller: 2px;
@margin-small : 4px;
@margin-medium: 8px;
@margin-large : 16px;
@margin-larger : 32px;

// box-shadow

@shadow-color : rgba(0, 0, 0, .2);
@shadow : 0 0 6px @shadow-color;
@shadow-top : 0 -1px 6px @shadow-color;
@shadow-bottom : 0 1px 6px @shadow-color;
@shadow-left : -1px 0 6px @shadow-color;
@shadow-right : 1px 0 6px @shadow-color;

@btn-size-smaller: 16px;
@btn-size-small: 24px;
@btn-size-medium: 32px;
@btn-size-large: 40px;
@btn-size-larger: 48px;
```
