import baser from "./baser";

let compressser = {};
/**
 * @name 图片压缩-按质量
 * @param { src } [ string ]
 * @param { quality } [number] 压缩后的质量
 * @param { type = image/png } [ string ] 文件的类型，最好是先知道文件的类型，相同类型之间的压缩会更准确
 * @return: [ promise ] => [ string<base64>]
 */
compressser.qualityer = function(src, quality = 0.7, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof quality !== "number" || quality < 0 || quality > 1) {
    throw new Error("The second argument must be number , and it must not less than 0 and not greate than 1.");
  }
  if (typeof type !== "string") {
    throw new Error("The third argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      //image.setAttribute("crossOrigin",'Anonymous') // Tainted canvases may not be exported. 跨域问题
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          //document.body.appendChild(canvas)
          canvas.width = image.width;
          canvas.height = image.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataurl = canvas.toDataURL(type, quality);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataurl);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

/**
 * @name 图片压缩-指定宽
 * @param { src } [ string ]
 * @param { width } [ number ]
 * @param { type = image/png } [ string ]
 * @return [ promise ] => [ string<base64>]
 */
compressser.widther = function(src, width, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof width !== "number" || width < 0) {
    throw new Error("The second argument must be number , and it must not less than 0.");
  }
  if (typeof type !== "string") {
    throw new Error("The third argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          canvas.width = width || image.width;
          canvas.height = (image.height / image.width) * canvas.width;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataurl = canvas.toDataURL(type, 1);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataurl);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

/**
 * @name  图片压缩-指定高度
 * @param { src } [ string ]
 * @param { height } [ number ]
 * @param { type = image/png } [ string ]
 * @return  [ promise ] => [ string<base64>]
 */
compressser.heighter = function(src, height, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof height !== "number" || height < 0) {
    throw new Error("The second argument must be number , and it must not less than 0.");
  }
  if (typeof type !== "string") {
    throw new Error("The third argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          canvas.height = height || image.height;
          canvas.width = (image.width / image.height) * canvas.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataurl = canvas.toDataURL(type, 1);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataurl);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

/**
 * @name  图片压缩=指定高和宽
 * @param { src } [ string ]
 * @param { width } [ number ]
 * @param { height } [ number ]
 * @param { type = image/png } [ string ]
 * @return: [ promise ] => [ string<base64>]
 * @msg  图片会被挤压
 */
compressser.sizer = function(src, width, height, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof width !== "number" || width < 0) {
    throw new Error("The second argument must be number , and it must not less than 0.");
  }
  if (typeof height !== "number" || height < 0) {
    throw new Error("The third argument must be number , and it must not less than 0.");
  }
  if (typeof type !== "string") {
    throw new Error("The fourth argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          canvas.height = height || image.height;
          canvas.width = width || image.width;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataurl = canvas.toDataURL(type, 1);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataurl);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

/**
 * @name 图片压缩-指定比率
 * @param { src } [ string ]
 * @param { ratio = 1.0 } [ number ]
 * @param { type = image/png } [ string ]
 * @return  [ promise ] => [ string<base64>]
 */
compressser.ratioer = function(src, ratio = 1.0, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof ratio !== "number" || ratio < 0) {
    throw new Error("The second argument must be number , and it must not less than 0.");
  }
  if (typeof type !== "string") {
    throw new Error("The third argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          canvas.height = image.height * ratio;
          canvas.width = image.width * ratio;
          console.log(canvas);
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataurl = canvas.toDataURL(type, 1);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(dataurl);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

/**
 * @name 图片压缩-指定体积的图片
 * @msg  Base64编码要求把3个8位字节（3 * 8=24）转化为4个6位的字节（4 * 6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用’=’，因此编码后输出的文本末尾可能会出现1或2个’=’
 * @param { src } [ string ] 图片地址
 * @param { size = 200 * 1024 } [ number ] | 200 * 1024 压缩到指定的大小 需要精确到 Bytes
 * @param { range = 100 } [number ] | 10 * 1024 容错范围即可 需要精确到 Bytes
 * @param { type = image/png } [ string ]
 * @return [ promise ] => [ string<base64>]
 */
compressser.valumer = function(src, size = 200 * 1024, range = 100, type = "image/png") {
  if (typeof src !== "string") {
    throw new Error("The first argument must be string.");
  }
  if (typeof size !== "number" || size < 0) {
    throw new Error("The second argument must be number , and it must not less than 0.");
  }
  if (typeof range !== "number" || range < 0) {
    throw new Error("The third argument must be number , and it must not less than 0.");
  }
  if (typeof type !== "string") {
    throw new Error("The fourth argument must be string.");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      image.onload = () => {
        try {
          let start = 0,
            end = 1,
            mid = 1,
            count = 0;
          let resSize = 0;
          let res;
          do {
            count++;
            if (count !== 1) {
              mid = (start + end) / 2;
            }
            let canvas = document.createElement("canvas");
            canvas.width = image.width * mid;
            canvas.height = image.height * mid;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            res = canvas.toDataURL(type, 1);
            resSize = baser.size(res);
            if (count === 1 && resSize < size) {
              break;
            } else {
              if (Math.abs(resSize - size) <= range) {
                break;
              } else if (resSize - size > range) {
                end = mid - 0.0000000001;
              } else if (size - resSize > range) {
                start = mid + 0.0000000001;
              }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          } while (start < end);
          resolve(res);
        } catch (e) {
          reject(e);
        }
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};

export default compressser;
//compressser.valumer("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg", 20 * 1024).then(res => console.log(res));
