<template>
  <div class="Car">
    <statusBar></statusBar>
    <topNav>
      <div slot="left"></div>
      <div
        slot="mid"
        style="text-align: center; line-height: 30px; font-size: 18px"
      >
        购物车({{ this.$store.state.titnum }})
      </div>
      <div slot="right"></div>
    </topNav>
    <div class="tologin" v-if="isShow == false" @click="tologin">请先登录</div>
    <div v-if="isShow">
      <div class="body">
        <div class="cards">
          <div style="height: 470px; overflow: hidden; margin-bottom: 50px">
            <div style="height: 100%" ref="wrapper">
              <div>
                <div
                  class="card"
                  v-for="(item, index) in this.$store.state.mycar"
                  :key="index"
                >
                  <div class="rd">
                    <input
                      class="checkson"
                      type="checkbox"
                      v-model="item.flag"
                      @click="checkThis(item)"
                    />
                  </div>
                  <div class="pic">
                    <img src="../assets/imgs/图层1.png" />
                  </div>
                  <div class="xx">
                    <span style="display: inline-block; width: 180px">{{
                      item.name
                    }}</span
                    ><span
                      style="display: inline-block; margin-left: 0"
                      class="iconfont icon-shanchu"
                      @click="del(item)"
                    ></span>
                    <span>{{ item.categoryname }}</span>
                    <div class="num">
                      <span class="price">￥{{ item.price }}</span>
                      <div class="chance">
                        <button class="jian" @click="dec(item)">-</button>
                        <input type="text" v-model="item.num" />
                        <button class="jia" @click="add(item)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="jsuan">
        <input
          id="checkall"
          v-model="this.$store.state.checkAllflag"
          type="checkbox"
          @click="checkAll"
        />
        <span>全选</span>
        <span>合计:￥{{ sumh }}</span>
        <div @click="pay">结算</div>
      </div>
      <div style="width: 100%; height: 5px; background: whitesmoke"></div>
    </div>

    <btNav>
      <router-link to="/Index">
        <div style="margin-top: 2px; text-align: center; line-height: 22px">
          <div
            slot="img"
            style="font-size: 20px"
            class="iconfont icon-icon_home"
          ></div>
          <div slot="text" style="font-size: 14px" class="btNavtext">主页</div>
        </div>
      </router-link>
      <router-link to="/Menu">
        <div style="margin-top: 2px; text-align: center; line-height: 22px">
          <div
            slot="img"
            style="font-size: 20px"
            class="iconfont icon-caidan"
          ></div>
          <div slot="text" style="font-size: 14px" class="btNavtext">分类</div>
        </div>
      </router-link>
      <router-link to="/car">
        <div style="margin-top: 2px; text-align: center; line-height: 22px">
          <div
            slot="img"
            style="font-size: 20px"
            class="iconfont icon-gouwuche"
          ></div>
          <div slot="text" style="font-size: 14px" class="btNavtext">
            购物车
          </div>
        </div>
      </router-link>
      <router-link to="/Pay">
        <div style="margin-top: 2px; text-align: center; line-height: 22px">
          <div
            v-if="isshows"
            slot="img"
            style="font-size: 20px"
            class="iconfont icon-gerenzhongxin"
          ></div>
          <div
            v-if="!isshows"
            slot="img"
            style="
              border-radius: 11px;
              overflow: hidden;
              width: 22px;
              height: 22px;
              margin-left: 15px;
            "
          >
            <img style="width: 22px; height: 22px" :src="ownimgsrc" alt />
          </div>
          <div slot="text" style="font-size: 14px">个人中心</div>
        </div>
      </router-link>
    </btNav>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import btNav from "@/components/btNav.vue";
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      titnum: 0,
      num: 0,
      heji: 0,
      isShow: false,
      isshows: true,
      ownimgsrc: "",
      sumh: 0,
    };
  },
  created() {
    //加载头像
    if (window.sessionStorage.getItem("token")) {
      this.isshows = false;
    }
    this.ownimgsrc = this.$store.getters.getmying;
    //
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      tap: true,
      click: true,
      pullUpLoad: true,
    });
  },
  methods: {
    del(item) {
      //直接删除需要获得购物车id
      console.log(item)
      this.$messageBox(
        "确认要删除吗？",
        function () {
          let data = {
            uid:window.sessionStorage.getItem('uid'),
            token:window.sessionStorage.getItem('token'),
            sid:item.id
          }
              this.$request({
      url: "shopcar/delete",
      method: "post",data}).then((res)=>{
            console.log(res)
          })
                console.log(item)
          this.$store.commit("deccar",item.id)
        },
        this
      );

    },
    tologin() {
      this.$router.push("/");
    },
    add(item) {
      item.num++;
      item.zj = item.price * item.num;
      this.$store.commit("caraddnum");
            this.sumh = 0;
      for (let i = 0; i < this.$store.state.mycar.length; i++) {
        if (this.$store.state.mycar[i].flag == true) {
          this.sumh += this.$store.state.mycar[i].zj;
        }
      }
    },
    dec(item) {
      if (item.num > 1) {
        console.log(item.num);
        item.num--;
        item.zj = item.price * item.num;
        this.$store.commit("cardecnum");
              this.sumh = 0;
      for (let i = 0; i < this.$store.state.mycar.length; i++) {
        if (this.$store.state.mycar[i].flag == true) {
          this.sumh += this.$store.state.mycar[i].zj;
        }
      }
      }
    },
    checkAll() {
      this.$store.commit("checkAll");
      this.sumh = 0;
      for (let i = 0; i < this.$store.state.mycar.length; i++) {
        if (this.$store.state.mycar[i].flag == true) {
          this.sumh += this.$store.state.mycar[i].zj;
        }
      }
    },
    checkThis(item) {
      console.log(item);
      item.zj = item.price * item.num;
      item.flag = !item.flag;
      let flags = true;
      this.$store.state.mycar.forEach((a) => {
        if (!a.flag) {
          flags = false;
        }
      });
      this.$store.state.checkAllflag = flags;
      this.sumh = 0;
      //加不上可能是flag
      for (let i = 0; i < this.$store.state.mycar.length; i++) {
        if (this.$store.state.mycar[i].flag == true) {
          this.sumh += this.$store.state.mycar[i].zj;
        }
      }
    },
    pay() {
      this.$store.commit("order");
      this.$router.push("/Pay");
    },
  },
  components: {
    statusBar,
    topNav,
    btNav,
  },
  //点首页购物车进来的商品监听不到计算属性
  // computed: {
  //   sums: function () {
  //     console.log("jsb")
  //     this.sumh = 0;
  //     //加不上可能是flag
  //     for (let i = 0; i < this.$store.state.mycar.length; i++) {
  //       if (this.$store.state.mycar[i].flag == true) {
  //         this.sumh += this.$store.state.mycar[i].zj;
  //       }
  //     }
  //     return this.sumh;
  //   },
  // },
};
</script>

<style lang="less" scoped>
.Car {
  .tologin {
    margin-top: 100px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .body {
    background: whitesmoke;
    height: 540px;
  }
  .cards {
    margin-left: 12px;
    padding-top: 50px;
    .card {
      display: flex;
      margin-top: 20/2px;
      height: 210/2px;
      width: 700/2px;
      background: white;
      border-radius: 15/2px;
      align-items: center;
    }
    .card .rd {
      flex: 1;
      height: 160/2px;
      text-align: center;
      line-height: 160/2px;
    }
    .card .rd img {
      width: 27/2px;
      height: 28/2px;
      opacity: 0.56;
    }
    .card .pic {
      flex: 2.5;
      height: 160/2px;
    }
    .card .pic img {
      width: 160/2px;
      height: 160/2px;
    }
    .card .xx {
      flex: 6.5;
      height: 160/2px;
    }
    .card .xx > span:nth-child(1) {
      font-family: PingFang-SC-Medium;
      font-size: 29/2px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #000000;
      display: block;
    }
    .card .xx > span {
      margin-left: 20/2px;
      margin-top: 10/2px;
    }
    .card .xx > span:nth-child(2) {
      font-family: PingFang-SC-Medium;
      font-size: 21/2px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c6c6c;
      display: block;
    }
    .card .xx .num {
      width: 100%;
      height: 55/2px;
      margin-top: 20/2px;
      display: flex;
      align-items: center;
    }
    .card .xx .num > span {
      font-family: PingFang-SC-Bold;
      font-size: 29/2px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #fa0c0c;
      margin-left: 12/2px;
    }
    .card .xx .num .chance {
      margin-left: 160/2px;
      width: 151/2px;
      height: 40/2px;
      display: flex;
      justify-content: space-around;
      align-self: center;
      // display: inline-block;
    }
    .card .xx .num .chance .jia {
      width: 20px;
      height: 20px;
      line-height: 8px;
      text-align: center;
    }
    .card .xx .num .chance .jian {
      width: 20px;
      height: 20px;
      line-height: 8px;
      text-align: center;
    }
    .card .xx .num .chance input {
      display: inline-block;
      width: 20px;
      height: 38/2px;
      text-align: center;
      border: 1px solid black;
      margin-top: -1/2px;
    }
  }
  .jsuan {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .jsuan input {
    margin-left: 20/2px;
    width: 29/2px;
    height: 29/2px;
  }
  .jsuan > span:nth-child(2) {
    margin-left: 10/2px;
    font-family: PingFang-SC-Medium;
    font-size: 28/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #474747;
  }
  .jsuan > span:nth-child(3) {
    margin-left: 300/2px;
    font-size: 30/2px;
    font-weight: normal;
    font-stretch: normal;
    color: #070707;
  }
  .jsuan > div {
    width: 140/2px;
    height: 67/2px;
    background-color: #f93f06;
    border-radius: 30/2px;
    float: right;
    margin-top: 9px;
    margin-right: 15px;
    font-family: PingFang-SC-Medium;
    font-size: 24/2px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #fdfbfa;
    text-align: center;
    line-height: 67/2px;
  }
}
</style>