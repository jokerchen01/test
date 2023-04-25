<template>
  <section class="login_page">
    <transition name="login">
      <div class="login_box" v-show="isShowLogin">
        <div class="title">金牛区事件处置系统</div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <div class="input_box">
            <img src="~@/assets/images/person_icon.png" class="img" />
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名">
              </el-input>
            </el-form-item>
          </div>
          <div class="input_box">
            <img src="~@/assets/images/password_icon.png" class="img" />
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                :show-password="true"
                type="password"
              ></el-input>
            </el-form-item>
          </div>
          <!--   <div class="codeBox">
          <div class="code_box">
            <img src="~@/assets/images/code_icon.png" class="img" />
            <el-form-item prop="code">
              <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            </el-form-item>
          </div>
          <div class="image_box" @click="changeCode">
            <img :src="codeImg" alt="" />
          </div>
        </div> -->
        </el-form>
        <div class="active_box" @click="handleLogin" v-loading="loading">
          <div class="lable">登录</div>
        </div>
       <!--  <div class="active_box" @click="goRegister" v-loading="loading">
          <div class="lable">去注册</div>
        </div> -->
      </div>
    </transition>
  <!--   <transition name="register">
      <div class="login_box" v-show="isShowRegister">
        <div class="title">金牛区城运中心</div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <div class="input_box">
            <img src="~@/assets/images/person_icon.png" class="img" />
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="学号">
              </el-input>
            </el-form-item>
          </div>
          <div class="input_box">
            <img src="~@/assets/images/password_icon.png" class="img" />
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                :show-password="true"
                type="password"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="active_box" v-loading="loading">
          <div class="lable">注册</div>
        </div>
        <div class="active_box" @click="goLogin" v-loading="loading">
          <div class="lable">去登陆</div>
        </div>
      </div>
    </transition> -->
  </section>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "网格员",
        password: "123456",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      isShowLogin: true,
      isShowRegister: false,
    };
  },
  watch: {},
  methods: {
   /*  showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }, */
    handleLogin() {

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$message({
                message: "登陆成功！",
                type: "success",
              });
         /*      this.$store.commit('user/SET_NAME',this.loginForm.username) */
              this.$router.push({ path: "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
              this.$message.error("error submit!!");
            });
        } else {
          this.$message.error("error submit!!");

          return false;
        }
      });
    },
   /*  goRegister() {
      this.isShowLogin = !this.isShowLogin;
      setTimeout(() => {
        this.isShowRegister = !this.isShowRegister;
      }, 1000);
    }, */
 /*    goLogin() {
      this.isShowRegister = !this.isShowRegister;

      setTimeout(() => {
        this.isShowLogin = !this.isShowLogin;
      }, 1000);
    }, */
  },
};
</script>


<style lang="scss" scoped>
.login_page {
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/bg.png) no-repeat;
  background-size: 120% 100%;
  height: 100%;
  width: 100%;
  .login_box {
    position: fixed;
    top: 30%;
    left: 60%;
    background: url(~@/assets/images/login_box.png) no-repeat;
    background-size: 100% 100%;
    width: 400px;
    height: 460px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 60px;
      margin-bottom: 90px;
      height: 20px;
      font-size: 26px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #ffffff;
      line-height: 42px;
      -webkit-background-clip: text;
      //   -webkit-text-fill-color: transparent;
    }
    .input_box {
      background: url(~@/assets/images/input_box.png) no-repeat;
      background-size: 100% 100%;
      width: 350px;
      height: 50px;
      margin-bottom: 45px;
      position: relative;
      .img {
        position: absolute;
        top: 50%;
        left: 22px;
        transform: translate(0, -50%);
      }
    }
    .codeBox {
      margin-bottom: 60px;
      display: flex;
      align-items: center;
      .code_box {
        background: url(~@/assets/images/code_box.png) no-repeat;
        background-size: 100% 100%;
        width: 350px;
        height: 50px;
        margin-right: 18px;
        position: relative;
        .img {
          position: absolute;
          top: 50%;
          left: 22px;
          transform: translate(0, -50%);
        }
      }
      .image_box {
        background: url(~@/assets/images/image_box.png) no-repeat;
        background-size: 100% 100%;
        width: 180px;
        height: 75px;
        cursor: pointer;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }
    .active_box {
      cursor: pointer;
      background: url(~@/assets/images/active_box.png) no-repeat;
      background-size: 100% 100%;
      width: 320px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .lable {
        height: 36px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        line-height: 36px;
        letter-spacing: 3px;
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
      }
    }
  }
}
::v-deep {
  .el-input__inner,
  .el-date-editor.el-input__inner {
    background: none;
    border: none;
    height: 55px;
    font-size: 24px;
    padding-left: 75px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    line-height: 24px;
  }
  .el-form-item__error {
    font-size: 22px;
  }
  .el-input {
    input {
      background-color: transparent;
      &:-webkit-autofill,
      textarea:-webkit-autofill,
      select:-webkit-autofill {
        -webkit-text-fill-color: #fff !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
      }
      // &::-webkit-autofill::first-line {
      //   font-size: 22px !important;
      // }
    }
  }
}
.login-enter-active,
.login-leave-active {
  transition: all 0.5s ease;
}
.login-enter {
  opacity: 0;
  transform: translateX(400px);
}
.login-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.login-leave {
  opacity: 1;
  transform: translateX(0);
}
.login-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.register-enter-active,
.register-leave-active {
  transition: all 0.5s ease;
}
.register-enter {
  opacity: 0;
  transform: translateX(-400px);
}
.register-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.register-leave {
  opacity: 1;
  transform: translateX(0);
}
.register-leave-to {
  opacity: 0;
  transform: translateX(-400px);
}
</style>

