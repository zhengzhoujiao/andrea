<template>
  <div class="toplunbo">
    <div class="swiper-container" ref="broadcast">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in newlist" :key="index" class="swiper-slide">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/dist/css/swiper.css'
export default {
  data() {
    return {
      swp:''
    }
  },
  props:{
    newlist:Array
  },
  mounted() {
    this.swp = new Swiper(this.$refs.broadcast, {
      direction: "vertical",
      autoplay: true,
      loop: true,
      initialSlide : 0, 
      observe: true,
      observeParents:true,
    });
  }
};
</script>

<style lang="less" scoped>
.toplunbo{
  height: 20px;
  overflow: hidden;
  .swiper-slide{
    font-size: 11px;
  }
}
</style>