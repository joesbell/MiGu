// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "../../store/store"
import axios from 'axios'
// import router from '../../router/index'
import httpAxios from "../../axios/axios"
axios.defaults.headers = {
  "content-type": "application/x-www-form-urlencoded",
  // "Access-Token":sessionStorage.getItem("cloud_system_token")
}; //配置请求头
Vue.config.productionTip = false;


Vue.prototype.$http= httpAxios;
import FastClick from "fastclick"
// 解决移动端点击延迟的问题
FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
