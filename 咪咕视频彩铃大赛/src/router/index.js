import Vue from 'vue'
import Router from 'vue-router'
const myRbt=()=>import("@/components/myRbt");
const videoDIY=()=>import("@/components/videoDIY");
const upload=()=>import("@/components/upload");
const editVideos=()=>import("@/components/editVideos");
const examine=()=>import("@/components/examine");
const playVideo=()=>import("@/components/playVideo");
const dredge=()=>import("@/components/dredge");
const orderVcrbt=()=>import("@/components/orderVcrbt");


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/upload"
    },
    {
      path: '/myRbt',
      name: 'myRbt',
      component: myRbt
    },
    {
      path: '/examine',
      name: 'examine',
      component: examine
    },
    {
      path: '/videoDIY',
      name: 'videoDIY',
      component: videoDIY
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/editVideos',
      name: 'editVideos',
      component: editVideos
    },
    {
      path: '/playVideo',
      name: 'playVideo',
      component: playVideo
    },
    {
      path: '/dredge',
      name: 'dredge',
      component: dredge
    },
    {
      path: '/orderVcrbt',
      name: 'orderVcrbt',
      component: orderVcrbt
    }
  ]
})
