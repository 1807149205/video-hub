<script lang="ts" setup>
import router from '@/router';
import HttpUtil from '@/utils/HttpUtil';
import { onMounted, ref } from 'vue';

const videos = ref([]);
const page = ref(1);
const size = ref(10);
const randomVideoAPI = () => {
    return {
        jk: () => {
            return `https://qtkj.fun/api/mnjkt.php/${Math.random()}`;
        },
        noraml: () => {
            return `https://api.yimian.xyz/img?type=wallpaper/${Math.random()}`;
        }
    }
}

const laodVideos = async () => {
    const resp = await HttpUtil.get('/video/homePage', {
        page: page.value,
        size: size.value
    });
    if (resp.code === '200') {
        videos.value = resp.data;
        console.log(videos.value)
    }
}

onMounted(async () => {
    await laodVideos();
})
</script>

<template>
    <van-search @click="router.push('/search')" placeholder="请输入搜索关键词" />
    <div>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <div v-for="video in videos" :key="video.id" @click="router.push(`/videoDetail?videoId=${video.video.id}`)" style="height: 200px; width: calc(50% - 10px); border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                <div style="height: 150px;">
                    <img :src="randomVideoAPI().noraml()" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <div style="height: 50px; background-color: #e3e3e3; display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 12px;">{{ video.video.videoName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>