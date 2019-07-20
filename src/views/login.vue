<template>
  <div class="login">
    <div class="login-Container">
      <div class="h-font">
        <h2>千寻谷</h2>
      </div>

      <el-form
        :model="userInfo"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userInfo.username" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userInfo.password"
            auto-complete="off"
            style="width:300px"
            @keydown.native="gokeydown"
          ></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-form-item>
            <el-button type="primary" size="mini" @click="login">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="register">注册</el-button>
          </el-form-item>
        </div>

        <div>
          <input id="codeinput" />
          <span id="loginspan" @click="code">点击获取验证码</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      yzmcode: "",
      userInfo: {},
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "密码最大长度为20，最小长度为5",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户名最大长度为20，最小长度为5",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    register() {
      this.$notify({
        title: "提醒",
        message: "暂时未开放注册功能",
        type: "warning"
      });
    },

    login() {
      this.$refs["ruleForm"].validate((val, obj) => {
        if (val) {
          var oInput = document.getElementById("codeinput");
          console.log(oInput.value)
          if (this.yzmcode === oInput.value) {
            console.log("232")
            this.$http.post(this.$apis.signIn, this.userInfo).then(resp => {
              if (resp.success) {
                var token = resp.token;
                var username = resp.data.userInfo.username;
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                this.$router.push(
                  this.$route.query.redirector
                    ? this.$route.query.redirector
                    : "/Home"
                );
              } else {
                this.$message.error("登录失败，用户名或密码出错");
              }

            });
          } else{
            this.$message.error("验证码有误，请注意大小写");
          }
        }
      });
    },

    //键盘enter登录事件
    gokeydown(event) {
      if (event.keyCode == 13) {
        this.login();
      }
    },

     //获取验证码信息 
    code() {
      this.$http.get(this.$apis.checkDynamicCode, this.userInfo).then(resp => {
        var code = document.getElementById("loginspan");
        code.innerHTML = resp.data.data;
        this.yzmcode = resp.data.text;
        console.log(this.yzmcode)
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-Container {
    width: 500px;
    height: 300px;
    background: white;
    box-shadow: 0 0 10px 10px lightgray;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
    }
  }
  #loginspan {
    border: 1px solid black;
  }
}
</style>