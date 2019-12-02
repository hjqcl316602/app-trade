/**
 * @name 补0
 * @param {value} [number] 需要补0的数
 * @return [ string ]
 */

export default function zer(value) {
  if (Number.isInteger(value) || value < 0) throw new Error("The argument must be int number , and it must be not less than 0.");
  return value < 10 ? "0" + value : +value;
}
