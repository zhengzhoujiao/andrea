<template>
  <div class="Order">
    <statusBar></statusBar>
    <topNav>
      <div slot="left" @click="toup">
        <span style="line-height:45px;margin-left:10px;" class="iconfont icon-zuobian"></span>
      </div>
      <div slot="mid" style="text-align: center; line-height: 30px; font-size: 18px;">我的订单</div>
      <div
        slot="right"
      ></div>
    </topNav>
    <orderNav></orderNav>
    <orderBody></orderBody>
  </div>
</template>

<script>
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import orderBody from "@/components/orderSon/orderBody.vue";
import orderNav from "@/components/orderSon/orderNav.vue";
import "@/assets/iconfont/iconfont.css";
export default {
    data() {
        return {
            
        }
    },
    methods:{
      toup(){
        this.$router.push("/Car");
      }
    },
    components:{
        statusBar,
        topNav,
        orderBody,
        orderNav
    }
};
</script>

<style lang="less" scoped>
</style>