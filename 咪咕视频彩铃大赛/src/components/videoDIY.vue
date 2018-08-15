<template>
  <div class="videoDIY">
    <div class="vcrbtIndex" v-show="vcrbtIndex">
      <div class="vd_titleBox">
        <div class="vd_title" ref="vd_title">
        <span @click="goback" class="vd_goback">

        </span>
          视频DIY
          <span @click="make_up" class="vd_upload">
          制作
        </span>
        </div>
        <div class="vd_warn" @click="go_warn" ref="vd_warn">
          审核通过后即可帮您设为彩铃，审核时长24小时以内 <span class="vd_warnIcon"></span>
        </div>
      </div>
      <div class="uploadedBox">
        <div class="uploadedBoxTitle" ref="uploadedBoxTitle">
          <div>已上传(<span>{{number}}</span><span>)</span></div>
          <div @click="edit()" class="editIcon"></div>
        </div>
        <div class="uploadedVideosBox" ref="uploadedVideosBox">
          <div class="uploadedVideos" v-for="(item,index) in diyVideoBox" :key="index">
            <div class="uploadedVideoListBox">
              <div class="uploadedVideoList">
                <div class="uploadedVideo">
                  <v-touch @tap="toPlayIdleVideo(item.url)" class="videoContent">
                    <img  :src="item.imageurl" />
                    <video :src="item.url" x5-playsinline="true" playsinline webkit-playsinline></video>
                    <!--<p class="videoContent_singer colorGrey fontSize28">徐佳莹</p>-->
                  </v-touch>
                </div>
                <div class="uploadedVideoMsg">
                  <p class="uvm_title">{{item.diyname}}</p>
                  <p class="uvm_username">{{nickName}}</p>
                </div>
              </div>
              <div class="uploadedVideoStatus">
                <span v-if="item.status==1">转码中</span>
                <span v-if="item.status==2">审核中</span>
                <span v-if="item.status==3">上架中</span>
                <span class="orderVideo" v-if="item.status==4" @click="orderVideo(item.id)">订购</span>
                <span v-if="item.status==5">已订购</span>
                <span v-if="item.status==99">未通过</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="uploadWrap" :class="{ showUpload: show === 'true'}" >
        <p class="uw_title">可以通过以下方式制作彩铃</p>
        <div class="uw_Video_btn" @click="go_upload">
          <div class="uw_Video_iconBox">
            <div class="uw_Video_icon">

            </div>
          </div>
          <div class="uw_Video_Msg">
            <p class="uw_Video_Msg1">上传视频</p>
            <p class="uw_Video_Msg2">上传视频片段作为彩铃</p>
          </div>
        </div>
        <div @click="close_up" class="close_up">
          <div class="close_up_icon"></div>
        </div>

      </div>
    </div>
    <!--视频播放页面-->
    <transition name="fadeUp">
      <div class="playVideo" v-show="playVideo">
        <div class="playVideoBox">
          <span class="closeIcon" @click="closeBtn"></span>
          <div class="player" ref="player"></div>
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
          <div class="dialHangUp" @click="closeBtn"></div>
        </div>
      </div>
    </transition>

  </div>

</template>

<script>
  export default {
    name: "videoDIY",
    data(){
      return{
        vcrbtIndex:true,
        playVideo:false,
        number:"",
        show:"false",
        diyVideoBox:"",
        nickName:""
      }
    },
    methods:{
      orderVideo:function(id){
        this.$router.push({
          name:"orderVcrbt",
          query:{
            id:id
          }
        })

      },
      toPlayIdleVideo:function(url){
        this.vcrbtIndex = false;
        this.playVideo = true;
        this.$refs.player.innerHTML=`
<video id="video" style="width:100%;height:100%;" playsinline="playsinline" webkit-playsinline="true" x5-playsinline="true" x5-video-player-fullscreen="false"  preload="auto" autoplay  src=${url}></video>`;
        var video = document.getElementById("video");
        video.play();
        video.pause();
        setTimeout(()=>{
          video.play();
        }, 1000);
        // if(url!=null){
        //   this.$router.push({
        //     name:"playVideo",
        //     params:{
        //       sourceUrl:url
        //     }
        //   })
        // }

      },
      closeBtn:function () {
        this.playVideo = false;
        this.vcrbtIndex = true;
        video.pause();
      },
      goback:function () {
        this.$router.push({
          name:"myRbt"
        })
      },
      go_warn:function(){
        this.$router.push({
          name:"examine"
        })
      },
      make_up:function(){
        this.show="true"
      },
      close_up:function(){
        this.show="false"
      },
      go_upload:function () {
        this.$router.push({
          name:"upload"
        })
      },
      edit:function () {
        this.$router.push({
          name:"editVideos",
        })
      },
      getViode(){
        let _this=this;
        this.$http.get("ringtoneManager/findDIYRingtoneList.action")
          .then(function (re) {
            if(re.state=="000000"){
              _this.diyVideoBox=re.diyRingtoneList;
              _this.number=re.diyRingtoneList.length
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      this.nickName=localStorage.getItem("nickName")
      let _this=this;
      this.$nextTick(function () {
        _this.$refs.uploadedVideosBox.style.height=`${document.documentElement.clientHeight}`-_this.$refs.uploadedBoxTitle.offsetHeight-_this.$refs.vd_title.offsetHeight-_this.$refs.vd_warn.offsetHeight+"px"
        _this.getViode()
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .videoDIY{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .vd_titleBox{
    width: 100%;
    height: pxTorem(88);
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    font-size: pxTorem(36);
    z-index: 1000;

    font-weight: 500;
    text-align: center;
    line-height: pxTorem(88);
    .vd_title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      color: #1e1e1e;
      text-align: center;
      line-height: pxTorem(88);
      /*position: relative;*/
    }
    .vd_upload ,.vd_goback{
      display: inline-block;
      font-size: pxTorem(24);
      margin: 0 pxTorem(25);
    }
    .vd_goback{
      width: pxTorem(24);
      height: pxTorem(44);
      background: url("../../static/img/left@2x.png") no-repeat center;
      background-size: 100%;
      /*[data-dpr="2"] & {*/
        /*width: 24px;*/
        /*height: 44px;*/
        /*background: url("../../static/img/left@2x.png") no-repeat center;*/
      /*}*/
      /*[data-dpr="3"] & {*/
        /*width: 36px;*/
        /*height: 66px;*/
        /*background: url("../../static/img/left@3x.png") no-repeat center;*/
      /*}*/

    }
    .vd_warn{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: pxTorem(88);
      /*line-height: pxTorem(88);      /*line-height: pxTorem(88);*/
      /*text-align: center;*/
      font-size: pxTorem(26);
      color: #f13333;
      background:url("../../static/img/warnBg.png") ;
    }

  }
  .uploadedBox{
    margin-top: pxTorem(176);
    .uploadedBoxTitle{
      padding: pxTorem(25);
      height: pxTorem(32);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #1e1e1e;
      .editIcon{
        width: pxTorem(40);
        height: pxTorem(35);
        background: url("../../static/img/edit.png") no-repeat center;
        background-size: 100%;
        /*[data-dpr="2"] & {*/
          /*width: 40px;*/
          /*height: 35px;*/
          /*background: url("../../static/img/edit.png") no-repeat center;*/
        /*}*/
        /*[data-dpr="3"] & {*/
          /*width: 60px;*/
          /*height: 53px;*/
          /*background: url("../../static/img/edit1.5.png") no-repeat center;*/
        /*}*/
      }
    }
  }
  .uploadWrap{
    position: absolute;
    width: 100%;
    left: 0;
    top: 100%;
    transition: top 0.2s;
    height: 100%;
    background: #ffffff;
    .uw_title{
      font-size: pxTorem(30);
      color: #1e1e1e;
      margin: pxTorem(60) 0 pxTorem(120) 0;
      padding: 0 pxTorem(45);
    }
    .uw_Video_btn{
      padding: 0 pxTorem(45);
      display: flex;
    }
    .uw_Video_iconBox{
      width: pxTorem(150);
      height: pxTorem(150);
      background: aqua;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
    }
    .uw_Video_icon{
      width: pxTorem(59);
      height: pxTorem(42);
      background: url("../../static/img/video.png") no-repeat center;
      background-size: 100%;
      /*[data-dpr="2"] & {*/
        /*width: 59px;*/
        /*height: 42px;*/
        /*background: url("../../static/img/video.png") no-repeat center;*/
      /*}*/
      /*[data-dpr="3"] & {*/
        /*width: 89px;*/
        /*height: 63px;*/
        /*background: url("../../static/img/video1.5.png") no-repeat center;*/
      /*}*/
    }
    .uw_Video_Msg{
      margin-left: pxTorem(20);
      height: pxTorem(150);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .uw_Video_Msg1{
        font-size: pxTorem(34);
        color: #1e1e1e;
        margin-bottom: pxTorem(20);
      }
      .uw_Video_Msg2{
        font-size: pxTorem(26);
        color: #999999;
      }
    }
  }
  .close_up{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: pxTorem(140);
    .close_up_icon{
      width:pxTorem(33);
      height: pxTorem(33);
      background: url("../../static/img/close_up.png") no-repeat center;
      background-size: 100%;
      /*[data-dpr="2"] & {*/
        /*width: 33px;*/
        /*height: 33px;*/
        /*background: url("../../static/img/close_up.png") no-repeat center;*/
      /*}*/
      /*[data-dpr="3"] & {*/
        /*width: 50px;*/
        /*height: 50px;*/
        /*background: url("../../static/img/close_up1.5.png") no-repeat center;*/
      /*}*/
    }
  }
  .showUpload{
    top: 0!important;
  }
  .uploadedVideosBox{
    width: 100%;
    overflow-y: auto;
  }
  .uploadedVideos{
    width: 100%;
    .uploadedVideoListBox{
      /*width: 100%;*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: pxTorem(20) 0;
      padding: 0 pxTorem(20);
      .uploadedVideoList{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .uploadedVideo{
        font-size: pxTorem(31);
        position: relative;
        margin: pxTorem(20) 0;
        background: #1e1e1e;
        .videoContent {
          width: 98%;
          float: left;
          video {
            width:pxTorem(300);
            height:pxTorem(200);
            float: left;
          }
          img {
            display: inline-block;
            position: absolute;
            width:pxTorem(300);
            height:pxTorem(200);
            float: left;
          }
        }
      }

      .uploadedVideoMsg{
        margin-left: pxTorem(20);
        .uvm_title{
          font-size: pxTorem(30);
          color: #1e1e1e;
        }
        .uvm_username{
          margin-top: pxTorem(18);
          font-size: pxTorem(24);
          color: #999999;
        }
      }
    }
  }
  .uploadedVideoStatus{
    width: pxTorem(100);
    margin-right: pxTorem(25);
    font-size: pxTorem(24);
    text-align: right;
  }
  .vd_warnIcon{
    display: inline-block;
    margin-left: pxTorem(25);
    /*[data-dpr="2"] & {*/
      /*width: 13px;*/
      /*height: 24px;*/
      /*background: url("../../static/img/right.png");*/
    /*}*/
    /*[data-dpr="3"] & {*/
      /*width: 20px;*/
      /*height: 37px;*/
      /*background: url("../../static/img/right1.5.png");*/
    /*}*/
    width: pxTorem(13);
    height: pxTorem(24);
    background: url("../../static/img/right.png") no-repeat center;
    background-size: 100%;
  }
  .orderVideo{
    display: inline-block;
    padding: pxTorem(10) pxTorem(20);
    border: 1px solid #ea1e63;
    color: #ea1e63;
  }

  /*视频播放页面*/
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
      .player {
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
        width:pxTorem(130);
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

  .fadeUp-enter-active,.fadeUp-leave-active {
    transition: all .6s ease;
  }
  .fadeUp-enter,.fadeUp-leave-active {
    opacity: 0;
  }

</style>
