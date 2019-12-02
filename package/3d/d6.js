/**
 * created by 41587 on 2019/11/1
 */
/**
 * @name 数组去重
 * @returns {Array}
 */
const distinct = function(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};
const BASE_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * @name 数组清除
 * @returns {Array}
 */
const clear = function(arr, fn) {
  let result = [];
  for (let n = 0; n < arr.length; n++) {
    let bool = fn.call(this, arr[n], n, arr);
    if (!bool) {
      result.push(arr[n]);
    }
  }
  return result;
};
/**
 * @name 获取组六组合
 * @returns {Array}
 */
let getCompose6 = function() {
  let result = [];
  for (let n = 0; n < BASE_NUMBER.length; n++) {
    for (let m = n + 1; m < BASE_NUMBER.length; m++) {
      for (let k = m + 1; k < BASE_NUMBER.length; k++) {
        result.push(BASE_NUMBER[n] + "" + BASE_NUMBER[m] + "" + BASE_NUMBER[k]);
      }
    }
  }
  return result;
};

let D6 = function() {
  this.result = getCompose6();
};

/**
 * @name 设置数字
 * @params
 * setGall(1,2,3,4)
 */
D6.prototype.setGall = function() {
  let result = [];
  let gall = [...arguments];
  gall = distinct(gall).sort();
  for (let n = 0; n < gall.length; n++) {
    for (let m = n + 1; m < gall.length; m++) {
      for (let k = m + 1; k < gall.length; k++) {
        result.push(gall[n] + "" + gall[m] + "" + gall[k]);
      }
    }
  }
  this.result = result;
  return this;
};
/**
 * @name 设置独胆
 * @params gall [ number ]
 */
D6.prototype.setOnlyGall = function(gall) {
  if (typeof gall !== "number")
    throw new Error("The first params must bu number. ");
  this.result = this.result.filter(ele => {
    return ele.split("").includes(gall + "");
  });
  return this;
};
/**
 * @name 设置和值范围
 * @params {
 *     min:[number=7],
 *     max:[number=20]
 * }
 *
 */
D6.prototype.setSumRang = function(min = 7, max = 20) {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    let sumSplit = split[0] + split[1] + split[2];
    return sumSplit < min || sumSplit > max;
  });
  return this;
};

/**
 * @name 清除和值
 * @params arguments
 */
D6.prototype.clearSum = function() {
  let args = [...arguments];
  args.forEach(arg => {
    this.result = clear(this.result, ele => {
      let split = ele.split("").map(ele => Number(ele));
      let sumSplit = split[0] + split[1] + split[2];
      return sumSplit === arg;
    });
  });
  return this;
};

/**
 * @name 清除顺子
 */
D6.prototype.clearAlong = function() {
  let alongs = ["012", "123", "234", "345", "456", "567", "678", "789"];
  alongs.forEach(along => {
    this.result = clear(this.result, ele => {
      return along === ele;
    });
  });
  return this;
};
/**
 * @name 清除半顺
 */
D6.prototype.clearHalfAlong = function() {
  let alongs = ["01", "12", "23", "34", "45", "56", "67", "78", "89"];
  alongs.forEach(along => {
    this.result = clear(this.result, ele => {
      return ele.indexOf(along) > -1;
    });
  });
  return this;
};

/**
 * @name 清除全部是奇数组合
 */
D6.prototype.clearOdd = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return split[0] % 2 === 1 && split[1] % 2 === 1 && split[2] % 2 === 1;
  });
  return this;
};

/**
 * @name 清除全部是偶数组合
 */
D6.prototype.clearEven = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return split[0] % 2 === 0 && split[1] % 2 === 0 && split[2] % 2 === 0;
  });
  return this;
};

/**
 * @name 清除和为大的组合
 */
D6.prototype.clearSumBig = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return split[0] + split[1] + split[2] >= 14;
  });
  return this;
};
/**
 * @name 清除和为小的组合
 */
D6.prototype.clearSumSmall = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return split[0] + split[1] + split[2] < 14;
  });
  return this;
};
/**
 * @name 清除和尾为大的组合
 */
D6.prototype.clearSumEndBig = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return (split[0] + split[1] + split[2]) % 10 >= 5;
  });
  return this;
};
/**
 * @name 清除和尾为小的组合
 */
D6.prototype.clearSumEndSmall = function() {
  this.result = clear(this.result, ele => {
    let split = ele.split("").map(ele => Number(ele));
    return (split[0] + split[1] + split[2]) % 10 < 5;
  });
  return this;
};

/**
 * @name 清除与指定的组合有两个数相同的組合
 * @params arguments
 */
D6.prototype.clearDoubleNumberCompose = function() {
  let args = [...arguments];
  args.forEach(arg => {
    let argSplits = arg.split("");
    let argDoubles = [
      argSplits[0] + argSplits[1],
      argSplits[0] + argSplits[2],
      argSplits[1] + argSplits[2]
    ];
    argDoubles.forEach(double => {
      this.result = clear(this.result, res => {
        let resSplits = res.split("");
        let resDoubles = [
          resSplits[0] + resSplits[1],
          resSplits[0] + resSplits[2],
          resSplits[1] + resSplits[2]
        ];
        return resDoubles.includes(double);
      });
    });
  });
  return this;
};
/**
 * @name 清除指定的组合
 * @params arguments
 */
D6.prototype.clearCompose = function() {
  let args = [...arguments];
  this.result = clear(this.result, ele => {
    return args.includes(ele);
  });
  return this;
};

D6.prototype.clearNumber = function() {
  let args = [...arguments];
  args.forEach(arg => {
    this.result = clear(this.result, ele => {
      return ele.indexOf(arg) > -1;
    });
  });
  return this;
};
let prize = [
  "013",
  "248",
  "567",
  "134",
  "267",
  "036",
  "135",
  "349",
  "456",
  "009",
  "246",
  "019",
  "369"
];
let test = [
  "134",
  "095",
  "479",
  "068",
  "135",
  "124",
  "126",
  "119",
  "122",
  "288",
  "237",
  "059",
  "348"
];
let d6 = new D6();

d6.clearNumber(3, 4).clearAlong();
let compose6 = d6.result;
console.log(compose6.length, compose6.join("  "));
