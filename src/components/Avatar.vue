<template>
  <span>{{ slug }}</span>
</template>

<script setup lang="ts">
import Api from "@/api/index";
import { ref, computed, onMounted } from "vue";
import bus from "vue3-eventbus";

onMounted(() => {
  bus.on("userInfo", user => {
    username.value = user.username;
  });
  getUserInfo();
});

const username = ref("未登录");
const slug = computed(() => {
  if (username.value !== undefined) {
    return username.value.charAt(0);
  } else {
    return "未";
  }
});

function getUserInfo() {
  Api.getInfo().then(res => {
    if (res.data.isLogin) {
      username.value = res.data.username;
    }
  });
}
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
