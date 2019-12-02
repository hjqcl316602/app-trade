/**
 * @name  尺寸格式化
 * @param   { size } [ number ]
 * @return  [ object ]
 * value  值
 * unit 单位
 */
let formater = function(size) {
  if (!Number.isInteger(size) || size < 0) {
    throw new Error("The argument must be int number and must be not less than 0.");
  }
  let storage = [{ unit: "B", scaler: 1 }, { unit: "KB", scaler: 1024 }, { unit: "MB", scaler: 1024 * 1024 }, { unit: "GB", scaler: 1024 * 1024 * 1024 }, { unit: "TB", scaler: 1024 * 1024 * 1024 * 1024 }];
  let res = {
    value: 0,
    unit: ""
  };
  for (let n = storage.length - 1; n > -1; n--) {
    let value = Math.round(size / storage[n]["scaler"]);
    if (value > 0) {
      res.value = value;
      res.unit = storage[n]["unit"];
      return res;
    }
  }
  return res;
};

export default formater;
