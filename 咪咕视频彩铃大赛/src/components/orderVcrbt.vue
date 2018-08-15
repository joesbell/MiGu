<template>
  <div class="orderVcrbt">
    <span class="closeIcon" @click="toIndex"></span>
    <div class="playVideoBox">
      <img :src="videoMsg.imageUrl"/>
      <video :src="videoMsg.source" ref="video" preload="auto" controls x5-playsinline="true" playsinline webkit-playsinline></video>
    </div>
    <div class="orderContentBox">
      <div class="orderContentTitle">
        <p class="titleVideoName">{{videoMsg.ringtoneName}}</p>
        <p class="fontSize24">{{videoMsg.nickName}}</p>
        <p class="price">尝鲜价：<span class="fontSize14">￥</span><span>{{videoMsg.price}}</span></p>
      </div>
      <div class="orderContentText">
        <p>有效期 <span>{{videoMsg.expireTime}}</span></p>
        <p>1、视频彩铃功能全国已上线(除新疆、西藏)， 免收流
          量费，详询当地移动公司。
        </p>
        <p>2、订购视频彩铃铃音需开通VoLTE功能(免费)、音频
          彩铃功能、视频彩铃功能。</p>
        <p>3、在拨打电话时观看到视频彩铃有四个条件:</p>
        <p>1)拨打方(主叫)的终端支持视频彩铃功能。</p>
        <p>2)拨打方(主叫)开通了VoLTE功能(免费)。</p>
        <p>3)拨打方(主叫) 的网络条件良好。</p>
        <p>4)被拨打方(被叫)开通了视频彩铃功能。</p>
        <div style="height: 250px;"></div>
      </div>
    </div>
    <div class="orderNow">
      <div class="orderBtn" @click="orderBtn(videoMsg.ringtoneId)">立即订购</div>
    </div>
    <tips  v-show="showTips" :msg="loginTips"></tips>
  </div>
</template>

<script>
  import tips from "@/components/tips";
  export default {
    name: "orderVcrbt",
    data () {
      return{
        showTips:false,
        loginTips:"",
        sourceUrl:"",
        id:"",
        videoMsg:"",
      }
    },
    watch:{
      sourceUrl(){
        this.$nextTick(function () {
          this.$refs.video.play()
        })
      }
    },
    components:{
      tips
    },
    mounted(){
      let _this=this;
      this.$nextTick(function () {
        // _this.sourceUrl=_this.$route.params.sourceUrl
        _this.id=_this.$route.query.id
        _this.getVideMsg()
//        console.log(_this.sourceUrl)
      })
    },
    methods:{
      orderBtn(id){
        let _this=this;
        this.$http.post("/userOper/orderTone.action",{
          ringtoneId:id
        })
          .then(function (re) {
            if(re.state=="000000"){
              _this.showTips=true;
              _this.loginTips="订购成功";
              setTimeout(function () {
                _this.showTips=false;
                _this.loginTips="";
                _this.$router.push({
                  name:'videoDIY'
                })
              },1000)

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getVideMsg(){
        let _this=this;
        this.$http.get("ringtoneManager/getRingtoneInfo.action",{
          ringtoneId:this.id
        }).then(re=>{
          if(re.state=="000000"){
            _this.videoMsg=re.ringtoneInfo
          }
        }).catch(re=>{

        })
      },
      toIndex:function () {
        this.$router.push({
          name:'videoDIY'
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .orderVcrbt {
    width: 100%;
    height:100%;
    position: relative;
    font-size: pxTorem(30);
    background-color: #fff;
    .closeIcon {
      position: absolute;
      z-index: 99999!important;
      right: pxTorem(20);
      top:pxTorem(20);
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
    .playVideoBox {
      width:100%;
      height:40%;
      background-color: #000;
      text-align: center;
      img {
        width:100%;
        height:40%;
        position: absolute;
        top:0;
        left:0;
      }
      video {
        width:80%;
        height:99.8%;
        position: relative;
        z-index: 999;
      }
    }
    .orderContentBox {
      font-size:pxTorem(28);
      color: #999;
      padding: pxTorem(40);
      overflow: scroll;
      -webkit-overflow-scrolling:touch;
      height: pxTorem(700);
      .orderContentTitle {
        border-bottom: solid 1px #ccc;
        margin-bottom: pxTorem(20);
        p {
          margin-bottom: pxTorem(20);
        }
        .titleVideoName {
          color: #000;
          font-size: pxTorem(30);
        }
        .fontSize24 {
          font-size: pxTorem(24);
        }
        .price {
          color: #666;
        }
        span {
          color: #ea1e63;
          font-size: pxTorem(40);
          font-weight: bold;
        }
      }
      .orderContentText {
        line-height: pxTorem(50);
      }
    }
    .orderNow {
      width:100%;
      height:pxTorem(100);
      text-align: center;
      line-height: pxTorem(100);
      color: #fff;
      position: fixed;
      background-color: #fff;
      bottom: 0;
      border-top: solid 1px #999;
      .orderBtn {
        text-align: center;
        width:pxTorem(200);
        height:pxTorem(70);
        position: absolute;
        top:50%;
        left: 50%;
        margin-left: pxTorem(-100);
        margin-top: pxTorem(-35);
        line-height: pxTorem(70);
        border-radius: pxTorem(50);
        background-color: #ea1e63;
      }
    }
  }
</style>
