<template>
  <div class="Button">
      <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.Button {
  margin-left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  border-radius: 25px;
  background: red;
  opacity: 0.35;
  border: none;
  color: white;
  font-size: 15px;
  margin-top: 20px;
  line-height: 50px;
  text-align: center;
}
</style>