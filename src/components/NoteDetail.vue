<template>
  <div id="login">
    <h1>{{ pageName }}：{{ $route.params.noteId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pageName = ref("这是笔记本详情页");
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
