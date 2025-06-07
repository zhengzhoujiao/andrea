<template>
  <div class="Adress">
    <statusBar></statusBar>
    <topNav>
      <div slot="left"  @click="back">
        <span style="line-height:45px;margin-left:10px;" class="iconfont icon-xiangzuo"></span>
      </div>
      <div slot="mid" style="text-align: center; line-height: 30px; font-size: 18px;">收货地址</div>
      <div
        @click="add"
        slot="right"
        class="iconfont icon-icon-"
        style="color: black; font-size: 24px; line-height: 42px; text-align: center;"
      ></div>
    </topNav>
    <div class="content">
      <div class="adressCard" v-for="(item,value) in adress" :key="value">
        <span>{{item.customer}} {{item.customerphone}}</span>
        <span>{{item.addressdetail}}</span>
        <span class="line"></span>
        <span>
          <div class="iconfont icon-gouxuan" :style="{color:item.isdefault? 'red':'blue'}"></div>
          <div>设为默认</div>
          <div class="iconfont icon-bianji"></div>
          <div>编辑</div>
          <div class="iconfont icon-shanchu"></div>
          <div>删除</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      adress:"",
      color1:"color:blue",
      color2:"color:red"
    };
  },
  created(){
    let data = {
      uid:window.sessionStorage.getItem('uid'),
      token:window.sessionStorage.getItem('token')
    }
    this.$request({url:"address/querybyuser",method: "post",data}).then(res=>{
      this.adress=res.data.table
    })
  },
  methods: {
    back(){
      this.$router.back()
    },
    add(){
      this.$router.push("/AddAdress")
    }
  },
  components: {
    statusBar,
    topNav,
  },
};
</script>

<style lang="less" scoped>
.Adress {
  .content {
    margin-top: 45px;
    height: 600px;
    background: whitesmoke;
    width: 100%;
    overflow: hidden;
  }
  .adressCard {
    width: 92%;
    height: 130px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    span:nth-child(1) {
      display: inline-block;
      font-size: 18px;
      margin-top: 15px;
      margin-left: 15px;
    }
    span:nth-child(2) {
      display: inline-block;
      font-size: 15px;
      margin-top: 15px;
      color: gray;
      margin-left: 15px;
    }
    span:nth-child(3) {
      display: inline-block;
      margin-top: 15px;
      width: 92%;
      height: 1px;
      background: whitesmoke;
    }
    span:nth-child(4) {
      display: inline-block;
      height: 30px;
      width: 100%;
      div:nth-child(1) {
        display: inline-block;
        color: red;
        opacity: 0.6;
        font-size: 25px;
        line-height: 30px;
        margin-left: 15px;
      }
      div:nth-child(2) {
        display: inline-block;
        color: gray;
        font-size: 16px;
        margin-left: 15px;
      }
      div:nth-child(3) {
        display: inline-block;
        width: 30px;
        margin-left: 85px;
      }
      div:nth-child(4) {
        display: inline-block;
      }
      div:nth-child(5) {
        display: inline-block;
        opacity: 0.6;
        margin-left: 15px;
        font-size: 14px;
      }
      div:nth-child(6) {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
}
</style>