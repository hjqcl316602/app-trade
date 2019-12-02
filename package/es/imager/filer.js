import is from "../typer/is";
import daterFormater from "../dater/formater";
import formater from "./formater";
let isFile = is("file");

/**
 * @name 获取本地文件资源的详细信息
 * @param { file } [ file ]
 * @return { object }
 * bytes: 62661
 * fileType: "jpg"
 * lastUpdateDate: "2018-10-17 09:08:17"
 * name: "zly (18)"
 * size: 61
 * sizeUnit: "KB"
 * subType: "jpeg"
 * type: "image"
 */

let filer = function(file) {
  if (!isFile(file)) {
    throw new Error("The argument must be file.");
  }
  let lastUpdateDate = daterFormater(file.lastModified, "yyyy-MM-dd HH:mm:ss");
  let transformSize = formater(file.size);
  let types = file.type.split("/");
  let name = file.name;
  let nameSlotIndex = file.name.lastIndexOf(".");
  return {
    type: types[0],
    subType: types[1],
    fileType: name.substring(nameSlotIndex + 1),
    bytes: file.size,
    name: name.substring(0, nameSlotIndex),
    lastUpdateDate: lastUpdateDate,
    size: transformSize["value"],
    sizeUnit: transformSize["unit"]
  };
};

/**
 * @name   获取本地资源文件的二进制流
 * @msg : 可以获取图片的二进制流直接用于页面显示
 * @param   { file } [ file ]
 * @return  [ promise ] => [ string ]
 */

filer.blober = function(file) {
  if (!isFile(file)) {
    throw new Error("The argument must be file.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let url;
      try {
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        resolve(url);
      } catch (e) {
        reject(e);
      }
    }, 0);
  });
};

/**
 * @name  获取本地资源文件的base64数据
 * @param { file } [ file ]
 * @return  [ promise ] => [ string ]
 */

filer.baser = function(file) {
  if (!isFile(file)) {
    throw new Error("The argument must be file.");
  }
  return new Promise((resole, reject) => {
    setTimeout(() => {
      try {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          resole(reader.result);
        };
        reader.onerror = function(e) {
          reject(e);
        };
      } catch (e) {
        reject(e);
      }
    }, 0);
  });
};

export default filer;
