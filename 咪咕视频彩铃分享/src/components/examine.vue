<template>
  <div class="examine">
    <header class="title">
      <span class="titleIcon" @click="tomyRbt"></span>
      审核流程
    </header>
    <div class="examineContentBox">
      <div class="examineTitle">DIY自制彩铃审核过程分为以下几个步骤</div>
      <section class="fileManageBox">
        <div class="leftBox">
          <div class="fileBoxLift">文件处理</div>
        </div>
        <p class="fileBoxRight">对上传的视频进行媒体格式处理,使其可在网络中正常播放</p>
        <div style="clear: both"></div>
        <div class="fileBoxImg"></div>
      </section>
      <section class="fileExaminingBox">
        <div class="fileBoxLift marginBottom">审核中</div>
        <p class="fileBoxRight">对彩铃名称和用户昵称进行规范校验，对彩铃内容进行人工审核</p>
        <p class="fileBoxRight colorGrey fontSize24">名称校验标准：a.不能出现特殊字符和敏感词；b.不能出现非中、英文字符；c，彩铃时长必须在7-45s范围内
          人工审核标准：a.彩铃播放正常，不出现播放无声音/无画面等；b.不出现不健康、违反法律法规、违反道德规范的内容</p>
        <div style="clear: both"></div>
        <div class="fileBoxImg examineImg"></div>
      </section>
      <section class="fileTakingBox">
        <div class="fileBoxLift">生效中</div>
        <p class="fileBoxRight">审核通过的视频彩铃正在系统中配置生效</p>
        <div style="clear: both"></div>
        <div class="fileBoxImg"></div>
      </section>
      <section class="fileSettingBox">
        <div class="fileBoxLift">已设置</div>
        <p class="fileBoxRight heigthBottom">生效后系统将自动帮助用户进行设置;若设置失败，用户可手动进行设置</p>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "exmaine",
    data () {
      return{
      }
    },
    methods:{
      tomyRbt:function () {
        this.$router.push({
          name:"videoDIY"
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .examine {
    width: 100%;
    height:100%;
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
    .examineContentBox {
      margin-top: pxTorem(91);
      background-color: #fff;
      padding: pxTorem(40) pxTorem(45);
      font-size: pxTorem(24);
      height:100%;
      .examineTitle {
        font-size: pxTorem(30);
        text-align: center;
        margin-bottom: pxTorem(40);
      }
      .fileManageBox,
      .fileExaminingBox,
      .fileTakingBox,
      .fileSettingBox {
        .fileBoxLift {
          width:pxTorem(200);
          height:pxTorem(80);
          line-height:pxTorem(80);
          text-align: center;
          border: solid 2px #ea1e63;
          border-radius: pxTorem(50);
          font-size: pxTorem(32);
          color: #ea1e63;
          font-weight:500;
          margin-right: pxTorem(20);
          padding: 0 pxTorem(15);
          float: left;
        }
        .fileBoxRight {
          line-height: pxTorem(35);
        }
        .fileBoxImg {
          width:pxTorem(60);
          height: pxTorem(90);
          background: url("../../static/img/fileBoxImg1.png") no-repeat center/100% 100%;
          [data-dpr="2"] &{
            background: url("../../static/img/fileBoxImg1.png") no-repeat center/100% 100%;
          }
          [data-dpr="3"] &{
            background: url("../../static/img/fileBoxImg2.png") no-repeat center/100% 100%;
          }
          margin: pxTorem(45) pxTorem(90);
        }
      }
    }
  }
  .colorGrey {
    color: #999;
  }
  .fontSize24 {
    font-size: pxTorem(24);
  }
  .marginBottom {
    margin-bottom: pxTorem(250);
  }
  .heigthBottom {
    height: pxTorem(200) !important;
  }
  .fileExaminingBox {
    position: relative;
    .examineImg {
      position: absolute;
      top:pxTorem(80);
    }
  }

</style>
