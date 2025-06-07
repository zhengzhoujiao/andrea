<template>
  <div class="statusBar">
      <img class="statusBarImg" src="../assets/statusBar.png" alt="">
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.statusBar{
  height: 16px;
  width: 365px;
  background: white;
  position: fixed;
  z-index: 999;
  .statusBarImg{
      position: fixed;
      display: block;
      top: 2px;
      left: 10px;
      width: 360px;
      z-index: 998;
  }
}
</style>