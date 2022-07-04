<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <Transition name="slide">
              <div v-bind:class="{ show: isShowRegister }" class="register">
                <input
                  type="text"
                  v-model="register.username"
                  placeholder="用户名"
                />
                <input
                  type="password"
                  v-model="register.password"
                  @keyup.enter="onRegister"
                  placeholder="密码"
                />
                <p v-bind:class="{ error: register.isError }">
                  {{ register.notice }}
                </p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </Transition>
            <h3 @click="showLogin">登录</h3>
            <Transition name="slide">
              <div v-bind:class="{ show: isShowLogin }" class="login">
                <input
                  type="text"
                  v-model="login.username"
                  placeholder="输入用户名"
                />
                <input
                  type="password"
                  v-model="login.password"
                  @keyup.enter="onLogin"
                  placeholder="密码"
                />
                <p v-bind:class="{ error: login.isError }">
                  {{ login.notice }}
                </p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import Api from "@/api/index";
import { useRouter } from "vue-router";

const router = useRouter();

const isShowLogin = ref(true);
const isShowRegister = ref(false);
const login = reactive({
  username: "",
  password: "",
  notice: "输入用户名和密码",
  isError: false,
});
const register = reactive({
  username: "",
  password: "",
  notice: "创建账号后，请记住用户名和密码",
  isError: false,
});

function showLogin() {
  isShowLogin.value = true;
  isShowRegister.value = false;
}
function showRegister() {
  isShowLogin.value = false;
  isShowRegister.value = true;
}
function onRegister() {
  const result = validUsername(register.username);
  if (!result.isValid) {
    register.isError = true;
    register.notice = result.notice;
    return;
  }
  const result2 = validPassword(register.password);
  if (!result2.isValid) {
    register.isError = true;
    register.notice = result2.notice;
    return;
  }
  register.isError = false;
  register.notice = "";
  Api.register({
    username: register.username,
    password: register.password,
  })
    .then(res => {
      register.isError = false;
      register.notice = "";
      router.push({ path: "notebooks" });
    })
    .catch(error => {
      register.isError = true;
      register.notice = error.msg;
    });
}
function onLogin() {
  const result = validUsername(login.username);
  if (!result.isValid) {
    login.isError = true;
    login.notice = result.notice;
    return;
  }
  const result2 = validPassword(login.password);
  if (!result2.isValid) {
    login.isError = true;
    login.notice = result2.notice;
    return;
  }

  login.isError = false;
  login.notice = "";
  Api.login({ username: login.username, password: login.password })
    .then(res => {
      login.isError = false;
      login.notice = "";
      router.push({ path: "notebooks" });
    })
    .catch(error => {
      login.isError = true;
      login.notice = error.msg;
    });
}
function validUsername(username: string) {
  return {
    isValid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
    notice: "用户名3~15个字符，仅限于字母数字下划线中文",
  };
}
function validPassword(password: string) {
  return {
    isValid: /^.{6,16}$/.test(password),
    notice: "密码长度为6~16个字符",
  };
}
onMounted(() => {
  Api.isLogin();
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #36bc64
      url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center
      no-repeat;
    background-size: contain;
  }
  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      margin-top: -1px;
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }
    .login,
    .register {
      padding: 0px 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height 0.4s;

      &.show {
        height: 193px;
      }
      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }
      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }
      .error {
        color: red;
      }
    }
    .login {
      border-top: 0;
    }
  }
}
</style>
