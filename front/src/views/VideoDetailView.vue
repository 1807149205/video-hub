<script setup lang="ts">
import router from '@/router';
import DateUtils from '@/utils/DateUtils';
import HttpUtil from '@/utils/HttpUtil';
import { onMounted, ref } from 'vue';

const videoId = ref('');
const videoInfo = ref({
    video: {
        videoName: '',
        videoUrl: '',
        createDate: '',
        videoDesc: ''
    },
    tagNames: []
});

const laodVideo = async () => {
    const { code, data } = await HttpUtil.get(`/video/getById?videoId=${videoId.value}`);
    if (code === '200') {
        videoInfo.value = data;
    }
}

onMounted(async () => {
    videoId.value = router.currentRoute.value.query.videoId as string;
    await laodVideo();
})
</script>

<template>
<van-nav-bar
  :title="videoInfo.video.videoName"
  left-text="返回"
  left-arrow
  @click-left="router.back()"
/>
<div>
    <video :src="videoInfo.video.videoUrl" controls style="width: 100%;"></video>
</div>
<div class="cardContainer">
    <div class="cardContent">
        <div class="cardTitle">视频标签</div>
        <div style="margin-top: 10px;">
            <div 
                style="display: flex; flex-wrap: wrap; gap: 10px;margin-top: 10px;" 
                v-if="videoInfo.tagNames.length !== 0">
                <div v-for="tag in videoInfo.tagNames">
                    <van-tag color="#7232dd" plain>{{ `#${tag}` }}</van-tag>
                </div>
            </div>
            <div v-else>
                <div style="font-size: 12px; color: rgb(130,130,130);">该视频暂无标签</div>
            </div>
        </div>
    </div>
</div>
<div class="cardContainer">
    <div class="cardContent">
        <div class="cardTitle">视频信息</div>
        <div style="font-size: 11px; color: rgb(110, 110, 110);margin-top: 10px;">
            <div style="display: flex">
                <img src="../assets/time.png" width="20"/>
                <div style="line-height: 20px; margin-left: 5px;">
                    {{ `创建时间：${ DateUtils.dateTimeToString(videoInfo.video.createDate)}` }}
                </div>
            </div>
            <div style="display: flex;margin-top: 10px;">
                <img src="../assets/info1.png" width="20"/>
                <div style="line-height: 0px; margin-left: 5px; margin-top: 10px; color: rgb(130, 130, 130);">
                    {{ videoInfo.video.videoDesc }}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.cardContainer {
    margin-top: 10px;padding-left: 3%;padding-right: 3%;
}
.cardContent {
    background-color: #fff;padding: 10px;border-radius: 8px;
}
.cardTitle {
    font-size: 14px;color: rgb(9, 9, 9)
}
</style>