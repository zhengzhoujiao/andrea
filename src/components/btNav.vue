<template>
  <div class="navbar">
    <slot>
      <slot name="img"></slot>
      <slot name="text"></slot>      
    </slot>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
  .navbar{
    background: white;
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
  }
</style>