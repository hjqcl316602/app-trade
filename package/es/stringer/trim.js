/**
 * @name  字符串的空格去除-整体
 * @msg String.prototype.trim 只能删除字符串开头的空白
 * @param { string } [ string ] 字符串
 * @param { type = 'whole'} [ string ] 类型
 * start | 首部
 * end | 尾部
 * both | 两侧
 * whole | 整体
 * @return [ string ]
 * @example
 * trim(' dsdsds dsd ds dsds ds ' ,'whole');
 * trim.both(' dsdsds dsd ds dsds ds ');
 * trim.start(' dsdsds dsd ds dsds ds ');
 * trim.end(' dsdsds dsd ds dsds ds ');
 * trim.whole(' dsdsds dsd ds dsds ds ');
 */

export default function trim(string, type = 'whole') {
  let types = ['start', 'end', 'both', 'whole'];
  if (typeof string !== 'string') throw new Error('The first argument must be string.');
  if (!types.includes(type)) throw new Error("The second argument must be in ['start', 'end', 'both', 'whole'].");
  if (type === 'start') return string.replace(/(^\s*)/g, '');
  if (type === 'end') return string.replace(/(\s*$)/g, '');
  if (type === 'both') return string.replace(/(^\s*)|(\s*$)/g, '');
  if (type === 'whole') return string.replace(/\s+/g, '');
}
trim.start = string => trim(string, 'start');
trim.end = string => trim(string, 'end');
trim.both = string => trim(string, 'both');
trim.whole = string => trim(string, 'whole');

// console.log(trim(' dsdsds dsd ds dsds ds ', 'both'));
// console.log(trim.both(' dsdsds dsd ds dsds ds '));
// console.log(trim.start(' dsdsds dsd ds dsds ds '));
// console.log(trim.end(' dsdsds dsd ds dsds ds '));
// console.log(trim.whole(' dsdsds dsd ds dsds ds '));
