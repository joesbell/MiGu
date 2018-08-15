<template>
  <div class="editVideos" ref="editVideos">
    <div class="ev_titleBox">
      <div class="ev_title" ref="ev_title">
        <div @click="goback" class="ev_goback">

        </div>
        <div>
          已选<span>{{checkedIDs.length}}</span>首
        </div>
        <div @click="make_all" class="ev_upload">
          <span v-if="selectAll">全选</span>
         <span v-else>全不选</span>
        </div>
      </div>
      <div class="ev_warn" ref="ev_warn">
        正在审核的彩铃暂时不能删除，已为您过滤
      </div>
    </div>
    <div class="ev_uploadedBox" ref="ev_uploadedBox">
      <div class="ev_uploadedVideo" v-for="(item,index) in VideoBox" :key="index">
        <div class="checkboxFour">
          <input type="checkbox"  v-model="checkedIDs"  :value="item.id" :id="item.id" name="" />
          <label :for="item.id"></label>
        </div>
        <div class="uploadedVideo">
          <img :src="item.imageurl" onerror="onerror=null;src='123.jpg'" ></img>
        </div>
        <div class="uploadedVideoMsg">
          <p class="uvm_title">{{item.diyname}}</p>
          <p class="uvm_username">{{nickName}}</p>
        </div>
      </div>

    </div>
    <div class="deleteVideoBox" ref="deleteVideoBox">
        <div class="deleteVideo" :class="{ canDel: checkedIDs.length>0}"  @click="del">
          <div class="delIcon" :class="{ delIconOK: checkedIDs.length>0}"></div>
          <div class="delBtn" >删除</div>
        </div>
    </div>
    <tips  v-show="showTips" :msg="loginTips"></tips>

  </div>

</template>

<script>
  import tips from "@/components/tips";
  export default {
    name: "editVideos",
    data(){
      return{
        showTips:false,
        loginTips:"",
        nickName:"",
        VideoBox:"",
        can:"false",
        selectAll:true,
        answers: [
          { "id": 1, "name": "A" },
          { "id": 2, "name": "B" },
          { "id": 3, "name": "C" },
          { "id": 4, "name": "D" }
        ],
        checkedIDs: []
      }
    },
    components:{
      tips
    },
    computed: {
      // selectAll: {
      //   get: function () {
      //     return this.answers ? this.selected.length == this.answers.length : false;
      //   },
      //   set: function (value) {
      //     var selected = [];
      //
      //     if (value) {
      //       this.answers.forEach(function (user) {
      //         selected.push(user.id);
      //       });
      //     }
      //
      //     this.selected = selected;
      //   }
      // }
    },
    methods:{
      goback:function () {
        this.$router.push({
          name:"videoDIY"
        })
      },
      setChecked: function(index) {
        // this.checkedAll = false;//////感觉这一句没有起作用
        this.checkedIDs.pop(this.answers[index].id);

      },
      make_all:function () {
        let _this=this;
        if (this.selectAll) {//实现全选
          this.selectAll=false;
          this.checkedIDs = [];
          this.VideoBox.forEach(function(item) {
            _this.checkedIDs.push(item.id);
          });

        }else{//实现反选
          this.checkedIDs = [];
          this.selectAll=true;
        }


      },
      del:function () {
        let _this=this;
        if(this.checkedIDs.length>0){
          this.$http.get("/ringtoneManager/batchDelRingtone.action",{
            ringtoneIds:this.checkedIDs.join("|")
          })
            .then(function (re) {
              if(re.state=="000000"){
                _this.showTips=true;
                _this.loginTips="删除成功!"
                setTimeout(function () {
                  _this.showTips=false;
                  _this.loginTips="";
                  _this.getVideo()
                  _this.checkedIDs = [];
                  _this.selectAll=true;
                },1000)

              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }else {

        }
      },
      getVideo(){
        let _this=this;
        this.$http.get("ringtoneManager/findDIYRingtoneList.action")
          .then(function (re) {
            if(re.state=="000000"){
              _this.VideoBox=re.diyRingtoneList
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
        _this.$refs.ev_uploadedBox.style.height=`${document.documentElement.clientHeight}`-_this.$refs.deleteVideoBox.offsetHeight-_this.$refs.ev_title.offsetHeight-_this.$refs.ev_warn.offsetHeight+"px"
       _this.getVideo()
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem.scss";
  .editVideos{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .ev_titleBox{
    width: 100%;
    height: pxTorem(80);
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    font-size: pxTorem(36);
    font-weight: 500;
    text-align: center;
    line-height: pxTorem(80);
    .ev_title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: pxTorem(80);
      color: #1e1e1e;
      /*position: relative;*/
    }
    .ev_upload ,.ev_goback{
      display: inline-block;
      font-size: pxTorem(24);
      margin: 0 pxTorem(25);
    }
    .ev_upload{
      font-size: pxTorem(28);
      color: #1e1e1e;
    }
    .ev_goback{
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
    .ev_warn{
      width: 100%;
      height: pxTorem(120);
      line-height: pxTorem(120);
      text-align: center;
      font-size: pxTorem(26);
      color: #999999;
    }

  }
  .ev_uploadedBox{
    width: 100%;
    margin-top: pxTorem(200);
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .ev_uploadedVideo{
      width: 100%;
      display: flex;
      align-items: center;
      margin: pxTorem(10) 0;
    }
 /*   .ev_check{
      width: pxTorem(40);
      height: pxTorem(40);
      margin: 0 pxTorem(20);
      input{
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }*/
    .uploadedVideo{
      width: pxTorem(240);
      height:pxTorem(150) ;
      background: #000000;
      img{
        width: 100%;
        height: 100%;
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
  .deleteVideoBox{
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    z-index: 1000;
    background: #fff;
    height: pxTorem(120);
    border-top:1px solid #ddd;
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
      width: pxTorem(31);
      height: pxTorem(32);
      background: url("../../static/img/del.png");
      background-size: 100%;
      /*[data-dpr="2"] & {*/
        /*width: 31px;*/
        /*height: 32px;*/
        /*background: url("../../static/img/del.png");*/
      /*}*/
      /*[data-dpr="3"] & {*/
        /*width: 47px;*/
        /*height: 49px;*/
        /*background: url("../../static/img/del1.5.png");*/
      /*}*/
    }
    .delIconOK{
      width: pxTorem(31);
      height: pxTorem(32);
      background: url("../../static/img/delok.png");
      background-size: 100%;
      /*[data-dpr="2"] & {*/
        /*width: 31px;*/
        /*height: 32px;*/
        /*background: url("../../static/img/delok.png");*/
      /*}*/
      /*[data-dpr="3"] & {*/
        /*width: 47px;*/
        /*height: 49px;*/
        /*background: url("../../static/img/delok1.5.png");*/
      /*}*/
    }
    .delBtn{
      margin-top: pxTorem(20);
    }
  }
  input[type=checkbox] {
    visibility: hidden;
  }
  .checkboxFour {
    width: pxTorem(40);
    height: pxTorem(40);
    background: #ddd;
    margin: 0  pxTorem(25);
    border-radius: 100%;
    position: relative;
    /*-webkit-box-shadow: 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
    /*-moz-box-shadow: 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
    /*box-shadow: 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
  }
  .checkboxFour label {
    display: block;
    width: pxTorem(40);
    height: pxTorem(40);
    border-radius: pxTorem(100);
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -ms-transition: all .5s ease;
    transition: all .5s ease;
    cursor: pointer;
    position: absolute;
    top: pxTorem(0);
    left: pxTorem(0);
    z-index: 1;
    background: url("../../static/img/ch1.png") no-repeat center;
    background-size: 100%;
    /*background: #fff;*/
    /*-webkit-box-shadow:inset 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
    /*-moz-box-shadow:inset 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
    /*box-shadow:inset 0px pxTorem(1) pxTorem(1) rgba(0,0,0,0.5);*/
  }
  .checkboxFour input[type=checkbox]:checked + label {
    background: url("../../static/img/checked.png") no-repeat center;
    background-size: 100%;

  }


</style>
