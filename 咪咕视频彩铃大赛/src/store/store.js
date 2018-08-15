import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
  state:{
    isLoading:false,
    isError:false,
    errorMsg:"",
  },
  modules:{

  },
  mutations:{
    updateLoadingStatus(state,payload){
      state.isLoading=payload.isLoading
    },
    updateErrorStatus(state,payload){
      state.isError=payload.isError
    },
    updateErrorMsg(state,payload){
      state.errorMsg=payload.errorMsg
    },
  }

});
// // 自定义注册一个store
// store.registerModule("vux",{
//   state:{
//     isLoading:false
//   },
//   mutations:{
//     updateLoadingStatus(state,payload){
//       state.isLoading=payload.isLoading
//     }
//   }
// });
export  default store
