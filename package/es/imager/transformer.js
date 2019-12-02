/**
 * @name 图片格式转换
 * @param { src } [ string ]
 * @param { type } ["base64", "blob"]
 * @return [ promise ]
 */

let transformer = function(src, type = "base64") {
  if (typeof src !== "string") throw new Error("The first argument must be string.");
  if (["base64", "blob"].findIndex(item => item === type) === -1) throw new Error("The third argument must be in ['base64', 'blob' ].");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let image = new Image();
      image.src = src;
      image["crossOrigin"] = "Anonymous";
      //image.setAttribute("crossOrigin",'Anonymous') // Tainted canvases may not be exported. 跨域问题
      image.onload = () => {
        try {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          if (type === "base64") {
            let dataurl = canvas.toDataURL(type, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resolve(dataurl);
          } else {
            canvas.toBlob(
              function(blob) {
                resolve(blob);
              },
              type,
              1
            );
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
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
transformer.base64 = function(src) {
  return transformer(src, "base64");
};
transformer.blob = function(src) {
  return transformer(src, "blob");
};
export default transformer;

// transformer("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg", "blob").then(res => console.log(res)); //image/jpeg
// transformer.blob("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res)); //image/jpeg
// transformer.base64("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res)); //image/jpeg
