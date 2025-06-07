<template>
  <div class="orderBody">
    <div style="height: 580px; overflow: hidden; ">
      <div style="height:100%" ref="wrapper">
        <div>
        <div
          class="orderCard"
          v-for="(item, index) in this.orderlist"
          :key="index"
          @click="look(item)"
        >
          <div class="title">
            <span>订单号: 20200309162</span>
            <span>待支付</span>
          </div>
          <div class="line"></div>
          <div class="body">
            <img :src="item.OrderList[0].imgurl" alt="" />
            <div class="mesBody">
              <span class="tit">{{ item.uid }}</span>
              <span class="mes">点击查看详情</span>
              <span class="pic">￥{{ item.monery }}</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="btn">确认收货</div>
          <div class="btn">取消预约</div>
        </div>
        <div style="height:20px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      orderlist: [],
    };
  },
  mounted(){
    this.scroller = new BScroll(this.$refs.wrapper, {
      tap: true,
      click: true,
      pullUpLoad: true,
    });
  },
  created() {
    let data = {
      uid: window.sessionStorage.getItem("uid"),
      token: window.sessionStorage.getItem("token"),
    };
    this.$request({ url: "order/query", method: "post", data }).then((res) => {
      console.log(res);
      this.orderlist = res.data.table;
    });
  },
  methods: {
    look(item) {
      //由于共用pay所有要统一绑定属性值
      let oneorder={}
      let truelists=[]
      item.OrderList.forEach(item => {
        oneorder.imageurl=item.imgurl
        oneorder.name=item.name
        oneorder.num=item.number
        oneorder.price=item.price
        oneorder.zj=item.price
        truelists.push(oneorder)
      });
      console.log(1)
      console.log(truelists)
      this.$store.state.myOrder = truelists;
      this.$router.push({path:'Pay',query:{look:'1'}});
    },
  },
};
</script>

<style lang="less" scoped>
.orderBody {
  background: whitesmoke;
  width: 100%;
  height: 566px;
  overflow: hidden;
  .orderCard {
    width: 100%;
    margin-top: 10px;
    height: 180px;
    background: white;
    .title {
      width: 100%;
      height: 40px;
      span:nth-child(1) {
        line-height: 40px;
        margin-left: 15px;
        font-size: 14px;
      }
      span:nth-child(2) {
        line-height: 40px;
        margin-left: 165px;
        font-size: 14px;
      }
    }
    .line {
      width: 94%;
      height: 1px;
      background: whitesmoke;
    }
    .body {
      width: 100%;
      height: 100px;
      img {
        width: 70px;
        height: 70px;
        margin-left: 15px;
        margin-top: 15px;
        display: inline-block;
        background: yellow;
      }
      .mesBody {
        display: inline-block;
        vertical-align: top;
        height: 100px;
        width: 260px;
        .tit {
          display: block;
          width: 250px;
          height: 18px;
          font-size: 14px;
          margin-top: 16px;
          margin-left: 10px;
        }
        .mes {
          display: block;
          width: 250px;
          height: 18px;
          margin-top: 8px;
          font-size: 14px;
          color: gray;
          margin-left: 10px;
        }
        .pic {
          display: block;
          width: 250px;
          height: 14px;
          margin-top: 8px;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
    .btn {
      width: 70px;
      height: 25px;
      float: right;
      margin-right: 10px;
      font-size: 13px;
      color: gray;
      border: 1px solid gray;
      line-height: 25px;
      text-align: center;
      margin-top: 6px;
    }
  }
}
</style>