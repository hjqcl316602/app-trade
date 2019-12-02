/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 10:31:58
 * @LastEditTime: 2019-08-23 11:11:54
 * @LastEditors: Please set LastEditors
 */
import typer from '../typer';
import hump from '../stringer/hump';
let styler = {};
/**
 * @description:  得到指定id的style，若不存在该style，即创建该值的style标签
 * @param { name } [ String ]
 * @return { object }
 */
styler.sheet = function(name) {
  if (typeof name !== 'string') throw new Error('The argument must be string.');
  let style = document.getElementById('style-sheet-' + name);
  if (!style) {
    style = document.createElement('style');
    style.id = 'style-sheet-' + name;
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
  }
  return style.sheet;
};

styler.addRule = function(selector, css, name) {
  if (typeof selector !== 'string') throw new Error('The first argument must be string.');
  if (!typer.isObject(css) && typeof css !== 'string') throw new Error('The second argument must be string or object.');
  if (typeof name !== 'string') throw new Error('The thrid argument must be string.');
  var stylesheet = this.sheet(name);
  var propText =
    typeof css === 'string'
      ? css
      : Object.keys(css)
          .map(function(p) {
            return hump.spread(p) + ':' + (p === 'content' ? "'" + css[p] + "'" : css[p]);
          })
          .join(';');

  if (stylesheet.insertRule) {
    // 标准浏览器支持的
    stylesheet.insertRule(selector + '{' + propText + '}', stylesheet.cssRules.length);
  } else if (stylesheet.addRule) {
    // IE支持的
    stylesheet.addRule(selector, propText, stylesheet.cssRules.length);
  }
};

// styler.addRule(`.vui-border:after`, { border-top : '1px'}, "border");
styler.getRules = function(callback) {
  if (typeof callback !== 'function') throw new Error('The argument must be function.');
  let styles = document.getElementsByTagName('style');
  let res = [];
  for (let n = 0; n < styles.length; n++) {
    let temp = styles[n];
    let rules = temp.sheet.rules;
    if (rules.length > 0) {
      for (let k = 0; k < rules.length; k++) {
        let text = rules[k]['selectorText'];
        if (callback.call(this, text || '')) {
          res.push(text);
        }
      }
    }
  }
  return res;
};
export default styler;
