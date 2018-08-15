<template>
  <div class="videoUpload">

    <div class="vu_titleBox">
      <div class="vu_title">
        <span @click="goback" class="vu_goback"></span>
        选择视频
        <span  class="vu_upload">

        </span>
        <!--<span @click="make_up" class="vu_upload">-->
          <!--上传-->
        <!--</span>-->
      </div>
    </div>
    <div class="uploadedWrap">
      <div class="uploadWarning">
        <p>每月可上传10个</p>
        <p>视频上传时间控制在7s-45s之间</p>
      </div>
        <div class="uploadBox">
          <div class="uploadVideoBox">
            <div class="uploadVideoList"  v-for='(file,index) in files' :key="index">
              <video   class="video"     ref="video" playsinline="playsinline" webkit-playsinline="true" x5-playsinline="true" x5-video-player-fullscreen="false"  preload="auto" controls>
                <source :src="file.src">
              </video>
              <!--<p class="videoTime">{{minute}}:{{scored}}</p>-->
              <a @click="uploadItem(file.nFile)" href="javascript:;" v-show="isUpload" class="uploadBtn">上传</a>
            </div>
          </div>
          <p class="uploadError"  v-show="uploadError">{{uploadErrorTxt}}</p>
        </div>
    </div>
    <div class="uploadingVideoBox">
      <a href="javascript:;" class="file">选择文件
        <vue-file-upload class="in"  url='http://diycsp.natapp1.cc/diycsp/ringtoneManager/upload.action' ref="vueFileUploader" name="ringtoneFile" v-bind:filters = "filters"  v-bind:events = 'cbEvents' v-bind:request-options = "reqopts" v-on:onAdd = "onAddItem">
          <!--<span slot="label"> 选择文件</span>-->
        </vue-file-upload>
      </a>

      <!--<div class="uploadingVideo"   @click="del">-->
        <!--<div class="uploadingIcon"></div>-->
        <!--<div class="uploadingBtn" >上传</div>-->
      <!--</div>-->
    </div>
    <section class="uploadFileModel" v-show="uploadFileModel">
      <div class="uploadFileBox">
        <div class="fileBoxTop">
          <p class="topBoxTitle">给你的视频取个名字吧</p>
          <input class="topBoxText" v-model="videoName" type="text" placeholder="不超过12个字" />
        </div>
        <div class="fileBoxBottom">
          <div class="bottomBoxL"  @click="overBtn">取消</div>
          <div  class="bottomBoxR" @click="confirmBtn">确定</div>
          <div style="clear: both"></div>
        </div>
      </div>
    </section>
    <section class="uploadFilingModel" v-show="uploadFilingModel">
      <div class="uploadFilingBox">
        <div class="filingBoxTop">
          <p class="topBoxTitle">视频彩铃上传中</p>
          <div class="progressBar">
            <div class="progressPre" v-bind:style="{ width: pre + '%' }">

            </div>
          </div>
          <span class="barNumber">{{pre}}%</span>
        </div>
        <div class="filingBoxBottom">
          <div class="cancelBtn" @click="cancelBtn">取消</div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <div class="tips"  :class="{ showTips: show === 'true'}">
        <p>{{warnTips}}</p>
      </div>
    </transition>
  </div>

</template>

<script>
  import VueFileUpload from 'vue-file-upload';
  let size;
  export default{
    data(){
      return{
        uploadError:false,
        uploadErrorTxt:"",
        isUpload:false,
        minute:"",
        scored:"",
        type:"",
        show:"false",
        uploadFileModel:false,
        uploadFilingModel:false,
        upFile:"",
        warnTips:"",
        videoName:"",
        pre:0,
        files:[],
        nFiles:[],
        //文件过滤器，只能上传 支持'3gp','rmvb','flv','wmv','avi','mkv','mp4','mp3','wav'格式
        filters:[
          {
            name:"videoFilter",
            fn(file){
              let _this=this;
              let type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              // console.log(type)
              // 获取视频时长

              size=file.size;

              // if('|3gp|rmvb|avi|rm|mp4|'.indexOf(type) !== -1){
                return file
              // }else {
              //   return false
              //   _this.showTips="true";
              //   _this.warnTips="请选择视频上传";
              //   setTimeout(function () {
              //     _this.showTips="false";
              //     _this.warnTips=""
              //   },1500)
              // }
            }
          }
        ],
        //回调函数绑定
        cbEvents:{
          onProgressUpload:(file,progress)=>{
              // console.log(file,progress)
              this.pre=progress;

          },
          // onCompleteUpload:(file,response,status,header)=>{
          //   console.log(file);
          //   console.log("finish upload;")
          // },
          onErrorUpload:(file,response,status,headers)=>{
            let _this=this;
            this.uploadFilingModel=false;
            this.show="true";
            this.warnTips="上传失败";
            setTimeout(function () {
              _this.show="false";
              _this.warnTips=""
            },1500)
            console.log("finish err");
          },//上传失败回调
          onSuccessUpload:(file,response,status,headers)=>{
            console.log(response)
            if(response.state=="000000"){
              let _this=this;
              console.log("finish good");
              this.uploadFilingModel=false;
              this.show="true";
              this.warnTips="上传成功";
              setTimeout(function () {
                _this.show="false";
                _this.warnTips=""
                _this.$router.push({
                  name:"videoDIY"
                })
              },1500)
            }else if(response.state=="000001"){
              let _this=this;
              this.uploadFilingModel=false;
              this.show="true";
              this.warnTips=response.message;
              setTimeout(function () {
                _this.show="false";
                _this.warnTips=""
              },1500)
            }


          },//上传成功回调
        },
        //xhr请求附带参数
        reqopts:{
          headers:{
            token:localStorage.getItem("token"),
            msisdn:localStorage.getItem("userName")
          },
          formData:{
            diyName:"",
          },
          // responseType:'json',
          withCredentials:false
        }
      }
    },
    watch:{
      files(curVal,oldVal){
          this.minute="";
          this.scored="";
          this.$nextTick(function () {
            let _this=this;
            if(_this.$refs.video!=undefined){
                let time=Math.ceil(size/3000000)*1000-500
                setTimeout(function () {
                  _this.minute=Math.floor(_this.$refs.video[0].duration/60);
                    let scored=Math.floor(_this.$refs.video[0].duration%60);
                  _this.scored=scored>10||scored==10?scored:"0"+scored
                  if(_this.scored>45||_this.scored<7){
                    _this.uploadError=true;
                    _this.uploadErrorTxt="视频时间长度不合格,请重新选择";
                    _this.isUpload=false;
                  }else {
                    _this.isUpload=true;
                    _this.uploadError=false;
                    _this.uploadErrorTxt="";
                  }
                },time)
            }
           })
      },
    },
    methods:{
      cancelBtn: function () {
        this.uploadFilingModel = false;
        this.uploadFileModel = false;
        this.upFile.cancel();//取消上传
      },
      confirmBtn: function () {
        this.reqopts.formData.diyName=this.videoName;
        this.uploadFilingModel = true;
        this.uploadFileModel = false;
        //单个文件上传
        this.upFile.upload();
        // this.$refs.vueFileUploader.clearAll();
      },
      overBtn:function(){
        this.uploadFileModel = false;

      },
      // textShow:function(e){
      //   e.stopPropagation();
      //   e.preventDefault();
      // },
      goback:function(){
        this.$router.push({
          name:"videoDIY"
        })
      },
      make_up:function(){
        //上传所有文件
        this.$refs.vueFileUploader.uploadAll();
      },
      onStatus(file){
        if(file.isSuccess){
          return "上传成功";
        }else if(file.isError){
          return "上传失败";
        }else if(file.isUploading){
          return "正在上传";
        }else{
          return "待上传";
        }
      },
      onAddItem(files){
        console.log(files)
        let _this=this;
        _this.nFiles=[];
        let type = '|' + files[files.length-1].file.type.slice(files[files.length-1].file.type.lastIndexOf('/') + 1) + '|';
        this.type=type;
        if('|3gp|rmvb|avi|rm|mp4|quicktime|'.indexOf(type) !== -1){
          let reader = new FileReader();
          reader.readAsDataURL(files[files.length-1].file);
          reader.onload =function(e){
            _this.nFiles.push({
              nFile:files[files.length-1],
              src:e.target.result
            })
          };
          this.files = this.nFiles;

          // this.time="0"+":"+scored>10?scored:"0"+scored;
        }else {
          this.show="true";
          this.warnTips="请选择视频上传";
          setTimeout(function () {
            _this.show="false";
            _this.warnTips=""
          },2000)
        }

        // let _this=this;
        // _this.nFiles=[];
        // var leng=files.length;
        // for(let i=0;i<leng;i++){
        //   _this.nFiles=[];
        //   let reader = new FileReader();
        //   reader.readAsDataURL(files[i].file);
        //   reader.onload =function(e){
        //     // for(var i=0;i<leng;i++){
        //
        //     _this.nFiles.push({
        //       nFile:files[i],
        //       src:e.target.result
        //     })
        //   }
        //   // };
        // }


      },
      uploadItem(file){
        this.upFile=file;
        // 获取视频时长
        // this.minute=Math.floor(this.$refs.video[0].duration/60);
        // let scored=Math.ceil(this.$refs.video[0].duration%60);
        // this.scored=scored>10?scored:"0"+scored
        // // this.time="0"+":"+scored>10?scored:"0"+scored;
        // console.log(this.minute+":"+this.scored)

     if(this.$refs.video[0].duration>45||this.$refs.video[0].duration<7){
       let _this=this;
       this.show="true";
       this.warnTips="视频时间长度不合格";
       setTimeout(function () {
         _this.show="false";
         _this.warnTips=""
       },2000)
     }else {
       this.videoName="";
       this.uploadFileModel = true;
     }

        //单个文件上传
        //  file.upload();
        // this.$refs.vueFileUploader.clearAll();

      },
      uploadAll(){
        //上传所有文件
        this.$refs.vueFileUploader.uploadAll();
      },
      clearAll(){
        //清空所有文件
        this.$refs.vueFileUploader.clearAll();
      }
    },
    mounted:function(){
      this.$nextTick(function () {

      })
    },
    components:{
      VueFileUpload
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .videoUpload{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    .vu_titleBox{
      width: 100%;
      height: pxTorem(88);
      background: #ffffff;
      position: fixed;
      left: 0;
      top: 0;
      font-size: pxTorem(36);
      font-weight: 500;
      text-align: center;
      line-height: pxTorem(88);
      border: 1px solid #dddddd;
    }
    .vu_title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: pxTorem(88);
      /*position: relative;*/
    }
    .vu_upload ,.vu_goback{
      display: inline-block;
      font-size: pxTorem(28);
      font-weight: 600;
      margin: 0 pxTorem(25);
    }
    .vu_goback{
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
  }
  .uploadedWrap{
    width: 100%;
    margin-top: pxTorem(80);
  }
  .uploadWarning{
    width: 100%;
    height: pxTorem(100);
    background-color: #FEECEC;
    padding: pxTorem(10) 0;
    text-align: center;
    color: #f13333;
    p{
      width: 100%;
      height: pxTorem(50);
      line-height: pxTorem(50);
    }
  }
  .uploadVideoBox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-top: pxTorem(50);
    /*justify-content: center;*/
    /*justify-content: space-between;*/
  }
  .uploadVideoList{
    /*width: pxTorem(220);*/
    /*height: pxTorem(220);*/
    /*margin: 0 pxTorem(10);*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .videoTime{
    position: absolute;
    padding: 0 pxTorem(10);
    color: white;
    top: pxTorem(700);
    /*left: pxTorem(150);*/
  }
  .video{
    width: pxTorem(500);
    height: pxTorem(500);
    border:1px solid #dddddd;
    background: #000000;
  }
  .uploadBtn{
    width: pxTorem(100);
    height: pxTorem(60);
    line-height: pxTorem(60);
    text-align: center;
    font-size:pxTorem(28);
    color: #000;
    display: inline-block;
    text-decoration: none;
    outline: none;
    position: absolute;
    right:pxTorem(15);
    top:pxTorem(15);
  }
  .uploadingVideoBox{
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    height: pxTorem(120);
    display: flex;
    justify-content: center;
    align-items: center;
    .deleteVideo{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #dddddd;
    }
    .canDel{
      color: #1e1e1e;
    }
    .delIcon{
      width: 31px;
      height: 32px;
      background: url("../../static/img/del.png");
      [data-dpr="2"] & {
        width: 31px;
        height: 32px;
        background: url("../../static/img/del.png");
      }
      [data-dpr="3"] & {
        width: 47px;
        height: 49px;
        background: url("../../static/img/del1.5.png");
      }
    }
    .delBtn{
      margin-top: pxTorem(20);
    }
  }
  /*4444444444444444444444444444*/
  .uploadFileModel,
  .uploadFilingModel{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,.3);
    .uploadFileBox,
    .uploadFilingBox {
      margin: 0 auto;
      position: relative;
      top:50%;
      margin-top: pxTorem(-165);
      width:pxTorem(560);
      height:pxTorem(330);
      background: url("../../static/img/fileModel1.png") no-repeat center/100% 100%;
      [data-dpr="2"] &{
        background: url("../../static/img/fileModel1.png") no-repeat center/100% 100%;
      }
      [data-dpr="3"] &{
        background: url("../../static/img/fileModel2.png") no-repeat center/100% 100%;
      }
      .fileBoxTop ,
      .filingBoxTop {
        width:100%;
        height: 70%;
        text-align: center;
        font-size:pxTorem(30);
        .topBoxTitle {
          padding: pxTorem(40) 0;
        }
        .progressBar {
          display: inline-block;
          width: 80%;
          margin-top: pxTorem(20);
          margin-left: pxTorem(10);
          height:pxTorem(30);
          border-radius: pxTorem(20);
          background-color: #f3f3f3;
        }
        .progressPre{
          width: 0;
          height: 100%;
          background:#ea1e63;
          border-radius: pxTorem(20);
        }
        .barNumber {
          display: inline-block;
          color: #ea1e63;
          font-weight:bold;
        }
        .topBoxText {
          padding: pxTorem(20);
          border: solid 1px #999;
          width: 80%;
          background-color: #f8f8f8;
        }
        &:-moz-placeholder { color:#f00; }
      }
      .fileBoxBottom,
      .filingBoxBottom {
        width:100%;
        height:pxTorem(100);
        line-height: pxTorem(100);
        text-align: center;
        color: #999;
        font-size:pxTorem(30);
        border-top: solid 1px #999;
        .bottomBoxL,
        .bottomBoxR{
          width:50%;
          height:100%;
          float: left;
          text-align: center;
        }
        .bottomBoxR {
          width:49.5%;
          border-left: solid 1px #999;
        }
        &:hover {
          color: #0776ff;
        }
      }
    }
  }

  .file {
    position: relative;
    display: inline-block;
    /*background: #D0EEFF;*/
    border: 1px solid #999;
    border-radius: pxTorem(30);
    padding: pxTorem(10) pxTorem(40);
    overflow: hidden;
    color: #5e5e5e;
    text-decoration: none;
    text-indent: 0;
    line-height: pxTorem(40);
    top:pxTorem(-40);
  }
  .file .in {
    position: absolute;
    font-size: pxTorem(100);
    right: 0;
    top: - pxTorem(40);
    opacity: 0;
  }
  .showTips{
    height: 100%!important;
    opacity: 1!important;
    p{
      display: block!important;
    }
  }
  .tips{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height:0;
    opacity: 0;
    transition: opacity 0.3s;
    background: rgba(255,255,255,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      padding: 20px 40px;
      border-radius: 40px;
      background: #1e1e1e;
      color: #ffffff;
      display: none;
    }

  }
  .uploadError{
    text-align: center;
    color: #f13333;
  }
  /*.file:hover {*/
    /*!*background: #AADFFD;*!*/
    /*border-color: #999;*/
    /*color: #ff4282;*/
    /*text-decoration: none;*/
  /*}*/



</style>
