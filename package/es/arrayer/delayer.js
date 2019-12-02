/**
 * @name 树形结构数据转一维数组
 * @param {array} [array]
 * @returns [array]
 */

export default function delayer(array) {
  if (!Array.isArray(array)) {
    console.error("[array] is not array");
    return array;
  }
  let newArray = [];
  array.forEach(item => {
    let children = item && item["children"];
    newArray.push(item);
    if (children) {
      newArray.push(...delayer(children));
    }
  });
  return newArray;
}

// let data = [
//   {
//     id: 1,
//     pid: "",
//     text: "中国",
//     children: [
//       {
//         id: 11,
//         pid: 1,
//         text: "四川省",
//         children: [
//           {
//             id: 111,
//             pid: 11,
//             text: "成都市"
//           },
//           {
//             id: 112,
//             pid: 11,
//             text: "内江市"
//           }
//         ]
//       },
//       {
//         id: 12,
//         pid: 1,
//         text: "云南省"
//       }
//     ]
//   },
//   {
//     id: 2,
//     pid: "",
//     text: "中国",
//     children: []
//   }
// ];

// let format = delayer(data);
// console.log(format);
// console.log(data);
