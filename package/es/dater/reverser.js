import checker from "./checker";
/**
 * @name 获取倒计时信息
 * @param { createTime } [date]  创建时间
 * @param { currentTime } [date]   当前时间
 * @param { backTimeRange } [date] 倒计时范围
 * @param { type = 'day'} [ 'day','hour','minute','second']
 * @return { object }
 * code 标识 -1/当前时间小于起始时间 | 0/正在倒计时中... 1/当前时间大于起始时间与倒计时之和
 * memo 描述
 * storage 当code=0时，倒计时详情
 */

let reverser = function (createTime, currentTime, backTimeRange, type = "day") {
  if (!checker(createTime)) throw new Error("The first argument must be a valid date.");
  if (!checker(currentTime)) throw new Error("The second argument must be a valid date.");
  if (!Number.isInteger(backTimeRange) || backTimeRange < 0) throw new Error("The third argument must be int number,and it must be not less than 0.");
  let types = ["day", "hour", "minute", "second"];
  if (types.findIndex(item => item === type) === -1) throw new Error("The fourth argument must be in ['day', 'hour', 'minute', 'second'].");
  createTime = +new Date(createTime);
  currentTime = +new Date(currentTime);

  let start = createTime,
    end = createTime + backTimeRange;
  if (currentTime < start) {
    return { type: -1, memo: "当前时间小于起始时间" };
  }
  if (currentTime > end) {
    return { type: 1, memo: "当前时间大于起始时间与倒计时之和" };
  }

  let backTime = createTime + backTimeRange - currentTime;
  let storage;
  if (type === "day") {
    storage = [{ text: ["日", "day", "d"], label: "day", value: 24 * 60 * 60 * 1000 }, { text: ["时", "hour", "h"], label: "hour", value: 60 * 60 * 1000 }, { text: ["分", "minute", "m"], label: "minute", value: 60 * 1000 }, { text: ["秒", "second", "s"], label: "second", value: 1000 }];
  } else if (type === "hour") {
    storage = [{ text: ["时", "hour", "h"], label: "hour", value: 60 * 60 * 1000 }, { text: ["分", "minute", "m"], label: "minute", value: 60 * 1000 }, { text: ["秒", "second", "s"], label: "second", value: 1000 }];
  } else if (type === "minute") {
    storage = [{ text: ["分", "minute", "m"], label: "minute", value: 60 * 1000 }, { text: ["秒", "second", "s"], label: "second", value: 1000 }];
  } else if (type === "second") {
    storage = [{ text: ["秒", "second", "s"], label: "second", value: 1000 }];
  }
  for (let n = 0; n < storage.length; n++) {
    let temp = storage[n];
    if (n === 0) {
      temp["backTime"] = Math.floor(backTime / temp["value"]);
      temp["reserveTime"] = backTime - temp["backTime"] * temp["value"];
    } else {
      let prev = storage[n - 1];
      temp["backTime"] = Math.floor(prev["reserveTime"] / temp["value"]);
      temp["reserveTime"] = prev["reserveTime"] - temp["backTime"] * temp["value"];
    }
  }
  return { type: 0, memo: "正在倒计时中...", storage };
};

reverser.day = function (createTime, currentTime, backTimeRange) {
  return reverser(createTime, currentTime, backTimeRange, "day");
};
reverser.hour = function (createTime, currentTime, backTimeRange) {
  return reverser(createTime, currentTime, backTimeRange, "hour");
};
reverser.minute = function (createTime, currentTime, backTimeRange) {
  return reverser(createTime, currentTime, backTimeRange, "minute");
};
reverser.second = function (createTime, currentTime, backTimeRange) {
  return reverser(createTime, currentTime, backTimeRange, "second");
};

export default reverser