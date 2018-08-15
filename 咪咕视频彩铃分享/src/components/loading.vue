<template>
  <div class="loading">
    <div class="loadingGif"></div>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped lang="scss">
  @import "../../static/fixRem";
  .loading{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    .loadingGif {
      width: pxTorem(100);
      height:pxTorem(100);
      position: absolute;
      top:40%;
      background: url("../../static/img/loading.gif") no-repeat center/100% 100%;
    }
  }
</style>
