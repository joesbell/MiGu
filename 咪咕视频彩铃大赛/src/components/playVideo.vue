<template>
  <div class="playVideo">
    <div class="playVideoBox">
      <span class="closeIcon" @click="toIndex"></span>
      <video ref="video" :src="sourceUrl" x5-playsinline="true" preload="auto" playsinline webkit-playsinline ></video>
      <!--<div class="player" ref="player"></div>-->
      <!--<video id="video"  class="video" preload="auto" playsinline src="http://wqs.jd.com/promote/superfestival/superfestival.mp4" type="video/mp4"></video>-->
    </div>
    <div class="dialNumberBox">
      <p class="dialTitle">呼叫场景模拟状态</p>
      <section class="dialSection">
        <div>
          <span></span>
          <p class="spanTitle">静音</p>
        </div>
        <div>
          <span class="playList2"></span>
          <p class="spanTitle">拨号键盘</p>
        </div>
        <div>
          <span class="playList3"></span>
          <p class="spanTitle">免提</p>
        </div>
        <div>
          <span class="playList4"></span>
          <p class="spanTitle">添加通话</p>
        </div>
        <div>
          <span class="playList5"></span>
          <p class="spanTitle">视频通话</p>
        </div>
        <div>
          <span class="playList6"></span>
          <p class="spanTitle">通讯录</p>
        </div>
      </section>
      <div class="dialHangUp" @click="toIndex"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dredge",
    data () {
      return{
        fromUrl:"",
        sourceUrl:""
      }
    },
    watch:{
      sourceUrl(){
        this.$nextTick(function () {
          this.$refs.video.play()
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        vm.fromUrl=from.name
      })
      // do someting
      // 在渲染该组件的对应路由被 confirm 前调用
    },
    mounted(){
      let _this=this;
      this.$nextTick(function () {
        _this.sourceUrl=_this.$route.params.sourceUrl;

//        setTimeout(()=>{
//          _this.$refs.player.innerHTML=`
//      <video id="video" class="video" x5-playsinline="true" autoplay preload="auto" playsinline="true" webkit-playsinline="true" src="http://freevod.nf.migu.cn/public/ringmaker01/mv02/MVcolor/product/201801/1710/2017年12月28日13点46分13秒大连卓伦准入MV10首/WScreenMP4/舞动电梯-非人声.mp4"></video>
//      `
//          var video = document.getElementById("video");
////          video.play();
////          video.pause();
//          video.play();
//        }, 2000);
        console.log(_this.sourceUrl)
      })

    },
    methods:{
      toIndex:function () {
        let _this=this;
        this.$router.push({
          name:_this.fromUrl
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .playVideo {
    width: 100%;
    height:100%;
    position: relative;
    font-size: pxTorem(30);
    background-color: #2d2731;
    .playVideoBox {
      width:100%;
      height:40%;
      background-color: #000;
      .closeIcon {
        position: absolute;
        z-index: 99;
        right: pxTorem(50);
        top:pxTorem(50);
        display: inline-block;
        width:pxTorem(40);
        height: pxTorem(40);
        background: url("../../static/img/close_up.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../static/img/close_up.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../static/img/close_up1.5.png") no-repeat center/100% 100%;
        }
      }
      video {
        width:100%;
        height:100%;
      }
    }
    .dialNumberBox {
      width:100%;
      height:60%;
      background-color: #2d2731;
      text-align: center;
      font-size:pxTorem(30);
      color: #fff;
      .dialTitle {
        padding-top: pxTorem(50);
        padding-bottom: pxTorem(10);
      }
      .dialSection {
        width:pxTorem(620);
        height:pxTorem(400);
        margin: 0 auto;
        div {
          width:pxTorem(200);
          height:pxTorem(200);
          display: inline-block;
          span {
            display: inline-block;
            width:pxTorem(50);
            height:pxTorem(60);
            margin-top: pxTorem(40);
            background: url("../../static/img/playList1.1.png") no-repeat center/100% 100%;
            [data-dpr="2"] &{
              background: url("../../static/img/playList1.1.png") no-repeat center/100% 100%;
            }
            [data-dpr="3"] &{
              background: url("../../static/img/playList1.2.png") no-repeat center/100% 100%;
            }
          }
          p {
            margin-top: pxTorem(10);
          }
        }
      }
      .dialHangUp {
        width:pxTorem(125);
        height:pxTorem(125);
        margin: 0 auto;
        margin-bottom: pxTorem(60);
        background: url("../../static/img/dialHangUp1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../static/img/dialHangUp1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../static/img/dialHangUp2.png") no-repeat center/100% 100%;
        }
      }
    }
  }
  .playList2 {
    background: url("../../static/img/playList2.1.png") no-repeat center/100% 100% !important;
    [data-dpr="2"] &{
      background: url("../../static/img/playList2.1.png") no-repeat center/100% 100% !important;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/playList2.2.png") no-repeat center/100% 100% !important;
    }
  }
  .playList3 {
    background: url("../../static/img/playList3.1.png") no-repeat center/100% 100% !important;
    [data-dpr="2"] &{
      background: url("../../static/img/playList3.1.png") no-repeat center/100% 100% !important;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/playList3.2.png") no-repeat center/100% 100% !important;
    }
  }
  .playList4 {
    background: url("../../static/img/playList4.1.png") no-repeat center/100% 100% !important;
    [data-dpr="2"] &{
      background: url("../../static/img/playList4.1.png") no-repeat center/100% 100% !important;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/playList4.2.png") no-repeat center/100% 100% !important;
    }
  }
  .playList5 {
    background: url("../../static/img/playList5.1.png") no-repeat center/100% 100% !important;
    [data-dpr="2"] &{
      background: url("../../static/img/playList5.1.png") no-repeat center/100% 100% !important;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/playList5.2.png") no-repeat center/100% 100% !important;
    }
  }
  .playList6 {
    background: url("../../static/img/playList6.1.png") no-repeat center/100% 100% !important;
    [data-dpr="2"] &{
      background: url("../../static/img/playList6.1.png") no-repeat center/100% 100% !important;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/playList6.2.png") no-repeat center/100% 100% !important;
    }
  }
</style>
