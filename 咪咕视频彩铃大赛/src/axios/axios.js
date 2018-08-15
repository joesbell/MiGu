//引入axios
import axios from 'axios'
import qs from 'qs'
import store from "../store/store";
let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.timeout = 10000;                        //响应时间
// }; //配置请求头
if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = "http://h5.vrbt.migu.cn/diycsp";   //配置接口地址
  // axios.defaults.baseURL = "http://192.168.137.1:8080/";   //配置接口地址
  // axios.defaults.baseURL = "http://44hmg4.natappfree.cc/diycsp";    //配置接口地址
  axios.defaults.baseURL = "http://diycsp.natapp1.cc/diycsp";    //配置接口地址

  // 干一些线上才要做的事情
}
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = "http://218.200.174.243:8070/diycsp";   //配置接口地址
  // axios.defaults.baseURL = "http://192.168.137.1:8080/";   //配置接口地址
  // axios.defaults.baseURL = "http://192.168.137.1:8054/diycsp";   //配置接口地址

  // axios.defaults.baseURL = "http://44hmg4.natappfree.cc/diycsp";   //配置接口地址
  axios.defaults.baseURL = "http://diycsp.natapp1.cc/diycsp";    //配置接口地址
}
//请求拦截器
axios.interceptors.request.use(config => {
  store.commit("updateLoadingStatus", {isLoading: true});
  // store.commit("updateLoadingStatus", {isLoading: true});
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    // 通过hash，执行cancel()也就是取消了之前的请求
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
});
// 失败响应拦截函数
function checkCode(res) {
  switch (res.status) {
    case 400:
      // error.message = '错误请求'
      store.commit("updateErrorMsg", {errorMsg: "错误请求"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 401:
      // error.message = '未授权，请重新登录'
      store.commit("updateErrorMsg", {errorMsg: "未授权，请重新请求"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 403:
      // error.message = '拒绝访问'
      store.commit("updateErrorMsg", {errorMsg: "拒绝访问"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 404:
      // error.message = '请求错误,未找到该资源'
      store.commit("updateErrorMsg", {errorMsg: "请求错误,未找到该资源"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 405:
      // error.message = '请求方法未允许'
      store.commit("updateErrorMsg", {errorMsg: "请求方法未允许"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 408:
      // error.message = '请求超时'
      store.commit("updateErrorMsg", {errorMsg: "请求超时"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 500:
      // error.message = '服务器端出错'
      store.commit("updateErrorMsg", {errorMsg: "服务器端出错"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 501:
      // error.message = '网络未实现'
      store.commit("updateErrorMsg", {errorMsg: "网络未实现"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 502:
      // error.message = '网络错误'
      store.commit("updateErrorMsg", {errorMsg: "网络错误"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 503:
      // error.message = '服务不可用'
      store.commit("updateErrorMsg", {errorMsg: "服务不可用"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 504:
      // error.message = '网络超时'
      store.commit("updateErrorMsg", {errorMsg: "网络超时"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    case 505:
      // error.message = 'http版本不支持该请求'
      store.commit("updateErrorMsg", {errorMsg: "服务器端出错"});
      store.commit("updateErrorStatus", {isError: true});
      break;
    default:
      // error.message = `连接错误${error.response.status}`
  }
};
// 成功响应拦截函数
function checkStatus(response) {
  // console.log(111111)
  // store.commit("updateLoadingStatus", {isLoading: false});
  if (response.status === 200 || response.status === 304) {
    // if (response.data.state == "000000") {
      if (response.data.message != null) {
            return response.data;
          } else {
            return response.data
          }
    // }
    // if (response.data.state == "000001") {
    //   if (response.data.message != null) {
    //     return response.data;
    //   } else {
    //     return response.data
    //   }
    // }
    // 登录状态过期
    // if (response.data.state == "LOGIN_EXPIRE") {
    //   Modal.warning({
    //     title: "系统提示",
    //     content: response.data.responseMsg,
    //     onOk() {
    //       window.location.href = this.baseConfigUrl + "/login.html";
    //     }
    //   });
    // } else if (response.data.state == "000000") {
    //   if (response.data.message != null) {
    //     return response.data;
    //   } else {
    //     return response.data
    //   }
    // } else if (response.data.status == "VALID_SUCCESS") {
    //   if (response.data.data != null) {
    //     return response.data;
    //   } else {
    //     return response.data
    //   }
    // } else if (response.data.status == "LOGIN_BREAK") {
    //   Modal.warning({
    //     title: "系统提示",
    //     content: response.data.responseMsg,
    //     onOk() {
    //       window.location.href = this.baseConfigUrl + "/login.html";
    //       sessionStorage.removeItem("cloud_system_token");
    //       sessionStorage.removeItem("menu");
    //       sessionStorage.removeItem("menu_second");
    //       sessionStorage.removeItem("cloud_system_userId");
    //       sessionStorage.removeItem("cloud_system_userName");
    //       sessionStorage.removeItem("companyId");
    //       sessionStorage.removeItem("userType");
    //       sessionStorage.removeItem("goodsName");
    //       sessionStorage.removeItem("now_Category");
    //       sessionStorage.removeItem("now_GoodStatus");
    //       sessionStorage.removeItem("now_GoodsStyle");
    //       sessionStorage.removeItem("now_fstCategory");
    //       sessionStorage.removeItem("index");
    //       sessionStorage.removeItem("size");
    //       sessionStorage.removeItem("goodsActive");
    //       sessionStorage.removeItem("goodsNavActive");
    //     }
    //   });
    // } else if (response.data.status == "FAILED") {
    //   // 把错误信息返回去
    //   return Message.error({
    //     content: response.data.responseMsg,
    //     duration: 3,
    //     closable: true
    //   });
    // } else {
    //   // 异常状态下，把错误信息返回去
    //   return Message.error({
    //     content: response.data.responseMsg,
    //     duration: 3,
    //     closable: true
    //   });
    // }
  }


}
// //响应拦截器即异常处理
axios.interceptors.response.use(response => {
  store.commit("updateLoadingStatus", {isLoading: false});
  return checkStatus(response)
}, error => {
  store.commit("updateLoadingStatus", {isLoading: false});
  if (error && error.response) {
    checkCode(error.response)
  } else {
    store.commit("updateErrorMsg", {errorMsg: "连接到服务器失败"});
    store.commit("updateErrorStatus", {isError: true});
    // error.message = "连接到服务器失败"
  }
  return error
});

let httpAxios = {
  post(url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(
      (response) => {
        return response
      }
    ).catch(
      (res) => {
        return res
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      url: url,
      params, // get 请求时带的参数
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(
      (response) => {
        return response
      }
    ).catch(
      (res) => {
        return res
      }
    )
  },
  put(url, data) {

    return axios({
      method: 'put',
      url: url,
      data: data,
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(
      (response) => {
        return response
      }
    ).catch(
      (res) => {
        return res
      }
    )
  },
  delete(url, data) {
    return axios({
      method: 'delete',
      url: url,
      data: data,
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(
      (response) => {
        return response
      }
    ).catch(
      (res) => {
        return res
      }
    )
  },
};

export default httpAxios;

