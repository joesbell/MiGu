<template>
  <div id="vcrbtCompetition">
    <header class="indexTitle">
      <div class="innerTitle"></div>
    </header>
    <div class="indexBanner">
      <img src="../../../static/img/DIYBanner.png"/>
    </div>
    <section class="activityIntroduction">
      <div class="introductionTitle"></div>
      <div class="introductionContent">
        <div class="contentBox">&emsp;&emsp;MEST大赛共分为地方分站赛、全国总决赛，其中地方分站赛又分为线上预选赛、线下决赛。线上预选赛将采用BO1单场淘汰制，赛期设置为10天，最终决出4强队伍进入线下城市决赛。线下决赛，采用BO3双败淘汰制。最终决出冠、亚、季、殿军。每场赛区的冠军将继续角逐全国总决赛。</div>
      </div>
    </section>
    <section class="videoRecommend">
      <div class="videoBox">
        <img src="../../../static/img/DIYVideo.png">
        <p>《幻乐之城》震撼来袭</p>
        <p class="marginBottom30">虚实交替</p>
      </div>
      <div class="videoBox">
        <img src="../../../static/img/DIYVideo.png">
        <p>《幻乐之城》震撼来袭</p>
        <p class="marginBottom30">虚实交替</p>
      </div>
      <div class="videoBox">
        <img src="../../../static/img/DIYVideo.png">
        <p>《幻乐之城》震撼来袭</p>
        <p>虚实交替</p>
      </div>
      <div class="videoBox">
        <img src="../../../static/img/DIYVideo.png">
        <p>《幻乐之城》震撼来袭</p>
        <p>虚实交替</p>
      </div>
    </section>
    <section class="joinCompetition">
      <div class="joinTitle" @click="joinCompetition">我要参加</div>
      <div class="joinBox">
        <div class="joinBoxItem" @click="toMigu">&emsp;&emsp;什么是视频彩铃？</div>
        <div class="joinBoxItem joinBoxItem2" @click="toMyRbt">我的视频彩铃</div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "vcrbtCompetition",
    data() {
      return {
      }
    },
    methods: {
      joinCompetition: function () {
             window.location.href="./index.html"
      },
      toMigu: function() {
        window.location.href = 'http://m.music.migu.cn/migu/l/?s=149&p=163&c=10033&j=l';
      },
      toMyRbt: function () {
        window.location.href = 'http://m.music.migu.cn/migu/s/?s=153&p=298&c=9137&j=l';
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../static/fixRem";
  #vcrbtCompetition {
    font-family: 'Microsoft Yahei';
    color: #444;
    width: 100%;
    background: #fcfcfc;
    position: relative;
    height: 100%;
    font-size: pxTorem(28);
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    text-align: center;
    .indexTitle {
      padding: pxTorem(60);
      .innerTitle {
        margin: 0 auto;
        width:pxTorem(450);
        height:pxTorem(120);
        background: url("../../../static/img/innerTitle1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../../static/img/innerTitle1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../../static/img/innerTitle2.png") no-repeat center/100% 100%;
        }
      }
    }
    .indexBanner {
      text-align: center;
      img {
        width:pxTorem(700);
        height:pxTorem(400);
      }
    }
    .activityIntroduction {
      padding-top: pxTorem(60);
      .introductionTitle {
        margin: 0 auto;
        width:pxTorem(380);
        height:pxTorem(100);
        background: url("../../../static/img/introductionTitle1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../../static/img/introductionTitle1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../../static/img/introductionTitle2.png") no-repeat center/100% 100%;
        }
      }
      .introductionContent {
        position: relative;
        margin: 0 auto;
        width:pxTorem(700);
        height:pxTorem(380);
        background: url("../../../static/img/introductionContent1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../../static/img/introductionContent1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../../static/img/introductionContent2.png") no-repeat center/100% 100%;
        }
        .contentBox {
          margin: pxTorem(20) pxTorem(15);
          padding: pxTorem(20);
          text-align: left;
          color: #ea1e63;
          background-color: #fff;
          position: absolute;
          top:8%;
          border-radius: pxTorem(10);
        }
      }
    }
    .videoRecommend {
      background: url("../../../static/img/videoRecommend1.png") no-repeat center/100% 100%;
      [data-dpr="2"] &{
        background: url("../../../static/img/videoRecommend1.png") no-repeat center/100% 100%;
      }
      [data-dpr="3"] &{
        background: url("../../../static/img/videoRecommend2.png") no-repeat center/100% 100%;
      }
      padding: pxTorem(40) pxTorem(10);
      margin-top: pxTorem(30);
      display: flex;
      flex-wrap: wrap;
      .videoBox {
        flex: 1;
        margin:0 pxTorem(10);
        text-align: left;
        img {
          width:pxTorem(340);
          height:pxTorem(260);
        }
      }
    }
    .joinCompetition {
      padding: pxTorem(60) pxTorem(30);
      .joinTitle {
        width:pxTorem(650);
        height:pxTorem(100);
        background: linear-gradient(90deg, #ea2063, #fcce31);
        border-radius: pxTorem(50);
        margin: 0 auto;
        line-height: pxTorem(100);
        font-size: pxTorem(45);
        color: #fff;
        letter-spacing: pxTorem(30);
        margin-bottom: pxTorem(60);
      }
      .joinBox {
        background: url("../../../static/img/joinBox1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../../static/img/joinBox1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../../static/img/joinBox2.png") no-repeat center/100% 100%;
        }
        padding: pxTorem(40);
        .joinBoxItem {
          background: url("../../../static/img/joinBoxItem1-1.png") no-repeat center/100% 100%;
          [data-dpr="2"] &{
            background: url("../../../static/img/joinBoxItem1-1.png") no-repeat center/100% 100%;
          }
          [data-dpr="3"] &{
            background: url("../../../static/img/joinBoxItem1-2.png") no-repeat center/100% 100%;
          }
          width:pxTorem(480);
          height:pxTorem(100);
          line-height: pxTorem(100);
          margin: pxTorem(20) auto;
          font-size: pxTorem(36);
          color: #fff;
        }
        .joinBoxItem2 {
          background: url("../../../static/img/joinBoxItem2-1.png") no-repeat center/100% 100%;
          [data-dpr="2"] &{
            background: url("../../../static/img/joinBoxItem2-1.png") no-repeat center/100% 100%;
          }
          [data-dpr="3"] &{
            background: url("../../../static/img/joinBoxItem2-2.png") no-repeat center/100% 100%;
          }
          color: #ea1f63;
        }
      }
    }
    .marginBottom30 {
      margin-bottom: pxTorem(30);
    }
  }

</style>

