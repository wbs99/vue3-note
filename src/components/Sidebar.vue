<template>
  <div class="sidebar">
    <Avatar />
    <div class="icons">
      <router-link to="/note/1"> <Icon name="notebook" /> </router-link>
      <router-link to="/notebooks"> <Icon name="notebook" /></router-link>
      <router-link to="/trash/2"> <Icon name="trash" /></router-link>
    </div>

    <div class="logout" @click="onLogout"><Icon name="logout" /></div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import Api from "@/api/index";
import { useRouter } from "vue-router";

const router = useRouter();

function onLogout() {
  Api.logout()
    .then(res => {
      router.push({ path: "/login" });
    })
    .catch(error => {});
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
  > .icons {
    margin-top: 15px;
    .icon {
      width: 32px;
      height: 32px;
    }
    > a {
      padding: 6px 0;
      display: block;
    }
  }
  > .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
}

.icons .router-link-active {
  background-color: #5e6266;
}
</style>
