<template>
  <div id="login">
    <h1>{{ pageName }}： {{ $route.params.noteId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/api/index";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const pageName = ref("这是回收站笔记详情页");
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
