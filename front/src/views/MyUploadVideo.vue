<script setup lang="ts">

import router from "@/router";
import {onMounted, ref} from "vue";
import HttpUtil from "@/utils/HttpUtil.ts";

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
    <div v-for="video in videos" :key="video.id">
      <van-cell-group inset>
        <van-cell title="视频名称" :label="video.videoName" />
        <van-cell title="视频描述" :label="video.videoDesc" />
        <van-cell title="视频地址" :label="video.videoUrl" />
      </van-cell-group>
    </div>
  </template>
  <template v-else>
    <van-empty description="暂无上传视频"></van-empty>
  </template>
</template>

<style scoped>

</style>