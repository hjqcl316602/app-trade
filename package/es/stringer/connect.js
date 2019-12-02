/**
 * @name 每隔几位添加指定的连接符-从末尾计数
 * @param { string } [ string ]
 * @param { connect = '-' } [ string ] 连接符
 * @param { len = 4 } [ number ]  每隔多少位
 * @param { type = start } [ string ]  计数位置
 * @return [ string ]
 * @example connect("13980464237"," ",4) => 139 8046 4237
 * @msg  exp1(?=exp2) 查找exp2前面的exp1 || (?<=exp2)exp1 查找exp2后面的exp1 || exp1(?!exp2) 查找后面不是exp2的exp1 ||  (?<!=exp2)exp1 查找前面不是exp2的exp1
 * @notice
 * new RegExp(`(?<=^([\\S\\s]{${len}})+)([\\s\\S])`, 'g') 在火狐下不能识别
 * new RegExp(`([\\s\\S])(?=([\\S\\s]{${len}})+$)`, 'g')
 */

export default function connect(string, connect = '-', len = 4, type = 'start') {
  if (typeof string !== 'string') {
    throw new Error('The first argument must be string.');
  }
  if (typeof connect !== 'string') {
    throw new Error('The second argument must be string.');
  }
  if (!Number.isInteger(len) || len < 1) {
    throw new Error('The third argument must be int number and it must not less then 1.');
  }
  if (['start', 'end'].findIndex(item => item === type) === -1) {
    throw new Error('The fourth argument must be start or end.');
  }

  if (type === 'start') {
    let strings = string.split('');
    let newStrings = [];
    for (let n = 0; n < strings.length; n++) {
      if (n > 0 && n % len === 0) {
        newStrings.push(connect);
      }
      newStrings.push(strings[n]);
    }
    return newStrings.join('');
  } else {
    let strings = string.split('').reverse();
    let newStrings = [];
    for (let n = 0; n < strings.length; n++) {
      if (n > 0 && n % len === 0) {
        newStrings.push(connect);
      }
      newStrings.push(strings[n]);
    }
    return newStrings.reverse().join('');
  }
}

connect.start = function(string, link, len) {
  return connect(
    string,
    link,
    len,
    'start'
  );
};
connect.end = function(string, link, len) {
  return connect(
    string,
    link,
    len,
    'end'
  );
};
