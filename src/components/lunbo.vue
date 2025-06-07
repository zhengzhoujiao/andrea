<template>
  <div class="lunbo" :style="lunboh">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imgssrc" :key="index"><img class="imgs" :src="item" alt=""></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:{
    imgssrc:Array,
    lunboh:String
  },
  created() {

  },
};
</script>

<style lang="less" scoped>
    .lunbo{
        margin-top: 50px;
        .imgs{
            display: block;
            margin: 0 auto;
            height: 100%;
            width: 94%;
            border-radius: 20px;
        }    
    }
</style>