/**
 * @name  获取图片资源的类型
 * @msg  通过再次请求该图片，获取该请求下的一些信息
 * @param { src } [ string ] 图片路径
 * @return  [ promise ]
 */
let typer = function(src) {
  if (typeof src !== "string") {
    throw new Error("The argument must be string.");
  }
  return new Promise((resolve, reject) => {
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
      xmlhttp.open("GET", src, true);
      xmlhttp.onloadend = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //console.log(xmlhttp.getResponseHeader('Content-type'))
          resolve(xmlhttp.getResponseHeader("Content-type"));
          //xmlhttp.getAllResponseHeaders()
        } else {
          reject({ message: "The picture request is failded." });
        }
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
};

export default typer;

//typer("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res)); //image/jpeg
