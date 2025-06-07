<template>
  <div class="Menu">
    <statusBar></statusBar>
    <div class="topNav">
      <!-- 类似喵喵边输入边查 -->
      <input v-model="showname" placeholder="安德莉亚奶油蛋糕" />
      <span class="iconfont icon-sousuo"></span>
    </div>
    <meunCon @callmes="find($event)"></meunCon>
    <div class="Menubg">
      <lunbo :imgssrc="lunboimg" :lunboh="flunboh" style="margin-top:10px"></lunbo>
      <div style="height:800px;overflow:hidden;margin-bottom:50px;">
        <div style="height:100%" ref="wrapper">
          <orderList @tofindshow="findshow($event)" :data="showlist"></orderList>
        </div>
      </div>
    </div>
    <btNav>
      <router-link to="/Index">
        <div style="    margin-top: 2px;
    text-align: center;
    line-height: 22px;">
          <div slot="img" style="font-size:20px" class="iconfont icon-icon_home"></div>
          <div slot="text" style="font-size: 14px;" class="btNavtext">主页</div>
        </div>
      </router-link>
      <router-link to="/Menu">
        <div style="    margin-top: 2px;
    text-align: center;
    line-height: 22px;">
          <div slot="img" style="font-size:20px" class="iconfont icon-caidan"></div>
          <div slot="text" style="font-size: 14px;" class="btNavtext">分类</div>
        </div>
      </router-link>
      <router-link to="/car">
        <div style="    margin-top: 2px;
    text-align: center;
    line-height: 22px;">
          <div slot="img" style="font-size:20px" class="iconfont icon-gouwuche"></div>
          <div slot="text" style="font-size: 14px;" class="btNavtext">购物车</div>
        </div>
      </router-link>
      <router-link to="/Pay">
        <div style="    margin-top: 2px;
    text-align: center;
    line-height: 22px;">
          <div v-if="isshows" slot="img" style="font-size:20px" class="iconfont icon-gerenzhongxin"></div>
          <div
            v-if="!isshows"
            slot="img"
            style="border-radius: 11px;overflow: hidden;width:22px;height:22px;margin-left:15px;"
          >
            <img style="width:22px;height:22px" :src="ownimgsrc" alt />
          </div>
          <div slot="text" style="font-size: 14px;">个人中心</div>
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
import lunbo from "@/components/lunbo.vue";
import meunCon from "@/components/meun/meunCon.vue";
import orderList from "@/components/orderList.vue";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      //查询输入信息
      searchMessage: "",
      showlist: [],
      lunboimg: [],
      flunboh: "height:240px",
      data: [],
      pgindex: 2,
      showname: "",
      isshows: true,
      ownimgsrc: "",
    };
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
  methods: {
    find(e) {
      if (e == "精选") {
        this.$request({
          url: "product/query",
          method: "post",
          params: { pagesize: 8, pageindex: 1, isrecommend: 1 },
        }).then((res) => {
          this.showlist = res.data;
        });
      } else {
        this.showlist = this.data.filter((item) => {
          if (item.categoryname == e) {
            return item;
          }
        });
      }
    },
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
        this.$store.commit("checkIs", toshow);
        this.$router.push("/Details");
      });
    },
    upSort(id) {
      return function (a, b) {
        return a[id] - b[id];
      };
    },
  },
  created() {
    if (window.sessionStorage.getItem("token")) {
      this.isshows = false;
    }
    this.ownimgsrc = this.$store.getters.getmying;
    //加载商品信息
    this.$request({
      url: "product/query",
      method: "post",
      params: { isrecommend: 1 },
    }).then((res) => {
      this.data = res.data;
    });
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
    this.find("精选");
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
          params: { pagesize: 8, pageindex: that.pgindex, isrecommend: 1 },
        })
        .then((res) => {
          that.showlist = that.showlist.concat(res.data);
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
  components: {
    btNav,
    statusBar,
    topNav,
    lunbo,
    meunCon,
    orderList,
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: black;
}
.Menu {
  .Menubg {
    background: whitesmoke;
    height: 100%;
  }
  .topNav {
    position: relative;
    input {
      margin-top: 30px;
      margin-left: 6%;
      padding-left: 13%;
      height: 40px;
      width: 75%;
      background: whitesmoke;
      border-radius: 30px;
      border: none;
      outline: none;
    }
    span {
      position: absolute;
      font-size: 24px;
      left: 40px;
      top: 37px;
    }
  }
}
</style>