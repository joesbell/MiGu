<template >
  <div  id="app">
    <router-view>

    </router-view>
    <loading v-show="isLoading"></loading>
    <alert v-show="isError" :title="errorMsg">
      <div class="closeBtn" @click="closeBtn">取消</div>
    </alert>
  </div>

</template>
<script>
  import loading from "../../components/loading";
  import {mapState} from 'vuex';
  import alert from "../../components/alert";
  export default {
    name: 'App',
    components:{
      loading,
      alert
    },
    mounted(){
      this.$nextTick(function () {
        if(!localStorage.getItem("userName")||!localStorage.getItem("token")){
          window.location.href="./login.html"
        }

      })
    },
    computed:{
      ...mapState({
        isLoading:state=>state.isLoading,
        isError:state=>state.isError,
        errorMsg:state=>state.errorMsg
      })
    },
    methods:{
      closeBtn:function(){
        this.$store.commit("updateErrorStatus", {isError: false});

      },
    }

  }
</script>
<style lang="scss">
  @import "../../../static/fixRem";
  #app {
    font-family: 'Microsoft Yahei';
    color: #444;
    width: 100%;
    background: #fcfcfc;
    position: relative;
    height: 100%;
    font-size: pxTorem(30);
    overflow: auto;
  }
</style>
