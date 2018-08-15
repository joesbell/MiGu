// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/index'
import store from "../../store/store"
import httpAxios from "../../axios/axios"
import FastClick from "fastclick"
import axios from "axios";
import wxshare from "./wxshare1";
import VueTouch  from "vue-touch"
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
Vue.use(VueTouch, {name: 'v-touch'})
axios.defaults.headers = {
  "content-type": "application/x-www-form-urlencoded",
  "msisdn": localStorage.getItem("userName"),
  "token":localStorage.getItem("token"),
  // "Access-Token":sessionStorage.getItem("cloud_system_token")
}; //配置请求头

Vue.prototype.$http = httpAxios;
// 解决移动端点击延迟的问题
FastClick.attach(document.body);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
    //重置微信分享
    // http://h5.vrbt.migu.cn/vcrbt/newyear/shareWX.do
    //   {
    //     accessID: null,
    //     content: encodeURIComponent(window.location.href.split("#")[0])
    //   }
    resetShareWX: function(){
      this.$http.get("/userOper/shareWX.action",{
        content: "http://192.168.137.1:8054/migu/index.html"
      }).then((res)=>{
        wxshare.reset(res.data, ['checkJsApi','onMenuShareTimeline', 'onMenuShareAppMessage']);
      }).catch((error)=>{console.log(error)});
    }
  },
  mounted: function(){
    this.resetShareWX();//重置微信分享
  }
});
