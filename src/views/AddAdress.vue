<template>
  <div class="AddAdress">
      <statusBar></statusBar>
      <topNav>
        <div slot="left">
        <div
          class="iconfont icon-zuobian"
          style="font-size: 28px; line-height: 47px; text-align: center;"
        ></div>
      </div>
      <div slot="mid" style="text-align: center; line-height: 30px; font-size: 18px;">添加地址</div>
      <div slot="right"></div>
      </topNav>
      <div class="fakebg"></div>
      <ul>
          <li><span>用户名</span><input type="text" placeholder="请输入用户名" v-model="name" /></li>
          <li><span>手机号码</span><input type="text" placeholder="请输入手机号码" v-model="phone" /></li>
          <li><span>地址</span><input type="text" placeholder="请输入详细地址" v-model="adress" /></li>
          <li><span>默认地址</span><input type="checkbox" class="checke" v-model="todefault"></li>
      </ul>
      <myButton style="margin-top:260px" ><div @click="add">保存</div></myButton>
  </div>
</template>

<script>
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import myButton from "@/components/button.vue";
export default {
    data() {
        return {
            name:"",
            phone:"",
            adress:"",
            todefault:false
        }
    },
    components:{
        statusBar,
        topNav,
        myButton
    },
    methods:{
        add(){
            console.log(1)
            let data={
                uid:window.sessionStorage.getItem('uid'),
                token:window.sessionStorage.getItem('token'),
                customer:this.name,
                customerphone:this.phone,
                address:this.adress
            }
            this.$request({url:"address/add",method:"post",data}).then(res=>{
                console.log(res);
            })
        }
    }
};
</script>

<style lang="less" scoped>
.fakebg{
    width: 100%;
    height: 65px;
    background: #F5F5F5;
}
ul{
    list-style: none;
    li{
        margin-top: 20px;
        margin-left: 20px;
        span{
            display: inline-block;
            font-size: 16px;
            width: 68px;
        }
        input{
            margin-left: 80px;
            border: none;
            outline: none;
        }
        .checke{
            vertical-align: top;
            position: relative;
            -webkit-appearance: none;
            width:40px;
            height: 20px;
            line-height: 20px;
            background: #eee;
            border-radius: 10px;
            outline: none;
            margin-left: 220px;
            margin-top: 2px;
        }
        .checke:before{
            position: absolute;
            left: 0;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #eee;
            box-shadow: 0px 0px 5px #ddd;
            transition: all 0.2s linear;
        }
 
        .checke:checked{
           background: #18ff0a;
        }
        .checke:checked:before{
            left: 25px;
            transition: all 0.2s linear;
        }
    }
}
</style>