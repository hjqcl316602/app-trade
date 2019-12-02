/**
 * @name  获取图片的高宽数据
 * @param  { src } [ string ] 图片地址 [ 访问路径式，based4式，二进制式]
 * @param { type} ["height-width", "height", "width", "volume"] volume(体积)
 * @return  [ promise ] => [ number ]
 * @example sizer("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res));
 */
let sizer = function(src, type = "height-width") {
  if (typeof src !== "string") throw new Error("The argument must be string.");
  if (["height-width", "height", "width", "volume"].findIndex(item => item === type) === -1) throw new Error("The second argument must be in ['height-width', 'height', 'width','volume'].");
  if (type === "volume") {
    return new Promise((resolve, reject) => {
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
      }
      if (xmlhttp != null) {
        xmlhttp.open("GET", src, true);
        let size = 0;
        xmlhttp.onloadend = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.getResponseHeader('Content-type'))
            resolve(size);
            //xmlhttp.getAllResponseHeaders()
          } else {
            reject({ message: "The picture request is failded." });
          }
        };
        xmlhttp.onprogress = function(e) {
          //console.log(e)
          size = e.total;
        };
        try {
          xmlhttp.send(null);
        } catch (e) {
          reject({ message: "The http request is aborted." });
        }
      } else {
        reject({ message: "The browser is not support xmlhttp." });
      }
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image.onload = () => {
        if (type === "height-width") resolve({ width: image.width, height: image.height });
        if (type === "width") resolve(image.width);
        if (type === "height") resolve(image.height);
      };
      image.onerror = e => {
        reject(e);
      };
    }, 0);
  });
};
sizer.height = function(src) {
  return sizer(src, "height");
};
sizer.width = function(src) {
  return sizer(src, "width");
};
sizer.volume = function(src) {
  return sizer(src, "volume");
};
export default sizer;
//sizer.volume("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res));
