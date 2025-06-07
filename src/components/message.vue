<template>
<!-- 消息弹窗 -->
  <div class="message">
      <slot name="search"></slot>
      <slot name="text"></slot>
      <slot name="yesBtn"></slot>
      <slot name="noBtn"></slot>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.message{
    display: flex;
    z-index: 999;
    position: relative;
    margin-top: 300px;
    width: 230px;
    height: 150px;
    margin-left: 50%;
    transform: translateX(-50%);
    background: aquamarine;
}
</style>