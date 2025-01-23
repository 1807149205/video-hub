<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import router from './router';
import axios from 'axios';
import HttpUtil from './utils/HttpUtil';
import {useUserStore} from "@/stores/userStore.ts";
import httpUtil from "./utils/HttpUtil";

const userStore = useUserStore();

const tabbarActive = ref('home');
const tabbarChangeHandle = (index: string) => {
    router.push(`/${index}`);
}

const initUserToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    userStore.isLogin = false;
  } else {
    await httpUtil.addToken(token);
    const resp = await httpUtil.get('/user/getCurrentUser');
    if (resp.code !== '200') {
      userStore.isLogin = false;
    } else {
      userStore.user = resp.data;
      userStore.isLogin = true;
    }
  }
}

watch(() => router.currentRoute.value.path, async (path) => {
    if (path === '/settings') {
      tabbarActive.value = 'settings';
    } else if (path === '/search') {
      tabbarActive.value = 'search';
    } else {
      tabbarActive.value = 'home';
    }
})

onMounted(async () => {
    const baseUrl = window.localStorage.getItem('baseUrl');
    HttpUtil.setBaseUrl(baseUrl || '');
    await initUserToken();
})

</script>

<template>
    <RouterView/>
    <van-tabbar v-model="tabbarActive" @change="tabbarChangeHandle">
        <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item name="settings" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>

</style>
