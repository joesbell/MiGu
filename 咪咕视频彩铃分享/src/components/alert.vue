<template>
  <div class="alert">
    <div class="alertBox">
      <p>{{title}}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert",
    props:['title'],
    data() {
      return {
        // isShow:true,
      }
    },
    methods: {
      // closeBtn:function () {
      //   this.isShow = false
      // }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem";
  .alert{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    .alertBox {
      width:pxTorem(560);
      height:pxTorem(330);
      line-height: pxTorem(230);
      background-color: #fff;
      border-radius: pxTorem(20);
      border: solid 1px #999;
      position: relative;
      p{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .closeBtn {
      width:100%;
      height:pxTorem(100);
      position: absolute;
      bottom: 0;
      border-top: solid 1px #999;
      line-height: pxTorem(100);
      text-align: center;
    }
  }
</style>
