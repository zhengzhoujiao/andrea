<template>
  <div class="index">
    <statusBar></statusBar>
    <topNav>
      <div slot="left">
        <div
          class="iconfont icon-weizhi"
          style="font-size: 14px; line-height: 45px; text-align: center;"
        >洛阳</div>
      </div>
      <div v-if="isshow" slot="mid">
        <div style="text-align: center; line-height: 30px; font-size: 18px;">安德莉亚</div>
      </div>
      <div v-if="isshow==false" slot="mid">
        <input
          v-model="showname"
          slot="mid"
          placeholder="请输入你想吃的"
          style="padding-left:20px; width:230px; height:35px; background: whitesmoke;border-radius: 15px; border:none;"
        />
      </div>
      <div
        slot="right"
        class="iconfont icon-sousuo"
        style="color: black; font-size: 24px; line-height: 42px; text-align: center;"
        @click="search"
      ></div>
    </topNav>
    <div class="bg">
      <lunbo :imgssrc="lunboimg" :lunboh="flunboh"></lunbo>
      <div class="tip">
        <div></div>
        <toplunbo :newlist="fnewlist"></toplunbo>
      </div>
      <div class="menu">
        <div>
          <img src="../assets/imgs/12.png" />
          <span>最新甜品</span>
        </div>
        <div>
          <img src="../assets/imgs/11.png" />
          <span>积分兑换</span>
        </div>
        <div>
          <img src="../assets/imgs/10.png" />
          <span>在线预订</span>
        </div>
        <div>
          <img src="../assets/imgs/9.png" />
          <span>公司介绍</span>
        </div>
      </div>
      <div class="bm">
        <div class="bhd">
          <div>
            <img src="../assets/imgs/3.png" />&nbsp;
            <span>必买专区</span>
          </div>
          <div>更多&nbsp;</div>
        </div>
        <div class="bc">
          <div class="bl">
            <div></div>
            <div>
              <span>人气推荐</span>
              <span>小蛋糕</span>
            </div>
          </div>
          <div class="br">
            <div></div>
            <div>
              <span>今日推荐</span>
              <span>小蛋糕</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tj">
        <div class="thd">
          <div>
            <img src="../assets/imgs/6.png" />&nbsp;
            <span>推荐产品</span>
          </div>
          <div>更多&nbsp;</div>
        </div>
        <div style="height:580px;overflow:hidden;margin-bottom:50px;">
          <div style="height:100%" ref="wrapper">
            <orderList @tofindshow="findshow($event)" :data="data"></orderList>
          </div>
        </div>
      </div>
    </div>
    <btNav>
      <router-link to="/Index">
        <div class="mytext">
          <div slot="img" style="font-size:20px" class="iconfont icon-icon_home"></div>
          <div slot="text" class="btNavtext">主页</div>
        </div>
      </router-link>
      <router-link to="/Menu">
        <div class="mytext">
          <div slot="img" style="font-size:20px" class="iconfont icon-caidan"></div>
          <div slot="text" class="btNavtext">分类</div>
        </div>
      </router-link>
      <router-link to="/car">
        <div class="mytext">
          <div slot="img" style="font-size:20px" class="iconfont icon-gouwuche"></div>
          <div slot="text" class="btNavtext">购物车</div>
        </div>
      </router-link>
      <router-link to="/Pay">
        <div class="mytext">
          <div v-if="isshows" slot="img" style="font-size:20px" class="iconfont icon-gerenzhongxin"></div>
          <div v-if="!isshows" slot="img" style="border-radius: 11px;overflow: hidden;width:22px;height:22px;margin-left:15px;"><img style="width:22px;height:22px" :src="ownimgsrc" alt=""></div>
          <div slot="text" class="btNavtext">个人中心</div>
        </div>
      </router-link>
    </btNav>
    <router-view></router-view>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import btNav from "@/components/btNav.vue";
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import lunbo from "@/components/lunbo.vue";
import toplunbo from "@/components/toplunbo.vue";
import orderList from "@/components/orderList.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      data: [
        {
          title: "巧克力千层蛋糕",
          price: "￥25.00",
          imgsrc: require("../assets/imgs/5.png"),
        },
        {
          title: "松软牛角面包(纯手工)",
          price: "￥7.00",
          imgsrc: require("../assets/imgs/4.png"),
        },
        {
          title: "蜜红豆面包",
          price: "￥10.00",
          imgsrc: require("../assets/imgs/2.png"),
        },
        {
          title: "草莓果酱蛋糕",
          price: "￥35.00",
          imgsrc: require("../assets/imgs/1.png"),
        },
        {
          title: "巧克力千层蛋糕",
          price: "￥25.00",
          imgsrc: require("../assets/imgs/5.png"),
        },
        {
          title: "松软牛角面包(纯手工)",
          price: "￥7.00",
          imgsrc: require("../assets/imgs/4.png"),
        },
        {
          title: "蜜红豆面包",
          price: "￥10.00",
          imgsrc: require("../assets/imgs/2.png"),
        },
        {
          title: "草莓果酱蛋糕",
          price: "￥35.00",
          imgsrc: require("../assets/imgs/1.png"),
        },
      ],
      scroller: null,
      lunboimg: [],
      pgindex: 2,
      flunboh: "height:200px",
      isshow: true,
      showname: "",
      fnewlist: [],
      isshows:true,
      ownimgsrc:''
    };
  },
  methods: {
    findshow(who) {
      //通过who获取查找商品
      // let toshow = .....
      // this.$store.commit('checkIs',toshow)
      this.$request({
        url: "product/query",
        method: "post",
        params: { isrecommend: 1, name: who },
      }).then((res) => {
        let toshow = res.data;
        this.$store.commit("checkIs", toshow[0]);
        this.$router.push("/Details");
        console.log(res.data)
        console.log( this.$store.state.toShow)
      });
    },
    find(who) {
      //通过who获取查找商品
      // let toshow = .....
      // this.$store.commit('checkIs',toshow)
      this.$router.push("/Details");
    },
    upSort(id) {
      return function (a, b) {
        return a[id] - b[id];
      };
    },
    search() {
      this.isshow = !this.isshow;
    },
  },
  watch: {
    showname(newVal) {
      var that = this;
      this.$request({
        url: "product/query",
        method: "post",
        params: { isrecommend: 1, name: newVal },
      }).then((res) => {
        that.data = res.data;
      });
    },
  },
  components: {
    btNav,
    statusBar,
    topNav,
    lunbo,
    toplunbo,
    orderList,
  },
  created() {
    this
      .$request({
        url: "/shopcar/query",
        method: "post",
        params: {uid:window.sessionStorage.getItem('uid'),token:window.sessionStorage.getItem('token')},
      })
      .then((res) => {
        console.log(res)
        this.$store.commit("Allincar",res.data.table);
      });    
    if(window.sessionStorage.getItem('token'))
    {
      this.isshows=false
    }
    this.ownimgsrc=this.$store.getters.getmying
    //渲染图片轮播
    this.$request({
      url: "banner/query",
      method: "post",
      params: { pagesize: 3 },
    }).then((res) => {
      let newArray;
      newArray = res.data.table.sort(this.upSort("id"));
      newArray.filter((item) => {
        this.lunboimg.push(item.url);
      });
    });
    //渲染新闻轮播
    this.$request({
      url: "news/query",
      method: "post",
      params: { pagesize: 3, pageindex: 1 },
    }).then((res) => {
      this.fnewlist = res.data.table;
    });
    //初次渲染推荐产品
    this.$request({
      url: "product/query",
      method: "post",
      params: { pagesize: 6, pageindex: 1, isrecommend: 1 },
    }).then((res) => {
      this.data = res.data;
    });
  },
  mounted() {
    let that = this;
    function throttle(fn, wait) {
      var timer = null;
      return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
          timer = setTimeout(function () {
            fn.apply(context, args);
            timer = null;
          }, wait);
        }
        this.finishPullUp();
      };
    }
    this.scroller = new BScroll(this.$refs.wrapper, {
      tap: true,
      click: true,
      pullUpLoad: true,
    });
    function handle() {
      that
        .$request({
          url: "product/query",
          method: "post",
          params: { pagesize: 6, pageindex: that.pgindex, isrecommend: 1 },
        })
        .then((res) => {
          that.data = that.data.concat(res.data);
          that.pgindex++;
        });
      this.finishPullUp();
    }
    this.scroller.on("pullingUp", throttle(handle, 1000));
    // window.addEventListener("mousemove", throttle(handle, 1000));
  },
  updated() {
    this.scroller.refresh();
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: black;
}
.index {
  .bg {
    background: whitesmoke;
    height: 1100px;
    .tip {
      width: 100%;
      height: 20px;
      margin-top: 10px;
      div:nth-child(1) {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        width: 14px;
        height: 12px;
        background: url(../assets/imgs/14.png) no-repeat;
        background-size: 14px 12px;
      }
      div:nth-child(2) {
        margin-left: 5px;
        overflow: hidden;
        display: inline-block;
        font-size: 10px;
        font-family: PingFang-SC-Medium;
        color: #292929;
        opacity: 0.75;
      }
    }
    .menu {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        width: 50px;
        img {
          display: block;
          width: 35px;
          height: 35px;
          margin: 0 auto;
        }
        span {
          font-size: 11px;
          color: #111010;
        }
      }
    }
    .bm {
      margin: 0 auto;
      width: 93%;
      height: 106px;
    }
    .bm .bhd {
      width: 100%;
      height: 27px;
    }
    .bm .bc {
      width: 97%;
      margin: 0 auto;
      height: 92.5px;
      display: flex;
      justify-content: space-between;
      margin-top: 2.5px;
    }
    .bm .bhd > div:nth-child(1) {
      display: inline-block;
      position: relative;
      left: 0;
      width: 75px;
      height: 35px;
    }
    .bm .bhd > div:nth-child(1) img {
      width: 17px;
      height: 14px;
    }
    .bm .bhd > div:nth-child(1) span {
      vertical-align: middle;
      color: #111010;
      font-size: 13px;
      font-weight: 700;
    }
    .bm .bhd > div:nth-child(2) {
      float: right;
      position: relative;
      color: #454545;
      font-size: 10px;
      height: 27px;
      line-height: 27px;
    }
    .bm .bhd > div:nth-child(2)::after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-top: 1px solid #454545;
      border-right: 1px solid #454545;
      transform: rotate(45deg);
    }
    .bm .bc .bl {
      width: 158px;
      height: 75px;
      background-color: #7b4f46;
      border-radius: 7.5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bm .bc .bl div:nth-child(1) {
      background: url(../assets/imgs/8.png);
      background-size: 42.5px 54px;
      width: 42.5px;
      height: 54px;
      margin-right: 7.5px;
    }
    .bm .bc .bl div:nth-child(2) {
      width: 56px;
      height: 40px;
      margin-left: 7.5px;
    }
    .bm .bc .bl div:nth-child(2) span:nth-child(1) {
      display: block;
      font-size: 14px;
      color: white;
    }
    .bm .bc .bl div:nth-child(2) span:nth-child(2) {
      display: block;
      font-size: 11px;
      color: white;
      float: right;
      margin-top: 5px;
    }
    .bm .bc .br {
      width: 158px;
      height: 75px;
      background-color: #d87a6e;
      border-radius: 15/2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bm .bc .br div:nth-child(1) {
      background: url(../assets/imgs/7.png);
      background-size: 85/2px 108/2px;
      width: 85/2px;
      height: 108/2px;
      margin-right: 15/2px;
    }
    .bm .bc .br div:nth-child(2) {
      width: 112/2px;
      height: 80/2px;
      margin-left: 15/2px;
    }
    .bm .bc .br div:nth-child(2) span:nth-child(1) {
      display: block;
      font-size: 28/2px;
      color: white;
    }
    .bm .bc .br div:nth-child(2) span:nth-child(2) {
      display: block;
      font-size: 22/2px;
      color: white;
      float: right;
      margin-top: 10/2px;
    }
    .tj {
      margin: 0 auto;
      width: 93%;
      height: 992/2px;
      margin-top: 15/2px;
    }
    .tj .thd {
      width: 100%;
      height: 54/2px;
    }
    .tj .thd > div:nth-child(1) {
      display: inline-block;
      position: relative;
      left: 0;
      width: 150/2px;
      height: 70/2px;
    }
    .tj .thd > div:nth-child(1) img {
      width: 34/2px;
      height: 28/2px;
    }
    .tj .thd > div:nth-child(1) span {
      vertical-align: middle;
      color: #111010;
      font-size: 26/2px;
      font-weight: 700;
    }
    .tj .thd > div:nth-child(2) {
      float: right;
      position: relative;
      color: #454545;
      font-size: 20/2px;
      height: 54/2px;
      line-height: 54/2px;
    }
    .tj .thd > div:nth-child(2)::after {
      content: "";
      display: inline-block;
      width: 12/2px;
      height: 12/2px;
      border-top: 1px solid #454545;
      border-right: 1px solid #454545;
      transform: rotate(45deg);
    }
    .tj .tbd {
      margin-top: 7/2px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .tj .tbd .item {
      margin-top: 10px;
      height: 396/2px;
      width: 334/2px;
    }
    .tj .tbd .item img {
      width: 334/2px;
      height: 260/2px;
      display: block;
    }
    .tj .tbd .item > div {
      width: 100%;
      height: 138/2px;
      border-radius: 12/2px;
      background: white;
      overflow: hidden;
    }
    .tj .tbd .item > div .ttt {
      width: 100%;
      height: 60/2px;
      font-size: 30/2px;
      color: #030202;
      margin-left: 15/2px;
      font-weight: 700;
      line-height: 60/2px;
      margin-top: 20/2px;
    }
    .tj .tbd .item > div .fff {
      width: 100%;
      height: 60/2px;
      margin-left: 8/2px;
    }
    .tj .tbd .item > div .fff span {
      display: inline-block;
      font-size: 30/2px;
      color: #fb0606;
    }
    .tj .tbd .item > div .fff div {
      display: inline-block;
      position: relative;
      background: url(../assets/imgs/3.png);
      background-size: 25/2px 25/2px;
      width: 25/2px;
      height: 25/2px;
      left: 160/2px;
    }
  }
  .mytext {
    margin-top: 2px;
    text-align: center;
    line-height: 22px;
    .btNavtext {
      font-size: 14px;
    }
  }
}
</style>