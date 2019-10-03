import axios from 'axios'
import qs from 'qs'
import {
  Toast
} from 'vant'

/**
 * 需要添加加载动画的请求
 * @param {url} url  请求路径
 * @param {param} params 参数 
 * @param {configs} configs 配置（私有）
 * @param {loading} loading 加载动画 [ 1/不加载,2/一直加载,3/只加载第一次] 
 */

const session = {
  flyLoadingUrl: 'app/request/loading/url'
}

let msg = {
  loading: '加载中...',
  noNetwork: '网络错误，请检查网络！',
  timeOut: '请求超时，请重新刷新页面！',
  unKnown: '异常，未知错误，请重试！'
}


let instance = axios.create({
  url: '',
  method: 'post', 
  baseURL: '',
  headers: {'Content-Type': 'application/x-www-form-urlencoded', 'user-type':'admin'},
  withCredentials: true,  
  responseType: 'json',  
  maxContentLength: 2000, 
  timeout:30 * 1000,
  validateStatus(status) {
    return status >= 200 && status < 300  
  },
  transformRequest(params){
    return qs.stringify(params)
  },
})


export default function (url, params, configs, loading = 1, loadingMsg = msg['loading']) {

  console.log(url,params)

  let isLoadingAnimate = true;
  let toast = null;
  let interval = 0;

  if (loading === 3) {
    let urls = sessionStorage.getItem(session.flyLoadingUrl) ? JSON.parse(sessionStorage.getItem(session.flyLoadingUrl)) : [];
    if (urls.indexOf(url) === -1) {
      isLoadingAnimate = true;
      urls.push(url);
      sessionStorage.setItem(session.flyLoadingUrl, JSON.stringify(urls));
    } else {
      isLoadingAnimate = false;
    }
  }

  if (loading === 2 || (loading === 3 && isLoadingAnimate)) {
    toast = Toast.loading({
      mask: true,
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'circular',
      message: loadingMsg,
      position: 'center'
    });
    interval = 500; // 如果需要加载动画，则延长返回时间，否则接口过快，出现页面闪烁
  }

  let clearToast = function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast && toast.clear()
        resolve()
      }, interval)
    })
  }

  return new Promise((resolve, reject) => { 

    let promise = instance.post(url,params,configs)

    promise.then((response) => {
      clearToast().then(() => {
        resolve(response)
      })
    })

    promise.catch((e) => {
      reject(e)
    })

  })

}
