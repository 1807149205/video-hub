<script setup lang="ts">
import {ref} from 'vue'
import router from './router';

const tabbarActive = ref('home');
const tabbarChangeHandle = (index: string) => {
    router.push(`/${index}`);
}
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
