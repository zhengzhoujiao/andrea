<template>
  <div class="Login">
    <statusBar></statusBar>
    <header>
      <img src="../assets/imgs/timg.jpeg" alt />
    </header>
    <div class="content">
      <span class="title">Andrea</span>
      <div class="input">
        <span style="font-size:20px;margin-left:10px;" class="iconfont icon-shouji"></span>
        <input type="text" placeholder="请输入会员/手机号" v-model="phone" />
        <span class="line"></span>
        <span style="font-size:20px;margin-left:10px;" class="iconfont icon-mima"></span>
        <input type="text" placeholder="请输入密码" v-model="pwd" />
        <span class="wjmima">忘了？</span>
      </div>
      <div @click="join">
        <myButton>登录</myButton>
      </div>
      <p>您还没有帐号？</p>
      <a @click="reg">立即注册</a>
    </div>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css";
import statusBar from "@/components/statusBar.vue";
import myButton from "@/components/button.vue";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      pushmsg: {},
    };
  },
  methods: {
    join() {
      let that = this
      this.pushmsg = {
        account: this.phone,
        pwd: this.pwd,
      };
      this.$request({
        url: "users/logincheck",
        method: "post",
        params: this.pushmsg,
      }).then((res) => {
        console.log(res);
        console.log(res.data.token);
        that.$store.commit("getmyimg",res.data.table.imgurl);
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("uid", res.data.table.id);
        console.log(res.data)
        if (res.data.token) {
          this.$message.success('登录成功')
          if(this.$route.meta.myFrom.path!='/')
          {
            if(this.$route.meta.myFrom.path=='/Reg')
            {
              this.$router.push('/index');
            }
            else{
              this.$router.push(this.$route.meta.myFrom);
            }
          }
          else{
            this.$router.push('/index');
          }
        }
      });
      // this.$router.push('/Index')
    },
    reg() {
      this.$router.push("/Reg");
    },
  },
  components: {
    statusBar,
    myButton
  },
};
</script>

<style lang="less" scoped>
.Login {
  header {
    height: 230px;
    img {
      margin-left: 50%;
      transform: translateX(-50%);
      padding-top: 60px;
      width: 200px;
      height: 150px;
    }
  }
  .content {
    height: 460px;
    background: whitesmoke;
    width: 100%;
    .title {
      display: block;
      font-weight: 700;
      text-align: center;
      padding-top: 10px;
      font-size: 26px;
    }
    .input {
      margin-top: 50px;
      margin-left: 50%;
      transform: translateX(-50%);
      height: 100px;
      width: 300px;
      border: 1px solid gray;
      border-radius: 15px;
      .line {
        margin-left: 50%;
        transform: translateX(-50%);
        display: block;
        width: 270px;
        height: 1px;
        background: gray;
      }
      input {
        background: whitesmoke;
        border: none;
        outline: none;
        height: 49px;
        width: 200px;
        margin-left: 10px;
        font-size: 16px;
      }
      .wjmima {
        font-size: 14px;
        color: red;
      }
    }
    button {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 300px;
      height: 50px;
      border-radius: 25px;
      background: red;
      opacity: 0.35;
      border: none;
      color: white;
      font-size: 15px;
      margin-top: 20px;
    }
    p {
      font-size: 16px;
      text-align: center;
      margin-top: 120px;
    }
    a {
      display: block;
      text-align: center;
      margin-top: 15px;
      width: 100%;
      text-decoration: none;
      font-size: 14px;
      color: orange;
      opacity: 0.75;
    }
  }
}
</style>