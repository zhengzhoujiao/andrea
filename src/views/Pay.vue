<template>
  <div class="Pay">
    <statusBar></statusBar>
    <topNav>
      <div slot="left" @click="Order">
        <span
          style="line-height: 45px; margin-left: 10px"
          class="iconfont icon-xiangzuo"
        ></span>
      </div>
      <div
        slot="mid"
        style="text-align: center; line-height: 30px; font-size: 18px"
      >
        支付
      </div>
      <div slot="right"></div>
    </topNav>
    <div class="ballbg" v-show="ball" @click="close">
      <div id="snackbar">
        <p @click="wx" :style="{ color: colorflag ? 'orange' : 'black' }">
          微信
        </p>
        <p :style="{ color: !colorflag ? 'orange' : 'black' }" @click="zfb">
          支付宝
        </p>
        <p>取消</p>
      </div>
    </div>
    <div style="height: 580px; overflow: hidden">
      <div style="height: 100%" ref="wrapper">
        <div class="content">
          <div class="adressCard">
            <span
              style="
                margin-left: 10px;
                display: inline-block;
                line-height: 80px;
                font-size: 28px;
              "
              class="iconfont icon-weizhi"
            ></span>
            <div class="adress">
              <!-- mmp动态渲染为什么better-scoller找不到此节点报错 -->
              <span>{{this.$store.state.AdressNow.shopname}}</span>
              <span>{{this.$store.state.AdressNow.address}}</span>
            </div>
            <span
              style="
                vertical-align: top;
                display: inline-block;
                line-height: 80px;
                font-size: 18px;
              "
              class="iconfont icon-youbian"
              @click="adressshop"
            ></span>
            <span class="line"></span>
          </div>
          <div
            v-for="(item, index) in this.$store.state.myOrder"
            :key="index"
            class="showCard"
          >
            <div class="title">
              <img :src="item.imageurl" alt />
              <div class="mes">
                <p>{{ item.name }}</p>
                <p>x1</p>
              </div>
              <span class="titprice">￥{{ item.price }}</span>
            </div>
            <div class="line2"></div>
            <div class="btn">
              <span>到店自取</span>
              <span>应付￥{{ item.price*item.num }}</span>
            </div>
          </div>
          <div class="timeCard">
            <span>请选择取餐时间</span>
            <div class="rdo">
              <input type="radio" id="now" v-model="ched" value="one" />
              <label for="now">现在取餐</label>
            </div>
            <div class="rdo">
              <input type="radio" id="ten" v-model="ched" value="two" />
              <label for="ten">10分钟后到店取</label>
            </div>
            <div class="rdo">
              <input type="radio" id="twenty" v-model="ched" value="thr" />
              <label for="twenty">20分钟后到店取</label>
            </div>
            <div class="rdo">
              <input type="radio" id="thirty" v-model="ched" value="four" />
              <label for="thirty">30分钟后到店取</label>
            </div>
          </div>
          <div class="quanCard">
            <span class="left">优惠券</span>
            <span class="right">无可用</span>
          </div>
          <div class="myAdress">
            <span class="left">收货地址</span>
            <span class="right" @click="adress">></span>
          </div>
          <div class="PayCard">
            <span>支付方式</span>
            <span v-show="paymethod" class="iconfont icon-weixinzhifu"></span>
            <span v-show="paymethod">微信支付</span>
            <span
              v-show="!paymethod"
              style="color: blue; font-size: 28px"
              class="iconfont icon-zhifubaozhifu"
            ></span>
            <span
              style="
                float: right;
                margin-right: 12px;
                margin-top: 19px;
                font-size: 18px;
              "
              class="iconfont icon-youbian"
              @click="topay"
            ></span>
          </div>
          <div style="margin-bottom: 60px">
            <span
              style="font-size: 18px; margin-left: 12px"
              :style="{ color: readcolor }"
              class="iconfont icon-gouxuan"
              @click="read"
            ></span>
            <span
              style="
                font-size: 16px;
                display: inline-block;
                margin-top: 12px;
                margin-left: 12px;
              "
            >
              我已阅读并同意
              <span style="color: blue">《支付协议》</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="buNav">
      <span>
        合计:
        <span>￥{{ sums }}</span>
      </span>
      <!-- 点确认支付后才将商品信息添加到订单列表，可以用orderlist绑定数据但是点击支付要创建新数组存订单 -->
      <div v-show="!this.$route.query.look==1" @click="Pay">去支付</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      ched: "one",
      readcolor: "grey",
      flag: false,
      paymethod: true,
      ball: false,
      colorflag: true,
      address: "",
      myshopcarlist: [],
      Address:{}
    };
  },
  created() {
    let data = {
      uid: window.sessionStorage.getItem("uid"),
      token: window.sessionStorage.getItem("token"),
    };
    this.$request({ url: "address/querybyuser", method: "post", data }).then(
      (res) => {
        console.log(res);
      }
    );
        this.$request({ url: "shop/query", method: "post", data }).then((res) => {
      this.Address = res.data;
      this.Address.forEach((item) => {
       this.$request({
          url:
            "https://restapi.amap.com/v3/direction/driving?origin=112.42759,34.60778&destination=" +
            item.location +
            "&output=json&key=32afb243c6d01a86f788f6095f91b2fa",
          method: "get",
        }).then((res) => {
          item.distance = res.data.route.paths[0].distance;
          console.log(item);
          this.Address = this.Address.sort(this.upsort("distance"))[0];
          this.$store.state.AdressNow=this.Address
        });
      });
      
    });

  },
  methods: {
    upsort(distance) {
      return function (a, b) {
        return a[distance] - b[distance];
      };
    },
    close() {
      this.ball = !this.ball;
    },
    wx() {
      this.paymethod = true;
      this.colorflag = true;
    },
    zfb() {
      this.paymethod = false;
      this.colorflag = false;
    },
    topay() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      this.ball = !this.ball;
    },
    read() {
      console.log(1);
      this.flag = !this.flag;
      if (this.flag) {
        this.readcolor = "green";
      } else {
        this.readcolor = "grey";
      }
    },
    adress() {
      this.$router.push("/Adress");
    },
    Order() {
      this.$router.push("/Order");
    },
    adressshop() {
      this.$router.push("/Map");
    },
    Pay() {
      const tokenStr = window.sessionStorage.getItem("token");
      if (!tokenStr) {
        this.$router.push("/");
      } else {
        if (this.flag == false) {
          this.$messageBox("请阅读支付协议", function () {}, this);
        } else {
          this.myshopcarlist = [];
          this.$store.getters.getorder.forEach((item) => {
            let odlist = {};
            odlist.pid = item.pid;
            odlist.number = item.num;
            this.myshopcarlist.push(odlist);
          });
          let data = {
            uid: window.sessionStorage.getItem("uid"),
            token: window.sessionStorage.getItem("token"),
            shopcarlist: JSON.stringify(this.myshopcarlist)
          };
          this.$request({ url: "order/addorder", method: "post", data }).then(
            (res) => {
              console.log(res);
            }
          );
          this.$messageBox("确定支付？", function () {
            window.location.href="http://39.96.60.78:1234/order/takeorder?uid=31&token=123&sid=1&aid=1&paytype=0&appotime=2020-10-08&oid=10&successUrl=http://39.96.60.78:1234/HtmlPage1.html"
          }, this);
        }
      }
    },
  },
  computed: {
    sums: function () {
      this.sumh = 0;
      for (let i = 0; i < this.$store.state.myOrder.length; i++) {
        this.sumh += this.$store.state.myOrder[i].zj;
      }
      return this.sumh;
    },
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      tap: true,
      click: true,
      pullUpLoad: true,
    });
  },

  components: {
    statusBar,
    topNav,
  },
};
</script>

<style lang="less" scoped>
.ballbg {
  margin-top: 37px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 998;
  position: fixed;
}
#snackbar {
  visibility: hidden;
  width: 100%;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 5px;
  height: 175px;
  position: fixed;
  z-index: 999;
  bottom: 0px;
  font-size: 17px;
  p {
    margin-top: 25px;
    font-size: 18px;
  }
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.3s;
  animation: fadein 0.3s;
}
@-webkit-keyframes fadein {
  from {
    bottom: -30px;
    opacity: 0;
  }
  to {
    bottom: 0px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: -30px;
    opacity: 0;
  }
  to {
    bottom: 0px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 0px;
    opacity: 1;
  }
  to {
    bottom: -30px;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 0px;
    opacity: 1;
  }
  to {
    bottom: -30px;
    opacity: 0;
  }
}
.content {
  margin-top: 40px;
  width: 100%;
  background: whitesmoke;
  overflow: hidden;
  .adressCard {
    width: 92%;
    height: 80px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    .adress {
      margin-left: 10px;
      width: 270px;
      height: 80px;
      display: inline-block;
      vertical-align: top;
      span:nth-child(1) {
        display: block;
        margin-top: 10px;
      }
      span:nth-child(2) {
        display: block;
        font-size: 13px;
        color: gray;
        margin-top: 12px;
      }
    }
  }
  .showCard {
    width: 92%;
    height: 172px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    .title {
      height: 125px;
      width: 100%;
      img {
        display: inline-block;
        margin-left: 20px;
        width: 80px;
        height: 80px;
        margin-top: 20px;
      }
      .mes {
        height: 120px;
        display: inline-block;
        width: 165px;
        vertical-align: top;
        position: relative;
        p:nth-child(1) {
          margin-top: 20px;
          margin-left: 8px;
        }
        p:nth-child(2) {
          position: absolute;
          margin-top: 42px;
          margin-left: 135px;
        }
      }
      .titprice {
        display: inline-block;
      }
    }
    .line2 {
      width: 86%;
      height: 1px;
      background: whitesmoke;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .btn {
      span:nth-child(1) {
        float: left;
        margin-left: 23px;
        margin-top: 12px;
        color: gray;
        opacity: 0.75;
      }
      span:nth-child(2) {
        float: right;
        margin-right: 23px;
        margin-top: 12px;
      }
    }
  }
  .timeCard {
    width: 92%;
    height: 122px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    span:nth-child(1) {
      display: block;
      font-size: 17px;
      margin-top: 12px;
      margin-left: 12px;
    }
    .rdo {
      margin-top: 12px;
      display: inline-block;
      width: 45%;
      margin-left: 5%;
    }
  }
  .quanCard {
    width: 92%;
    height: 50px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    .left {
      float: left;
      font-size: 19px;
      line-height: 50px;
      color: gray;
      margin-left: 14px;
    }
    .right {
      float: right;
      font-size: 19px;
      line-height: 50px;
      color: gray;
      margin-right: 14px;
    }
  }
  .myAdress {
    width: 92%;
    height: 50px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    .left {
      float: left;
      font-size: 19px;
      line-height: 50px;
      color: gray;
      margin-left: 14px;
    }
    .right {
      float: right;
      font-size: 19px;
      line-height: 50px;
      color: gray;
      margin-right: 14px;
    }
  }
  .PayCard {
    width: 92%;
    height: 50px;
    margin-top: 12px;
    background: white;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    overflow: hidden;
    span:nth-child(1) {
      float: left;
      font-size: 19px;
      line-height: 50px;
      color: gray;
      margin-left: 14px;
      margin-right: 100px;
    }
    span:nth-child(2) {
      display: inline-block;
      font-size: 26px;
      line-height: 50px;
      color: gray;
      margin-left: 10px;
      color: green;
      opacity: 0.65;
    }
    span:nth-child(3) {
      display: inline-block;
      font-size: 17px;
      line-height: 50px;
      color: gray;
      margin-left: 10px;
    }
    span:nth-child(4) {
      display: inline-block;
      font-size: 22px;
      line-height: 50px;
      color: gray;
      margin-left: 10px;
    }
  }
}
.buNav {
  position: fixed;
  z-index: 990;
  height: 60px;
  width: 100%;
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 18px;
    color: gray;
    span {
      font-size: 20px;
      color: black;
    }
  }
  div {
    float: right;
    height: 45px;
    width: 140px;
    background: goldenrod;
    color: white;
    margin-top: 7.5px;
    margin-right: 15px;
    border-radius: 25px;
    line-height: 45px;
    text-align: center;
  }
}
</style>