/**
 * created by 41587 on 2019/11/3
 * 单选
 */

import number from "./number";
// 获取直选
const baseNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let clear = function(arr, fn) {
  let result = [];
  for (let n = 0; n < arr.length; n++) {
    let bool = fn.call(this, arr[n], n, arr);
    if (!bool) {
      result.push(arr[n]);
    }
  }
  return result;
};
let test = clear([1, 2, 3, 4, 5, 6, 7], function(item, index) {
  return item === 1;
});
//console.log(test);

let getCompose = function() {
  let result = [];
  for (let n = 0; n < baseNumber.length; n++) {
    for (let m = 0; m < baseNumber.length; m++) {
      for (let l = 0; l < baseNumber.length; l++) {
        result.push(baseNumber[n] + "" + baseNumber[m] + "" + baseNumber[l]);
      }
    }
  }
  return result;
};

let getCompose3 = function() {
  let result = [];
  for (let l = 0; l < baseNumber.length; l++) {
    for (let k = l + 1; k < baseNumber.length; k++) {
      let res = [
        baseNumber[l] + "" + baseNumber[l] + "" + baseNumber[k],
        baseNumber[l] + "" + baseNumber[k] + "" + baseNumber[k]
      ];
      result = result.concat(res);
    }
  }
  return result;
};

//console.log(getCompose3());

let Radio = function() {
  this.compose = getCompose();
};

//设置独胆
Radio.prototype.setAloneGall = function(a) {
  this.compose = this.compose.filter(function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    return newEle[0] === a || newEle[1] === a || newEle[2] === a;
  });
  return this;
};

// 清除相同位置的号码

Radio.prototype.clearSamePosition = function(a, b, c) {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    return newEle[0] === a || newEle[1] === b || newEle[2] === c;
  });
  return this;
};

// 清除相同位置的号码

Radio.prototype.clearSum = function(sum) {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    return newEle[0] + newEle[1] + newEle[2] === sum;
  });
  return this;
};
// 清除豹子
Radio.prototype.clearAlong = function() {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    return (
      newEle[0] === newEle[1] &&
      newEle[1] === newEle[2] &&
      newEle[0] === newEle[2]
    );
  });
  return this;
};
// 清除组三
Radio.prototype.clearD3 = function() {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele
      .split("")
      .map(el => Number(el))
      .sort()
      .join("");
    let d3 = getCompose3();
    return d3.includes(newEle);
  });
  return this;
};
// 清除组指定的胆码
Radio.prototype.clearNumber = function(value) {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    return newEle[0] === value || newEle[1] === value || newEle[2] === value;
  });
  return this;
};
// 清除组全奇数或全偶
Radio.prototype.clearParity = function(type = "odd") {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    if (type === "odd") {
      return newEle[0] % 2 === 1 && newEle[1] % 2 === 1 && newEle[2] % 2 === 1;
    } else {
      return newEle[0] % 2 === 0 && newEle[1] % 2 === 0 && newEle[2] % 2 === 0;
    }
  });
  return this;
};

// 清除和大或和小
Radio.prototype.clearBigOrSmall = function(type = "big") {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele.split("").map(el => Number(el));
    let value = newEle[0] + newEle[1] + newEle[2];
    if (type === "big") {
      return value > 13;
    } else {
      return value <= 13;
    }
  });
  return this;
};

// 清除全顺
Radio.prototype.clearShunZi = function() {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele
      .split("")
      .map(el => Number(el))
      .sort((a, b) => a - b)
      .join("");
    let shunzi = ["012", "123", "234", "345", "456", "567", "678", "789"];
    return shunzi.includes(newEle);
  });
  return this;
};
// 清除组合数
Radio.prototype.clearDouble = function(double) {
  double.forEach(element => {
    let newDoule = element.split("").map(el => Number(el));
    this.compose = clear(this.compose, function(ele, index) {
      let newEle = ele.split("").map(el => Number(el));
      return newEle.includes(newDoule[0]) && newEle.includes(newDoule[1]);
    });
  });
  return this;
};

// 清除指定的号码
Radio.prototype.clearCompose = function(compose) {
  this.compose = clear(this.compose, function(ele, index) {
    return compose.includes(ele);
  });
  return this;
};
// 清除指定组六组成的单选号码
Radio.prototype.clearComposeD6 = function(compose) {
  this.compose = clear(this.compose, function(ele, index) {
    let newEle = ele
      .split("")
      .map(el => Number(el))
      .sort()
      .join("");
    return compose.includes(newEle);
  });
  return this;
};

let prizeD6_next = number.prizeD6.slice(number.prizeD6.length - 10);
console.log(prizeD6_next);
let testD6_next = number.testD6.slice(number.testD6.length - 10);
console.log(testD6_next);

let radio = new Radio();
// let value = radio
//   .clearComposeD6(prizeD6_next)
//   .clearComposeD6(testD6_next)
//   .clearBigOrSmall("big")
//   .clearAlong()
//   .clearShunZi()
//   .clearD3()
//   .clearNumber(8)
//   .clearSamePosition(0, 6, 8)
//   .clearDouble(["06", "23", "26", "36"])
//   .clearCompose(number.test)
//   .clearCompose(number.prize).compose;
//11-3
let value = radio
  .clearSamePosition(0, 6, 8)
  .clearNumber(8)
  .clearAlong()
  .clearShunZi()
  .clearD3()
  .clearComposeD6(prizeD6_next)
  .clearComposeD6(testD6_next).compose;
console.log("total=" + value.length);
console.log(value.join("  "));
