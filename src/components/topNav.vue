<template>
  <div class="topNav">
    <div class="search-wrap">
         <div class="search-l">
             <slot name="left"></slot>
         </div>
         <div class="search-m">
             <slot name="mid"></slot>
         </div>
         <div class="search-r">
             <slot name="right"></slot>
         </div>
    </div>`
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.topNav{
    background: white;
}
.search-wrap {
  background: white;
  margin-top: 15px;
  z-index: 2;
  position: fixed;
  min-width: 340px;
  max-width: 640px;
  width: 100%;
  height: 44px;
  overflow: hidden;
}
.search-l {
  position: absolute;
  left: 10px;
  top: 0;
  height: 44px;
  width: 50px;
}
.search-m {
  position: relative;
  margin: 0 65px;
  height: 30px;
  margin-top: 7px;
  background-color: #fff;
  border-radius: 15px;
}
.search-r {
  position: absolute;
  right: 10px;
  top: 0;
  height: 44px;
  width: 40px;
  line-height: 44px;
  color: white;
}
</style>