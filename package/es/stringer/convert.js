/**
 * @name 字符串的转换
 * @param  {string} [ string ]
 * @param { type='upper' } [ string ]
 * upper | 全部大写
 * lower | 全部小写
 * upperStart | 首字母大写，其余全部小写
 * lowerStart | 首字母小写，其余全部大写
 * exchange | 大小写互转
 * @return [ string ]
 * @example
 * convert("sSs",'upper') => 'SSS'
 * convert.upper('assaSAS');
 * convert.lower('assaSAS');
 * convert.upperStart('assaSAS');
 * convert.lowerStart('assaSAS');
 * convert.exchange('assaSAS');
 */

export default function convert(string, type = 'upper') {
  let types = ['upper', 'lower', 'upperStart', 'lowerStart', 'exchange'];
  if (typeof string !== 'string') throw new Error('The first argument must string.');
  if (!types.includes(type)) throw new Error("The second argument must be in ['upper', 'lower', 'upperStart', 'lowerStart', 'exchange'].");
  if (type === 'upper') return string.toUpperCase();

  if (type === 'lower') return string.toLowerCase();

  if (type === 'upperStart') return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();

  if (type === 'lowerStart') return string.substring(0, 1).toLowerCase() + string.substring(1).toUpperCase();

  if (type === 'exchange') {
    return string
      .split('')
      .map(function(word) {
        if (/[a-z]/.test(word)) {
          return word.toUpperCase();
        } else {
          return word.toLowerCase();
        }
      })
      .join('');
  }
}

convert.upper = string => convert(string, 'upper');
convert.lower = string => convert(string, 'lower');
convert.upperStart = string => convert(string, 'upperStart');
convert.lowerStart = string => convert(string, 'lowerStart');
convert.exchange = string => convert(string, 'exchange');

//console.log(convert('SAJJKSJAKSJ', 'uppe'));
// console.log(convert.upper('assaSAS'));
// console.log(convert.lower('assaSAS'));
// console.log(convert.upperStart('assaSAS'));
// console.log(convert.lowerStart('assaSAS'));
// console.log(convert.exchange('assaSAS'));
