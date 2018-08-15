<template>
    <div class="myRbt">
      <div class="vcrbtIndex" v-show="vcrbtIndex">
        <header class="title">
          <span class="outIcon" @click="outLogin"></span>
          我的彩铃
        </header>
        <div class="myRbtMenuBox topTitle">
          <div class="mrMenuList mrNumber">
            {{phoneNumber}}
          </div>
          <div class="mrMenuList mrMsg">
            (若您设置了视频彩铃，对方拨打电话优先展示视频彩铃)
          </div>
          <div class="mrMenuBtnBox">
            <div class="mrMenuListBtn">
              <span class="mrMenuListIcon"></span>
              视频彩铃功能
            </div>
          </div>
        </div>
        <div class="myRbtListBox boxCenter">
          <div class="myRbtListBoxTitle">
            视频彩铃
          </div>
          <v-touch @tap="diy_video" class="diy_videoBtn">
            <span class="diy_videoIcon"></span>
            自制视频彩铃管理
          </v-touch>
          <div class="boxLift">
            <p>当前彩铃<span class="colorGrey">（<span>{{haveCurrentRringtoneNumber}}</span>）</span></p>
            <div class="listContentBox" v-if="haveCurrentRringtoneNumber==0">暂无彩铃哦~</div>
            <div class="videoContentBox"  v-for="(current,index) in currentVideoRingtoneList" v-bind:key="index">
              <section class="videoContent">
                <v-touch @tap="toPlayCurrentVideo(current.source)">
                  <img :src="current.imageUrl"/>
                  <video :src="current.source" x5-playsinline="true" playsinline webkit-playsinline ></video>
                </v-touch>
                <p class="videoContent_title">{{current.ringtoneName}}</p>
                <p class="videoContent_singer colorGrey fontSize28">{{current.nickName}}</p>
              </section>
              <span class="videoIcon" @click="showToggle(index)"></span>
              <div style="clear:both;"></div>
              <transition name="fadeIn">
                <section class="contentControlsBox"  v-if="isShow==index">
                  <div class="controlsBox">
                    <div class="controlsBoxItem" @click="setIdle(current.ringtoneId,current.settingId)">
                      <p class="setIdleIcon"></p>
                      <p>设为闲置</p>
                    </div>
                    <div class="controlsBoxItem" @click="deleteIdle(current.ringtoneId,current.settingId)">
                      <p class="deleteIcon"></p>
                      <p>删除</p>
                    </div>
                    <!--<div class="controlsBoxItem">-->
                    <!--<p class="shareIcon"></p>-->
                    <!--<p>分享</p>-->
                    <!--</div>-->
                  </div>
                  <div class="dateTime">有效期至：{{current.expireTime | currentTime}}</div>
                </section>
              </transition>
            </div>
          </div>
        </div>

        <div class="myRbtListBox">
          <p>闲置彩铃<span class="colorGrey">（<span>{{haveIdleRringtoneNumber}}</span>）</span></p>
          <div class="listContentBox" v-if="haveIdleRringtoneNumber==0">暂无彩铃哦~</div>
          <div class="videoContentBox" v-for="(idle,index) in idleVideoRingtoneList" v-bind:key="index">
            <section class="videoContent">
              <v-touch @tap="toPlayIdleVideo(idle.source)">
                <img :src="idle.imageUrl"/>
                <video :src="idle.source" x5-playsinline="true" playsinline webkit-playsinline ></video>
              </v-touch>
              <p class="videoContent_title">{{idle.ringtoneName}}</p>
              <p class="videoContent_singer colorGrey fontSize28">{{idle.nickName}}</p>
            </section>
            <span class="videoIcon" @click="showToggleIdle(index)"></span>
            <div style="clear:both;"></div>

            <transition name="fadeIn">
              <section class="contentControlsBox"  v-if="isShowIdle == index">
                <div class="controlsBox">
                  <div class="controlsBoxItem" @click="setCurrent(idle.ringtoneId)">
                    <p class="setCurrentIcon"></p>
                    <p>设为当前</p>
                  </div>
                  <div class="controlsBoxItem" @click="deleteCurrent(idle.ringtoneId)">
                    <p class="deleteIcon"></p>
                    <p>删除</p>
                  </div>
                  <!--<div class="controlsBoxItem">-->
                  <!--<p class="shareIcon"></p>-->
                  <!--<p>分享</p>-->
                  <!--</div>-->
                </div>
                <div class="dateTime">有效期至：{{idle.expireTime | currentTime}}</div>
              </section>
            </transition>
          </div>
        </div>
        <footer class="myRbtListBox">
          <p class="footerP">更多说明</p>
          <p class="footerP colorGrey fontSize28">若当前视频列表内有多个视频列表，对方拨打你的电话时，会随机播放其中一段视频。</p>
          <p class="footerP colorGrey fontSize28">如果你暂时不想让对方看到这段视频，只需将视频设为闲置即可，不需要删除视频。</p>
        </footer>
        <tips  v-show="showTips" :msg="loginTips"></tips>
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
  import tips from "./tips";
    export default {
        name: "myRbt",
        data () {
          return {
            phoneNumber:"",
            haveIdleRringtoneNumber: 0,
            haveCurrentRringtoneNumber: 0,
            isShow: "false",
            isShowIdle: "false",
            currentVideoRingtoneList:[],
            idleVideoRingtoneList:[],
            vcrbtIndex:true,
            playVideo:false,
            clickVideo:"",
            showTips:false,
            loginTips:""
          }
        },
      components:{
        tips
      },
      filters:{
        currentTime:function (time) {
          time = time.substr(0,10)
          return time
        }
      },
        methods:{
          // 退出登录
          outLogin(){
            
            localStorage.removeItem("token")
            localStorage.removeItem("userName")
            localStorage.removeItem("nickName")
            window.location.href="./index.html"
          },
//          数据变更 重新刷新
          reloadApi:function (th) {
            th.$http.post('/searchUserInfo/findBusinessAndRingtoneList.action',{
              flag:"00"
            })
              .then(function (res) {
                th.haveCurrentRringtoneNumber = res.currentVideoRingtoneList.length;
                th.haveIdleRringtoneNumber = res.idleVideoRingtoneList.length;
                th.currentVideoRingtoneList = res.currentVideoRingtoneList;
                th.idleVideoRingtoneList = res.idleVideoRingtoneList;
              })
              .catch(function (err) {
                console.log(err)
              })
          },
//          闲置板块 设为当前
          setCurrent:function (ringtoneId) {
            let _this = this;
            this.$http.get("/userOper/operNotUsedRingtone.action",{
              ringtoneId:ringtoneId,
              flag:"00"
            })
              .then(function (res) {
                if (res.state === "000000"){
                  _this.showTips=true;
                  _this.loginTips="设为当前成功";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                  _this.reloadApi(_this);
                }else {
                  _this.showTips=true;
                  _this.loginTips="设为当前失败";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
//          删除
          deleteCurrent:function (ringtoneId) {
            let _this = this;
            this.$http.get("/userOper/operNotUsedRingtone.action",{
              ringtoneId:ringtoneId,
              flag:"01"
            })
              .then(function (res) {
                    if (res.state === "000000"){
                    _this.showTips=true;
                    _this.loginTips="删除成功";
                    let timer=setTimeout(function () {
                      _this.showTips=false;
                    },1500)
                    _this.reloadApi(_this);
                  }else {
                  _this.showTips=true;
                  _this.loginTips="删除失败";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
//          当前板块 设为闲置
          setIdle:function (ringtoneId,settingId) {
            let _this = this;
            this.$http.get("/userOper/operCurrentRingtone.action",{
              ringtoneId:ringtoneId,
              settingId:settingId,
              flag:"00"
            })
              .then(function (res) {
                if (res.state === "000000"){
                  _this.showTips=true;
                  _this.loginTips="设为闲置成功";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                  _this.reloadApi(_this);
                }else {
                  _this.showTips=true;
                  _this.loginTips="设为闲置失败";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
//          删除
          deleteIdle:function (ringtoneId,settingId) {
            let _this = this;
            this.$http.get("/userOper/operCurrentRingtone.action",{
              ringtoneId:ringtoneId,
              settingId:settingId,
              flag:"01"
            })
              .then(function (res) {
                if (res.state === "000000"){
                  _this.showTips=true;
                  _this.loginTips="删除成功";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                  _this.reloadApi(_this);
                }else {
                  _this.showTips=true;
                  _this.loginTips="删除失败";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          showToggle: function (index) {
            if(this.isShow == index){
              this.isShow="false"
            }else {
              this.isShow = index
            }
          },
          showToggleIdle: function (index) {
            if(this.isShowIdle == index){
              this.isShowIdle="false"
            }else {
              this.isShowIdle = index
            }
          },
          diy_video:function () {
            this.$router.push({
              name:"videoDIY"
            })
          },
          toPlayCurrentVideo:function (source) {
            this.$router.push({
              name:"playVideo",
              params:{
                sourceUrl:source
              }
            })
          },
          toPlayIdleVideo:function (source) {
//            this.$router.push({
//              name:"playVideo",
//              params:{
//                sourceUrl:source
//              }
//            })
            this.vcrbtIndex = false;
            this.playVideo = true;
            this.$refs.player.innerHTML=`
<video id="video" style="width:100%;height:100%;" playsinline="playsinline" webkit-playsinline="true" x5-playsinline="true" x5-video-player-fullscreen="false"  preload="auto" autoplay  src=${source}></video>`;
            var video = document.getElementById("video");
            video.play();
            video.pause();
            setTimeout(()=>{
              video.play();
            }, 1000);
          },
          closeBtn:function () {
            this.playVideo = false;
            this.vcrbtIndex = true;
            video.pause();
          }
        },
        mounted: function () {
            let _this=this;
            let number=localStorage.getItem("userName");
            this.phoneNumber=number.substr(0,3)+"****"+number.substr(7)
            this.$http.post('/searchUserInfo/findBusinessAndRingtoneList.action',{
              flag:"00"
            })
              .then(function (res) {
                if(res.videoRingtone === "01"){
                  window.location.href="./index.html#/dredge"
                  return
                }
                _this.haveCurrentRringtoneNumber = res.currentVideoRingtoneList.length;
                _this.haveIdleRringtoneNumber = res.idleVideoRingtoneList.length;
                _this.currentVideoRingtoneList = res.currentVideoRingtoneList;
                _this.idleVideoRingtoneList = res.idleVideoRingtoneList;
              })
              .catch(function (err) {
                console.log(err)
              });
          }
    }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .myRbt{
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    position: relative;
    font-size: pxTorem(30);
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
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
      z-index: 99;
      .outIcon {
        width:pxTorem(60);
        height:pxTorem(60);
        background: url("../../static/img/outIcon.png") no-repeat center/100% 100%;
        position: absolute;
        right:pxTorem(20);
        top:pxTorem(15);
      }
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
    .myRbtMenuBox{
      padding: 0 pxTorem(50);
      background: #ffffff;
      .mrMenuList{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding-top: pxTorem(30);
      }
      .mrNumber{
        font-size:pxTorem(45);
        font-weight: bold;
      }
      .mrMsg{
        color: #999;
        font-size: pxTorem(26);
      }
    }
    .myRbtListBox{
      background: #ffffff;
      margin-top: pxTorem(20);
      padding: pxTorem(30);
      font-size: pxTorem(36);
      .listContentBox {
        width: 100%;
        height:pxTorem(200);
        line-height: pxTorem(200);
        text-align: center;
        color: #999;
      }
      .videoContentBox {
        font-size: pxTorem(31);
        position: relative;
        margin: pxTorem(20) 0;
        .videoContent {
          width: 98%;
          float: left;
          div {
            display: inline-block;
            width:pxTorem(300);
            height:pxTorem(200);
            margin-right: pxTorem(20);
            float: left;
            video {
              width:pxTorem(300);
              height:pxTorem(200);
              float: left;
              margin-right: pxTorem(20);
            }
            img {
              display: inline-block;
              position: absolute;
              z-index: 99;
              width:pxTorem(300);
              height:pxTorem(200);
              float: left;
              margin-right: pxTorem(20);
            }
          }

          .videoContent_title {
            margin-top: pxTorem(30);
          }
          .videoContent_singer {
            margin-top: pxTorem(20);
          }
        }

        .videoIcon {
          float: right;
          display: inline-block;
          position: absolute;
          top:pxTorem(50);
          right:0;
          /*margin: pxTorem(30);*/
          width:pxTorem(50);
          height:pxTorem(40);
          background: url("../../static/img/videoIcon1.png") no-repeat center/20% 100%;
          [data-dpr="2"] &{
            background: url("../../static/img/videoIcon1.png") no-repeat center/20% 100%;
          }
          [data-dpr="3"] &{
            background: url("../../static/img/videoIcon2.png") no-repeat center/20% 100%;
          }
        }
        .contentControlsBox {
          width: 100%;
          text-align: center;
          color: #999;
          background-color: #f8f8f8;
          padding-bottom: pxTorem(20);
          margin-top: pxTorem(20);
          .controlsBox {
            display: flex;
            padding-top: pxTorem(20);
            margin-bottom: pxTorem(20);
            .controlsBoxItem {
              flex: 1;
              p {
                margin-bottom: pxTorem(15);
              }
            }
          }
          .dateTime {
            margin: 0 auto;
            width:pxTorem(300);
            padding: pxTorem(3);
            border: solid 1px #999;
            border-radius: pxTorem(30);
            font-size:pxTorem(24);
          }
        }
      }
      .footerP {
        margin-bottom: pxTorem(40);
      }
    }
    .mrMenuBtnBox{
      width: 100%;
      display: flex;
      /*justify-content: space-around;*/
      .mrMenuListBtn{
        height: pxTorem(50);
        line-height:pxTorem(50);
        font-size: pxTorem(30);
        margin: pxTorem(30) 0;
        color: #1e1e1e;
        font-weight: 500;
        .mrMenuListIcon {
          display: inline-block;
          width:pxTorem(30);
          height: pxTorem(30);
          position: relative;
          top:pxTorem(3);
          background: url("../../static/img/mrMenuListIcon1.png") no-repeat center/100% 100%;
          [data-dpr="2"] &{
            background: url("../../static/img/mrMenuListIcon1.png") no-repeat center/100% 100%;
          }
          [data-dpr="3"] &{
            background: url("../../static/img/mrMenuListIcon2.png") no-repeat center/100% 100%;
          }
        }
      }
    }
    .diy_videoBtn{
      display: inline-block;
      margin-top: pxTorem(50);
      margin-bottom: pxTorem(30);
      width: pxTorem(450);
      height: pxTorem(80);
      line-height:pxTorem(80);
      text-align: center;
      border-radius: pxTorem(50);
      border: 1px solid #ccc;
      .diy_videoIcon {
        display: inline-block;
        width:pxTorem(30);
        height:pxTorem(30);
        margin-top: pxTorem(20);
        margin-right: pxTorem(20);
        background: url("../../static/img/diy_videoIcon1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../static/img/diy_videoIcon1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../static/img/diy_videoIcon2.png") no-repeat center/100% 100%;
        }
      }
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
  }
  .topTitle {
    margin-top: pxTorem(91);
  }
  .myRbtListBoxTitle {
    width: 100%;
    height: pxTorem(90);
    background: #ffffff;
    font-size:pxTorem(36);
    font-weight: 500;
    text-align: center;
    line-height: pxTorem(90);
    border-bottom: solid 1px #ccc;
  }
  .boxCenter {
    text-align: center;
    padding: pxTorem(0) !important;
  }
  .boxLift {
    text-align: left;
    padding: pxTorem(20);
  }
  .colorGrey {
    color: #999;
  }
  .fontSize28 {
    font-size: pxTorem(28);
  }
  .setCurrentIcon {
    width:pxTorem(40);
    height:pxTorem(40);
    margin: 0 auto;
    background: url("../../static/img/bell@2x.png") no-repeat center/100% 100%;
    [data-dpr="2"] &{
      background: url("../../static/img/bell@2x.png") no-repeat center/100% 100%;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/bell@3x.png") no-repeat center/100% 100%;
    }
  }
  .setIdleIcon {
    width:pxTorem(40);
    height:pxTorem(40);
    margin: 0 auto;
    background: url("../../static/img/idle@2x.png") no-repeat center/100% 100%;
    [data-dpr="2"] &{
      background: url("../../static/img/idle@2x.png") no-repeat center/100% 100%;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/idle@3x.png") no-repeat center/100% 100%;
    }
  }
  .deleteIcon {
    width:pxTorem(40);
    height:pxTorem(40);
    margin: 0 auto;
    background: url("../../static/img/delIcon2x.png") no-repeat center/100% 100%;
    [data-dpr="2"] &{
      background: url("../../static/img/delIcon2x.png") no-repeat center/100% 100%;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/delIcon3x.png") no-repeat center/100% 100%;
    }
  }
  .shareIcon {
    width:pxTorem(40);
    height:pxTorem(40);
    margin: 0 auto;
    background: url("../../static/img/share@2x.png") no-repeat center/100% 100%;
    [data-dpr="2"] &{
      background: url("../../static/img/share@2x.png") no-repeat center/100% 100%;
    }
    [data-dpr="3"] &{
      background: url("../../static/img/share@3x.png") no-repeat center/100% 100%;
    }
  }
  /*动画效果*/
  .fadeIn-enter-active,.fadeIn-leave-active {
    transition: all .2s ease;
  }
  .fadeIn-enter,.fadeIn-leave-active {
    opacity: 0;
    transform:translateY(50px);
  }
  .fadeUp-enter-active,.fadeUp-leave-active {
    transition: all .6s ease;
  }
  .fadeUp-enter,.fadeUp-leave-active {
    opacity: 0;
  }
</style>
