<template>
  <div class="orderNav">
    <ul>
      <li @click="motion('全部')">全部</li>
      <li @click="motion('待支付')">待支付</li>
      <li @click="motion('进行中')">进行中</li>
      <li @click="motion('已完成')">已完成</li>
      <li @click="motion('已取消')">已取消</li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
    methods:{
      motion(who){
        this.$emit("callmes", who);
      }
    },
    props:{

    }
};
</script>

<style lang="less" scoped>
.orderNav{
  margin-top: 50px;
  ul{
    text-decoration: none;
    width: 100%;
    display: flex;
    justify-content: space-around;
    li{
      display: inline-block;
      width: 50px;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    li:hover{
      border-bottom: 1px solid black;
    }
  }
}
</style>