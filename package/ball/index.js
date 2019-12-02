let sum = function(array = []) {
  let result = 0;
  array.forEach(item => {
    result += item;
  });
  return result;
};

let Ball = function(odds = 3, profit = 100, count = 5) {
  this.odds = odds;
  this.profit = profit;
  this.count = count;
};
/**
 * 获取每次需要的金额
 * @returns {Array}
 */
Ball.prototype.getItems = function() {
  let result = [];
  for (let n = 0; n < this.count; n++) {
    let resultTotal = sum(result);
    let money = (this.profit + resultTotal) / (this.odds - 1);
    result.push(money);
  }
  return result;
};
/**
 * 获取总金额
 * @returns {Array}
 */
Ball.prototype.getTotal = function() {
  let result = [];
  for (let n = 0; n < this.count; n++) {
    let resultTotal = sum(result);
    let money = (this.profit + resultTotal) / (this.odds - 1);
    result.push(money);
  }
  return sum(result);
};

// 测试

let profit = 100; //每次获取的利润
let odds = 3; // 赔率
let count = 5; // 次数

let ball = new Ball(odds, profit, count);
console.log(ball.getTotal());
console.log(ball.getItems());
