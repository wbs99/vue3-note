<template>
  <div id="login">
    <ul>
      <li><router-link to="/note/1">笔记本1</router-link></li>
      <li><router-link to="/note/2">笔记本2</router-link></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Api from "@/api/index";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  getUserInfo();
});

function getUserInfo() {
  Api.getInfo().then(res => {
    if (!res.data.isLogin) {
      router.push({ path: "/login" });
    }
  });
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
