<template>
  <div class="Details">
    <statusBar></statusBar>
    <topNav>
      <div slot="left" @click="back">
        <div
          class="iconfont icon-zuobian"
          style="font-size: 28px; line-height: 47px; text-align: center;"
        ></div>
      </div>
      <div slot="mid" style="text-align: center; line-height: 30px; font-size: 18px;">商品详情</div>
      <div slot="right"></div>
    </topNav>
    <lunbo :imgssrc="lunboimg" :lunboh="flunboh"></lunbo>
    <div class="zw"></div>
    <div v-for="(item,index) in this.$store.state.toShow" :key="index">
      <div class="content">
        <div class="name">
          <span>{{item.name}}</span>
          <div class="num">
            <span>￥{{item.price}}</span>
            <span>库存{{item.stock}}件</span>
          </div>
        </div>
        <div class="message1">
          <span>&nbsp;&nbsp;&nbsp;邮费 {{item.yunfei}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>销量 {{item.salenumber}}</span>
        </div>
        <div class="message2">
          &nbsp;&nbsp;&nbsp;
          <span>配送: 同城送、快递、自提</span>
          <img src="../assets/imgs/箭头.png" alt />
        </div>
        <div class="message3">
          <div class="tt">
            <div class="line"></div>
            <div class="ttf">商品详情</div>
            <div class="line"></div>
          </div>
          <div class="bd">
            蛋糕类型: {{item.categoryname}}
            <br />主要原料: {{item.categoryname}}
            <br />蛋糕口味: {{item.categoryname}}
            <br />赠送配件: {{item.categoryname}}
            <br />保鲜条件: {{item.categoryname}}
          </div>
          <img :src="item.imageurl" alt />
        </div>
      </div>
    </div>

    <div class="zw2"></div>
    <footer>
      <div class="left">
        <div class="dp">
          <img src="../assets/imgs/图层4.png" alt />
          <span>店铺</span>
        </div>
        <div class="kf">
          <img src="../assets/imgs/图层2.png" alt />
          <span>客服</span>
        </div>
        <div class="sc">
          <img src="../assets/imgs/图层3.png" alt />
          <span>收藏</span>
        </div>
      </div>
      <div class="right">
        <div class="car" @click="car(item)">加入购物车</div>
        <div class="buy" @click="buy(item)">立即购买</div>
      </div>
    </footer>
  </div>
</template>

<script>
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import lunbo from "@/components/lunbo.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      lunboimg: [
        require("../assets/imgs/2.png"),
        require("../assets/imgs/4.png"),
        require("../assets/imgs/5.png"),
      ],
      flunboh:'height:250px',
      //判断购物车列表是否重复
      flag:false
    };
  },
  methods:{
    car(){
      let data = {
            uid:window.sessionStorage.getItem('uid'),
            token:window.sessionStorage.getItem('token'),
            pid:this.$store.state.toShow[0].id,
            num:this.$store.state.toShow[0].num
          }
      this.$request({
      url: "shopcar/add",
      method: "post",data}).then((res)=>{
            console.log(res)
      })

      if(this.$store.state.mycar.length==0)
      {
        this.$store.commit("caraddnum");
        this.$store.commit('addcar')
        this.$message.success('加入购物车成功')
        console.log("carno")
      }
      else{
        console.log("carhave")
        this.$store.state.mycar.forEach((item,index)=>{
          if(this.$store.state.toShow[0].name==item.name){
            console.log("thishave")
            //num为什么不加
            item.num++
            console.log(item.num)
            this.$store.commit("caraddnum");
            this.$message.success('加入购物车成功')
            this.flag=true
          }
        })
        if(this.flag==false){
          console.log("thisnohave")
          this.$store.commit("caraddnum");
          this.$store.commit('addcar')
          this.$message.success('加入购物车成功')
        }
        this.flag=false
      }
      // this.$router.push("/Car");
    },
    buy(){
      // const tokenStr = window.sessionStorage.getItem("token");
      // if(!tokenStr){
      //   this.$message.error('请先登录！')
      // }
      // else{
        this.$store.commit('tobuy2')
        this.$router.push("/Pay");        
      // }
    },
    back(){
      this.$router.back()
      this.$destroy()
    }
  },
  components: {
    statusBar,
    topNav,
    lunbo,
  }
};
</script>

<style lang="less" scoped>
.Details {
  .zw {
    width: 100%;
    height: 10/2px;
  }
  .content {
    width: 100%;
    background: #f6f6ff;
  }
  .content .pic img {
    width: 100%;
    height: 473/2px;
    vertical-align: middle;
  }
  .message3 img {
    width: 100%;
    height: 473/2px;
    vertical-align: middle;
    margin-top: 30/40r2pxem;
  }
  .content .name {
    width: 100%;
    height: 140/2px;
    background: white;
  }
  .content .name > span {
    display: block;
    font-family: PingFang-SC-Bold;
    font-size: 36/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #030202;
    font-weight: 700;
    padding-top: 20/2px;
    margin-left: 10/2px;
  }
  .content .name .num {
    width: 100%;
    height: 50/2px;
    margin-top: 10/2px;
  }
  .content .name .num span:nth-child(1) {
    float: left;
    font-family: PingFang-SC-Bold;
    font-size: 36/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ff0101;
    margin-left: 10/2px;
    font-weight: 700;
  }
  .content .name .num span:nth-child(2) {
    float: right;
    font-family: PingFang-SC-Medium;
    font-size: 22/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #494848;
    margin-right: 20/2px;
  }
  .content .message1 {
    width: 100%;
    height: 76/2px;
    background: white;
    margin-top: 14/2px;
    font-family: PingFang-SC-Medium;
    font-size: 24/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #000000;
    font-weight: 700;
    line-height: 76/2px;
  }
  .content .message2 {
    width: 100%;
    height: 76/2px;
    background: white;
    margin-top: 14/2px;
    font-family: PingFang-SC-Medium;
    font-size: 22/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #010101;
    font-weight: 700;
    line-height: 76/2px;
  }
  .content .message2 img {
    width: 13/2px;
    height: 22/2px;
    transform: rotate(180deg);
    float: right;
    margin-top: 27/2px;
    margin-right: 20/2px;
  }
  .content .message3 {
    width: 750/2px;
    height: 696/2px;
  }
  .content .message3 .tt {
    width: 100%;
    height: 72/2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content .message3 .tt .line {
    display: inline-block;
    width: 77/2px;
    height: 1/2px;
    background-color: #000000;
    opacity: 0.49;
  }
  .content .message3 .tt .ttf {
    display: inline-block;
    font-family: PingFang-SC-Bold;
    font-size: 28/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #090909;
    margin-left: 10/2px;
    margin-right: 10/2px;
    font-weight: 700;
  }
  .content .message3 .bd {
    margin-left: 20/2px;
    font-family: PingFang-SC-Medium;
    font-size: 25/2px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50/2px;
    color: #090909;
  }
  .zw2 {
    width: 100%;
    height: 100/2px;
    position: relative;
    z-index: -1;
  }
  footer {
    width: 100%;
    height: 100/2px;
    position: fixed;
    display: flex;
    z-index: 9999;
    bottom: 0;
    background: white;
  }
  footer .left {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  footer .left div {
    height: 60/2px;
  }
  footer .left div img {
    width: 34/2px;
    height: 33/2px;
    display: block;
  }
  footer .left div span {
    display: block;
    font-family: PingFang-SC-Medium;
    font-size: 18/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #090909;
  }
  footer .right {
    flex: 1;
    display: flex;
    height: 100/2px;
  }
  footer .right .car {
    flex: 1;
    background: #fe6804;
    font-family: PingFang-SC-Medium;
    font-size: 30/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    line-height: 100/2px;
    text-align: center;
  }
  footer .right .buy {
    flex: 1;
    background: red;
    font-family: PingFang-SC-Medium;
    font-size: 30/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    line-height: 100/2px;
    text-align: center;
  }
}
</style>