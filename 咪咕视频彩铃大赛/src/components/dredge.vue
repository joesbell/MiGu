<template>
  <div class="dredge">
    <header class="title">
      <span class="titleIcon" @click="toIndex"></span>
      开通流程
    </header>
    <section class="dredgeContentBox">
      <p class="dredgeTitle">免费</p>
      <p class="dredgeText">发送短信KTVOLTE到10086</p>
    </section>
    <footer class="dredgeBottomBox">
      <p class="bottomTitle">业务说明</p>
      <p>1.订购视频彩铃需先开通VoLTE功能(免费)、 基础彩铃功能
      </p>
      <p>2.视频彩铃功能全国已.上线(除新疆、西藏)，免收流量费，
        详询当地移动公司
      </p>
      <p>3.在拨打电话时观看视频彩铃由四个条件:
      </p>
      <p>◆主叫方的终端支持视频彩铃功能</p>
      <p>◆主叫方开通了VoLTE功能(免费)
      </p>
      <p>◆主叫方的网络条件良好
      </p>
      <p>◆被叫方开通了视频彩铃功能</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "dredge",
    data () {
      return{
      }
    },
    methods:{
      toIndex:function () {
        window.location.href="./login.html"
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .dredge {
    width: 100%;
    height:100%;
    position: relative;
    font-size: pxTorem(30);
    background-color: #fff;
    .title{
      width: 100%;
      height: pxTorem(90);
      background: #ffffff;
      font-size:pxTorem(36);
      font-weight: 500;
      text-align: center;
      line-height: pxTorem(90);
      border-bottom: solid 1px #ccc;
      position: fixed;
      top: 0;
      .titleIcon {
        position: absolute;
        left: pxTorem(20);
        top:pxTorem(20);
        display: inline-block;
        width:pxTorem(30);
        height: pxTorem(50);
        background: url("../../static/img/titleIcon.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../static/img/titleIcon.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../static/img/titleIcon1.png") no-repeat center/100% 100%;
        }
      }
    }
    .dredgeContentBox {
      text-align: center;
      margin-top: pxTorem(91);
      background-color: #fff;
      padding: pxTorem(40) pxTorem(45);
      font-size: pxTorem(31);
      .dredgeTitle {
        color: red;
        font-size:pxTorem(36);
      }
      .dredgeText {
        margin-top: pxTorem(20);
        color: #999;
      }
    }
    .dredgeBottomBox {
      position: absolute;
      bottom:pxTorem(100);
      background-color: #fff;
      color: #999;
      font-size:pxTorem(28);
      padding: pxTorem(40);
      .bottomTitle {
        color: black;
        font-size: pxTorem(31);
        margin-bottom: pxTorem(30);
      }
      p {
        margin-bottom: pxTorem(10);
        line-height: pxTorem(40);
      }
    }
  }
</style>
