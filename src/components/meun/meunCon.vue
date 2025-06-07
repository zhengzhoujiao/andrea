<template>
  <div class="menuCon">
    <div ref="wrapper">
      <ul>
        <li
          :style=" indexx === index ? sty : '' "
          @click="putmenu(item,index)"
          v-for="(item,index) in menuList"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      menuList: [
        "精选",
        "玛芬蛋糕",
        "水果蛋糕",
        "慕斯蛋糕",
        "奶油蛋糕",
        "焦蛋糕",
        "诗蛋糕",
        "博蛋糕",
      ],
      indexx: 0,
      sty: "color:red",
      scroller: null,
    };
  },
  methods: {
    putmenu(who, index) {
      this.indexx = index;
      this.$emit("callmes", who);
    },
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      scrollX: true,
      click: true,
    });
  },
};
</script>

<style lang="less" scoped>
.menuCon {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  ul {
    background: white;
    list-style: none;
    width: fit-content;
    height: 50px;
    li {
      display: inline-block;
      width: fit-content;
      text-align: center;
      line-height: 50px;
      margin-left: 20px;
    }
  }
}
</style>