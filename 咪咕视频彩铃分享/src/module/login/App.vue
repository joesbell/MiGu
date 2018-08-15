<template>
  <div id="app">
    <header class="title">
      <span class="titleIcon"></span>
      短信登录
    </header>
    <section class="inputSection">
      <div class="inputArea">
        <input type="tel" placeholder="手机号" id="tel" v-model="phoneNumber"/>
      </div>
      <div class="inputArea">
        <input type="text" class="examineCode" placeholder="验证码"  v-model="examineCode"/>
        <div class="getExamineCode" :class="{ activeExamineCode: phoneNumber.length>0 && codeFlag==true}" @click="getExamineCode">{{ExamineCodeMsg}}</div>
      </div>
    </section>
    <div @click="login" class="loginBtn" :class="{ activeLogin: phoneNumber.length>0 && examineCode.length>0}">登录</div>
    <!-- 修改昵称 -->
    <section class="uploadFileModel" v-show="uploadFileModel">
      <div class="uploadFileBox">
        <div class="fileBoxTop">
          <input class="topBoxText" type="text" v-model="nickName" placeholder="取个好听的昵称（15字内）" />
          <section class="radioSection">
            <div>
              <input id="item1" type="radio" name="item" value="1" v-model="sex">
              <label for="item1" class="labelDo"></label>
              <label for="item1">帅哥</label>
            </div>
            <div>
              <input id="item2" type="radio" name="item" value="2" v-model="sex">
              <label for="item2" class="labelDo"></label>
              <label for="item2">美女</label>
            </div>
          </section>
        </div>
        <div class="fileBoxBottom">
          <div class="bottomBoxL"  @click="overBtn">取消</div>
          <div  class="bottomBoxR" @click="confirmBtn">确定</div>
          <div style="clear: both"></div>
        </div>
      </div>
    </section>
    <loading v-show="isLoading"></loading>
    <alert v-show="isError" :title="errorMsg">
      <div class="closeBtn" @click="closeBtn">取消</div>
    </alert>
    <tips  v-show="showTips" :msg="loginTips"></tips>

  </div>

</template>

<script>
  import loading from "../../components/loading";
  import alert from "../../components/alert";
  import tips from "../../components/tips";
  import {mapState} from 'vuex';
  import axios from 'axios'
  let setTime;
  export default {
    name: 'App',
    data() {
      return {
        sex:"1",
        nickName:"",
        loginTips:"",
        showTips:false,
        phoneNumber: "",
        examineCode: "",
        codeFlag:true,
        ExamineCodeMsg:"获取验证码",
        codeTime:60,
        uploadFileModel:false
      }
    },
    components:{
      loading,
      alert,
      tips
    },
    computed:{
      ...mapState({
        isLoading:state=>state.isLoading,
        isError:state=>state.isError,
        errorMsg:state=>state.errorMsg,
      })
    },
    methods:{
      closeBtn:function(){
        this.$store.commit("updateErrorStatus", {isError: false});
        this.codeFlag=true;
        this.ExamineCodeMsg="获取验证码";
        clearInterval(setTime)
      },
      overBtn:function(){
        this.uploadFileModel = false;
      },
      confirmBtn:function () {
        if(this.nickName!=""){
          let _this=this;
          axios.defaults.headers = {
            "content-type": "application/x-www-form-urlencoded",
            "msisdn":localStorage.getItem("userName"),
            "token":localStorage.getItem("token"),
            // "Access-Token":sessionStorage.getItem("cloud_system_token")
          }; //配置请求头
          // this.uploadFileModel = true;
          this.$http.post('/userOper/setUserInfo.action',{
            nickname: this.nickName,
            gender:this.sex
          })
            .then(function (re) {
              if(re.state=="000000"){
                localStorage.setItem("nickName",_this.nickName)
                window.location.href="./index.html"
              }

            })
            .catch(function (error) {
              console.log(error);
            });
        }else {
          let _this=this;
          this.showTips=true;
          this.loginTips="请输入用户昵称";
          let timer=setTimeout(function () {
            _this.showTips=false;
          },1500)
        }

      },
      getExamineCode: function () {
        let _this=this;
        if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.phoneNumber))){
            this.showTips=true;
            this.loginTips="请输入正确的手机号码";
            let timer=setTimeout(function () {
              _this.showTips=false;
            },1500)
        }else {
          this.codeTime=60;
          let _this=this;
          if(this.phoneNumber.length>0&&this.codeFlag==true){
            this.$http.post('/login/getValidatecode.action', {
              msisdn: this.phoneNumber,
            })
              .then(function (response) {
                if(response.state === "200002"){
                  _this.showTips=true;
                  _this.loginTips="请输入移动手机号码";
                  let timer=setTimeout(function () {
                    _this.showTips=false;
                  },1500)
                }else {
                  _this.codeFlag=false;
                  _this.ExamineCodeMsg=_this.codeTime+"秒后重新获取";

                  setTime=setInterval(function () {
                    if(_this.codeTime>0){
                      _this.codeTime=_this.codeTime-1;
                      _this.ExamineCodeMsg=_this.codeTime+"秒后重新获取";
                    }else {
                      _this.codeFlag=true;
                      _this.ExamineCodeMsg="获取验证码";
                      clearInterval(setTime)
                    }
                  },1000)
                  // if(response.status === 200){
                  //   window.location.href="./index.html"
                  // }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }

      },
      login:function () {
        let _this=this;
        this.$http.post('/login/validateCode.action', {
          msisdn: this.phoneNumber,
          validateCode:this.examineCode
        })
          .then(function (re) {
            if(re.state=="000000"){
              localStorage.setItem("token",re.token)
              localStorage.setItem("userName",_this.phoneNumber)
              localStorage.setItem("nickName",re.nickname)
              window.location.href="./index.html"
            } else if(re.state=="010001"){
              _this.uploadFileModel=true;
              localStorage.setItem("token",re.token)
              localStorage.setItem("userName",_this.phoneNumber)
            }else {
              _this.showTips=true;
              _this.loginTips="请输入正确的验证码";
              let timer2=setTimeout(function () {
                _this.showTips=false;
              },1500)
            }

          })
          .catch(function (error) {
            console.log(error);
          });
       // window.location.href="./dredge.html"
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../static/fixRem";
  #app {
    font-family: 'Microsoft Yahei';
    text-align: center;
    color: #444;
    width: 100%;
    background: #fcfcfc;
    position: relative;
    height: 100%;
    font-size: pxTorem(30);
    .title{
      width: 100%;
      height: pxTorem(90);
      background: #ffffff;
      font-size: pxTorem(36);
      font-weight: 500;
      text-align: center;
      line-height: pxTorem(90);
      border-bottom: solid 1px #ccc;
    }
    .inputSection {
      text-align: left;
      padding-top: pxTorem(40);
      padding-bottom: pxTorem(40);
      padding-left: pxTorem(25);
      padding-right: pxTorem(25);
      position: relative;
      .inputArea {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height:pxTorem(90);
        border-bottom: solid 1px #cccccc;
        line-height: pxTorem(90);
        color: #999;
        font-size: pxTorem(30);
        &:hover {
          border-bottom: solid 3px #ea1e63;
        }
        label {
          width: pxTorem(50);
          height: 100%;
          margin-left: pxTorem(50);
          margin-right: pxTorem(50);
        }
        input {
          border: none;
          background-color: #fcfcfc;
          color: #999;
          text-indent: pxTorem(50);
          height: pxTorem(80);
          width:100%;
        }
      }
      .examineCode{
        width: pxTorem(350)!important;
        height: 100%;
      }
      .getExamineCode {
        /*position: absolute;*/
        padding: 0 pxTorem(50);
        /*width:pxTorem(200);*/
        text-align: center;
        border: solid 1px #999;
        border-radius: pxTorem(50);
        height: pxTorem(70);
        line-height: pxTorem(70);
        font-size:pxTorem(28);
        /*bottom:pxTorem(50);*/
        /*right: pxTorem(50);*/
      }
      .activeExamineCode{
        border: solid 1px  #ea1e63!important;
        color:  #ea1e63!important;
      }
    }
    .activeLogin{
      color: #fff!important;
    }
    .loginBtn {
      margin: 0 auto;
      width: pxTorem(700);
      height: pxTorem(88);
      line-height: pxTorem(88);
      background: #ea1e63;
      border-radius: pxTorem(50);
      font-size: pxTorem(36);
      /*color: #fff;*/
      color: #ff4282;
      &:hover {
        color: #ff4282;
      }
    }
    /* 修改昵称 */
    .uploadFileModel {
      position: absolute;
      top:0;
      width:100%;
      height:100%;
      background-color: rgba(0,0,0,.3);
      .uploadFileBox {
        margin: 0 auto;
        position: relative;
        top:50%;
        margin-top: pxTorem(-165);
        width:pxTorem(560);
        height:pxTorem(330);
        background: url("../../../static/img/fileModel1.png") no-repeat center/100% 100%;
        [data-dpr="2"] &{
          background: url("../../../static/img/fileModel1.png") no-repeat center/100% 100%;
        }
        [data-dpr="3"] &{
          background: url("../../../static/img/fileModel2.png") no-repeat center/100% 100%;
        }
        .fileBoxTop {
          width:100%;
          height: 70%;
          text-align: center;
          font-size:pxTorem(30);
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
            margin-top: pxTorem(50);
            border: solid 1px #999;
            width: 80%;
            background-color: #f8f8f8;
          }
          &:-moz-placeholder { color:#f00; }
          .radioSection {
            .checkedColor {
              color: #ea1e63;
            }
            margin-top: pxTorem(30);
            div {
              display: inline-block;
              position: relative;
              line-height: 30px;
              margin-right: pxTorem(20);
              input[type="radio"] {
                width: 20px;
                height: 20px;
                opacity: 0;
              }
              .labelDo {
                position: absolute;
                left: -5px;
                top: 3px;
                width: pxTorem(25);
                height: pxTorem(25);
                border-radius: 50%;
                border: 1px solid #999;
              }
              input:checked+.labelDo {
                background-color: #ea1e63;
                border: 1px solid #ea1e63;
              }
              input:checked+label::after {
                position: absolute;
                content: "";
                width: 5px;
                height: 10px;
                top: 3px;
                left: 8px;
                border: 2px solid #fff;
                border-top: none;
                border-left: none;
                transform: rotate(45deg)
              }
            }
          }
        }
        .fileBoxBottom {
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
    .examineMsg {
      margin-top: pxTorem(20);
      color: #ea1e63;
    }
  }

  .tips{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      padding: 20px 40px;
      border-radius: 40px;
      background: #1e1e1e;
      color: #ffffff;
    }
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .5s ease;
  }
  .fade-enter,.fade-leave-active {
    opacity: 0;
    /*transform:translateX(50px);*/
  }


</style>

