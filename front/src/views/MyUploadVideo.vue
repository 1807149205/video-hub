<script setup lang="ts">

import router from "@/router";
import {onMounted, ref} from "vue";
import HttpUtil from "@/utils/HttpUtil.ts";
import RandomImgUtils from "@/utils/RandomImgUtils.ts";
import DateUtils from "../utils/DateUtils.ts";

const videos = ref([]);

const loadVideos = async () => {
  const { data, code } = await HttpUtil.get('/video/getCurrentUserVideo');
  if (code === '200') {
    videos.value = data;
  }
}

onMounted(async () => {
  await loadVideos();
})

</script>

<template>
  <van-nav-bar
      title="我的上传"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
  />
  <template v-if="videos.length > 0">
    <div v-for="video in videos" :key="video.id" style="margin-top: 15px; height: 130px">
      <van-cell-group inset>
        <div style="display: flex">
<!--          图片-->
          <div style="width: 35%;height: 128px">
            <img :src="RandomImgUtils.randomVideoAPI('ecy')"
                 width="100%"
                 style="height: 130px;object-fit: cover;border-radius: var(--van-cell-group-inset-radius) 0 0 var(--van-cell-group-inset-radius);"/>
          </div>
<!--          信息-->
          <div style="width: 65%;padding-left: 1rem;padding-top: 5px;padding-bottom: 5px;">
            <div style="height: 30%">
              {{ video.videoName }}
            </div>
            <div style="height: 50%;font-size: 12px; color: rgb(160,160,160)">
              {{ video.videoDesc }}
            </div>
            <div style="height: 20%; font-size: 12px; color: rgb(140,140,140)">
              {{ DateUtils.dateTimeToString(video.createDate) }}
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>
  </template>
  <template v-else>
    <van-empty description="暂无上传视频"></van-empty>
  </template>
</template>

<style scoped>

</style>