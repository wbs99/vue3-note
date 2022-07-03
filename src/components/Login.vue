<template>
  <div id="login">
    <h1>{{ pageName }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pageName = ref("这是login");
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
