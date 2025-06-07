<template>
  <div class="Map">
    <statusBar></statusBar>
    <topNav>
      <div slot="left" @click="back">
        <span
          style="line-height: 45px; margin-left: 10px"
          class="iconfont icon-xiangzuo"
        ></span>
      </div>
      <input
        slot="mid"
        placeholder="请输入位置"
        style="
          padding-left: 20px;
          width: 230px;
          height: 35px;
          background: whitesmoke;
          border-radius: 15px;
          border: none;
        "
      />
      <div
        slot="right"
        class="iconfont icon-ditu"
        style="
          color: black;
          font-size: 24px;
          line-height: 42px;
          text-align: center;
        "
      ></div>
    </topNav>
    <div class="mmap">
      <myMap ref="mymap" :thePosition="thePosition"></myMap>
    </div>
    <div style="height: 50px"></div>
    <div class="adress" v-for="(item, index) in Address" :id="index" :key="index" @click="chickThis($event)" :style="{'background-color':who==index?'whitesmoke':'white'}">
      <div class="iconfont icon-weizhi" style="color:red" :style="{'opacity':who==index?'1':'0'}"></div>
      <div style="margin-top:15px" class="body">
        <span style="display:block;margin-top:3px" >{{ item.shopname }}</span>
        <span style="display:block;margin-top:3px;font-size:14px;color:grey">{{ item.address }}</span>
        <span style="float:left;margin-top:3px;font-size:14px">{{ item.distance }}米</span>
        <span style="float:right;color:red;font-size:12px;margin-top:3px" >{{item.ider}}</span>
      </div>
      <div class="iconfont icon-iconfontxiaogantanhao"></div>
    </div>
    <div style="margin-bottom: 10px;" @click="checkIs">
      <myButton>确认地址</myButton>
    </div>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css";
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import myButton from "@/components/button.vue";
import myMap from "@/components/myMap.vue";
import "@/assets/iconfont/iconfont.css";
import { AMapManager } from "vue-amap";
export default {
  data() {
    return {
      Address: [],
      thePosition: [],
      who:Number
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
          this.Address = this.Address.sort(this.upsort("distance"));
          this.Address[0].ider="距离您最近"
        });
      });
    });
  },
  methods: {
    back(){
      this.$router.push('Pay')
    },
    upsort(distance) {
      return function (a, b) {
        return a[distance] - b[distance];
      };
    },
    chickThis(e){
      this.who=e.path[1].id+e.path[2].id
    },
    checkIs(){
      this.$store.state.AdressNow=this.Address[this.who]
      this.$router.push('Pay')
    }
  },
  components: {
    statusBar,
    topNav,
    myButton,
    myMap,
  },
};
</script>

<style lang="less" scoped>
.mmap {
  margin-top: 50px;
  width: 100%;
  height: 250px;
}
.adress {
  height: 100px;
  width: 100%;
  vertical-align: middle;
}
.adress div:nth-child(1) {
  font-size: 25px;
  height: 40px;
  width: 40px;
  margin-left: 15px;
  display: inline-block;
  vertical-align: middle;
}
.adress div:nth-child(2) {
  width: 245px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.adress div:nth-child(3) {
  font-size: 25px;
  height: 40px;
  vertical-align: middle;
  width: 40px;
  margin-left: 15px;
  display: inline-block;
}
</style>
