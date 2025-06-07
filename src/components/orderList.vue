<template>
  <div class="orderList">
    <div class="tbd">
      <div class="item" v-for="(item,index) in data" :key="index">
        <img :src="item.imageurl"  @click="findshow(item.name)" />
        <div>
          <div class="ttt">{{item.name}}</div>
          <div class="fff">
            <span>￥{{item.price}}</span>
            <div @click="tocar(item)"></div>
          </div>
        </div>
      </div>
      <div class="zw" v-show="parseInt(data.length/2)==1"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:false,
      some:""
    };
  },
  props: {
    data: Array
  },
  methods: {
    findshow(who) {
      //通过who获取查找商品
      // let toshow = .....
      // this.$store.commit('checkIs',toshow)
      this.$emit("tofindshow", who);
    },
    // 小图标加入购物车
    tocar(who) {
      if(this.some!=who){
        this.some=who
        this.$store.commit("checkIs", who);
      }
      let data = {
            uid:window.sessionStorage.getItem('uid'),
            token:window.sessionStorage.getItem('token'),
            pid:who.id,
            num:who.num
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
          if(who.name==item.name){
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
      // this.$store.commit("checkIs", who);
      // if (this.$store.state.mycar.length == 0) {
      //   this.$store.commit("addcar");
      //   this.$store.commit("caraddnum");
      //   this.$message.success("加入购物车成功");
      // } else {
      //   //可跳出循环
      //   try{
      //     this.$store.state.mycar.forEach((item,index) => {
      //       //应该是双层循环
      //       if (this.$store.state.toShow[0].name == item.name) {
      //         item.num++;
      //         item.zj = item.cid * item.num;
      //         this.$store.commit("caraddnum");
      //         this.$message.success("加入购物车成功");
      //         throw Error();
      //       }else {
      //         this.$store.commit("addcar");
      //         this.$store.commit("caraddnum");
      //         this.$message.success("加入购物车成功");
      //         throw Error();
      //       }
      //     });
      //   } catch(e){
            
      //   }

      // }
    },
  },
};
</script>

<style lang="less" scoped>
.tbd {
  margin-top: 7/2px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.tbd .item {
  margin-top: 10px;
  height: 396/2px;
  width: 334/2px;
}
.zw {
  margin-top: 10px;
  height: 396/2px;
  width: 334/2px;
}
.tbd .item img {
  width: 334/2px;
  height: 260/2px;
  display: block;
}
.tbd .item > div {
  width: 100%;
  height: 138/2px;
  border-radius: 12/2px;
  background: white;
  overflow: hidden;
}
.tbd .item > div .ttt {
  width: 100%;
  height: 60/2px;
  font-size: 30/2px;
  color: #030202;
  margin-left: 15/2px;
  font-weight: 700;
  line-height: 60/2px;
  margin-top: 20/2px;
}
.tbd .item > div .fff {
  width: 100%;
  height: 60/2px;
  margin-left: 13/2px;
}
.tbd .item > div .fff span {
  display: inline-block;
  font-size: 30/2px;
  color: #fb0606;
}
.tbd .item > div .fff div {
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  position: relative;
  background: url(../assets/imgs/3.png) no-repeat;
  background-size: 25/2px 25/2px;
  width: 35/2px;
  height: 35/2px;
  left: 160/2px;
}
</style>