<template>
  <div class="tips">
    <p>{{msg}}</p>
  </div>
</template>

<script>
    export default {
        name: "tips",
      props:['msg']
    }
</script>

<style scoped lang="scss">
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
</style>
