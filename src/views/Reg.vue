<template>
  <div class="Reg">
    <statusBar></statusBar>
    <topNav>
      <div slot="left">
        <div
          class="iconfont icon-zuobian"
          style="font-size: 28px; line-height: 47px; text-align: center;"
        ></div>
      </div>
      <div slot="mid" style="text-align: center; line-height: 30px; font-size: 18px;">注册账号</div>
      <div slot="right"></div>
    </topNav>
    <div class="content">
      <div>
        <span>上传头像</span>
        <span
          class="iconfont icon-youbian"
          style="width:20px; display:inlint-block;margin-left:120px;"
        ></span>
        <input
          type="file"
          id="upfile"
          @change="upfile"
          style="opacity: 0;width:100px;float: right; display:inline-block;"
        />
      </div>
      <div>
        <span>用户名</span>
        <input type="text" v-model="username" placeholder="请输入用户名" prop="username" />
        <span v-show="regname()" style="color:red; margin-left:0; font-size:12px">用户名不为空</span>
      </div>
      <div>
        <span>密码</span>
        <input type="text" v-model="pwd" placeholder="请输入密码" prop="password" />
        <span v-show="regpwd()" style="color:red; margin-left:0; font-size:12px">密码含大小写</span>
      </div>
      <div>
        <span>确认密码</span>
        <input type="text" v-model="rpwd" placeholder="请再次确认密码" prop="password" />
        <span v-show="regrrpwd()" style="color:red; margin-left:0; font-size:12px">密码不一致</span>
      </div>
      <div>
        <span>性别</span>
        <input type="radio" id="men" v-model="picked" value="0" />
        <label for="men">男</label>
        <input type="radio" id="women" value="1" v-model="picked" />
        <label for="women">女</label>
      </div>
      <div>
        <span>电话</span>
        <input v-model="phone" type="text" placeholder="请输入电话号码" prop="password" />
        <span v-show="regphone()" style="color:red; margin-left:0; font-size:12px">格式不正确</span>
      </div>
      <button @click="send">提交</button>
    </div>
  </div>
</template>

<script>
import "@/assets/iconfont/iconfont.css";
import myButton from "@/components/button.vue";
import statusBar from "@/components/statusBar.vue";
import topNav from "@/components/topNav.vue";
import axios from "axios";
export default {
  data() {
    return {
      picked: "0",
      username: "",
      pwd: "",
      rpwd: "",
      phone: "",
      mydata: {},
      formData: "",
      flag: false,
    };
  },
  methods: {
    regname() {
      if (this.username == "") {
        this.flag = true;
        return true;
      } else {
        this.flag = false;
        return false;
      }
    },
    regpwd() {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      if (reg.test(this.pwd)) {
        this.flag = true;
        return false;
      } else {
        this.flag = false;
        return true;
      }
    },
    regrrpwd() {
      if (this.pwd == this.rpwd) {
        return false;
        this.flag = true;
      } else {
        return true;
        this.flag = false;
      }
    },
    regphone() {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(this.phone)) {
        return false;
        this.flag = true;
      } else {
        return true;
        this.flag = false;
      }
    },
    send() {
      if (
        this.pwd == "" &&
        this.phone == "" &&
        this.rpwd == "" &&
        this.username == ""
      ) {
        this.flag = false;
        this.$message.error("注册信息不能为空");
      }
      else if (this.flag == true) {
        axios
          .post("http://39.96.60.78:1234/users/imgupload", this.formData)
          .then((res) => {
            console.log(res);
            console.log(res.data.url)
            this.mydata = {
              data: {
                username: this.username,
                gendar: this.gendar,
                phone: this.phone,
                pwd: this.pwd,
                imgurl: res.data.url,
              },
            };
            console.log(this.mydata)
            console.log("data="+this.mydata.data)
            console.log("data="+"{"+"username:"+"'"+this.mydata.data.username+"'"+","+"phone:"+"'"+this.mydata.data.phone+"'"+","+"pwd:"+"'"+this.mydata.data.pwd+"'"+","+"imgurl:"+"'"+this.mydata.data.imgurl+"'"+"}")
            axios.post("http://39.96.60.78:1234/users/register","data="+"{"+"username:"+"'"+this.mydata.data.username+"'"+","+"phone:"+"'"+this.mydata.data.phone+"'"+","+"pwd:"+"'"+this.mydata.data.pwd+"'"+","+"imgurl:"+"'"+this.mydata.data.imgurl+"'"+"}").then((res)=>{
              console.log(res);
            })
            // this.$request({
            //   url: "users/register",
            //   method: "post",
            //   params: this.mydata,
            // }).then((res) => {
            //   console.log(res);
            // });
          });
      } else {
        this.$message.error("请检查注册信息格式");
      }
      // this.$request({
      //   url: "users/imgupload",
      //   method: "post",
      //   params: this.formData,
      // }).then((res) => {
      //   console.log(res);
      //   this.mydata = {
      //     data: {
      //       username: this.username,
      //       gendar: this.gendar,
      //       phone: this.phone,
      //       pwd: this.pwd,
      //       imgurl: res.url,
      //     },
      //   };
      //   this.$request({
      //     url: "users/register",
      //     method: "post",
      //     params: this.mydata,
      //   }).then((res) => {
      //     console.log(res);
      //   });
      // });
    },
    upfile() {
      // let oFReader = new FileReader();
      // var file = document.getElementById('upfile').files[0];
      // oFReader.readAsBinaryString(file)
      // oFReader.onloadend=function(end){
      //   console.log(end.target.result)
      // }
      // let formData = new FormData();
      // formData.append("action","upresumefile")
      let formData = new FormData();
      formData.append("action", "upresumefile"); //调用它的append()方法来添加字段
      var files = document.getElementById("upfile").files;
      for (let i = 0; i < files.length; i++) {
        formData.append("file[]", files[i]);
      }
      this.formData = formData;
      console.log(this.formData);
    },
  },
  components: {
    statusBar,
    topNav,
    myButton,
  },
};
</script>

<style lang="less" scoped>
.Reg {
  background: whitesmoke;
  height: 667px;
  a {
    text-decoration: none;
    color: black;
  }
  .content {
    padding-top: 15px;
    margin-top: 60px;
    background: white;
    height: 585px;
    div {
      a {
        margin-left: 200px;
        font-size: 18px;
      }
      width: 100%;
      height: 50px;
      margin: 0 auto;
      background: white;
      span {
        margin-left: 30px;
        display: inline-block;
        height: 30px;
        width: 80px;
      }
      input {
        margin-left: 10px;
        border: none;
        outline: none;
      }
    }
    button {
      margin-left: 36px;
      width: 300px;
      height: 50px;
      border-radius: 25px;
      background: red;
      opacity: 0.35;
      border: none;
      color: white;
      font-size: 15px;
      margin-top: 180px;
    }
  }
}
</style>