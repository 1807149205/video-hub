<script setup lang="ts">
import router from "@/router";
import {onMounted, reactive, ref} from "vue";
import httpUtil from "@/utils/HttpUtil.ts";
import {showNotify} from "vant";

const videoSaveForm = reactive({
  videoName: '',
  videoDesc: '',
  videoUrl: '',
  selectedTagIds: []
})
const videoUploaded = ref(false);
const tags = ref([]);
const uploadLoading = ref(false);

const afterRead = async (file) => {
  uploadLoading.value = true;
  // 此时可以自行将文件上传至服务器
  console.log(file);
  const formData = new FormData();
  formData.append('file', file.file);

  try {
    const resp = await httpUtil.post('/file/upload', formData, {
      'Content-Type': 'multipart/form-data'
    });
    console.log(resp,'resp');
    if (resp.code === '200') {
      videoSaveForm.videoUrl = resp.data;
      videoUploaded.value = true;
    } else {
      showNotify({
        message: resp.msg
      })
    }
  } catch (e) {
    showNotify({
      message: '上传失败'
    })
  } finally {
    uploadLoading.value = false;
  }

};

const loadTags = async () => {
  const resp = await httpUtil.get("/videoTag/getAllTag");
  if (resp.code === '200') {
    tags.value = resp.data;
  }
}

const tagClickHandler = (id: number) => {
  if (videoSaveForm.selectedTagIds.includes(id)) {
    videoSaveForm.selectedTagIds.splice(videoSaveForm.selectedTagIds.indexOf(id), 1);
  } else {
    videoSaveForm.selectedTagIds.push(id);
  }
}

const uploadVideoHandle = async () => {
  const resp = await httpUtil.post('/video/save', videoSaveForm);
  if (resp.code === '200') {
    showNotify({
      message: '添加成功！',
      type: 'success'
    })
    router.push('/');
  }
}

onMounted(async () => {
  await loadTags();
})
</script>

<template>
  <van-nav-bar
      title="上传视频"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
  />
  <div style="width: 100%; height: auto">
    <div style="width: 90%; margin-left: 5%">

    </div>
  </div>

  <div class="commonCard">
    <div style="padding-top: 10px;font-size: 13px;color: #737373">上传视频：</div>
    <template v-if="videoUploaded">
      <video controls width="100%" :src="videoSaveForm.videoUrl" />
    </template>
    <template v-else>
      <van-uploader accept="video/*" :after-read="afterRead" style="margin-top: 10px;margin-left: 1rem">
        <van-button :loading="uploadLoading" icon="plus" type="primary">上传文件</van-button>
      </van-uploader>
    </template>
  </div>

  <div class="commonCard">
    <div style="padding-top: 10px;font-size: 13px;color: #737373">视频信息：</div>
    <van-field label="视频标题" v-model="videoSaveForm.videoName"/>
    <van-field label="视频简介" v-model="videoSaveForm.videoDesc"/>
  </div>

  <div class="commonCard">
    <div style="padding-top: 10px;font-size: 13px;color: #737373">选择标签：</div>
    <div v-for="tag in tags" style="margin-top: 5px">
      <div>{{ tag.tagName }}</div>
      <div style="display: flex; flex-wrap: wrap;">
        <div v-for="tagChild in tag.children" style="margin-top: 5px">
          <div @click="tagClickHandler(tagChild.id)"
               :style="`${videoSaveForm.selectedTagIds.includes(tagChild.id) ? `background-color: #1989fa;color: white;` : ``}
              cursor: pointer;margin-left: 10px;padding: 6px; border: 1px solid #e3e3e3;border-radius: 15px;font-size: 12px`">{{ tagChild.tagName }}</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <van-button  :disabled="!videoSaveForm.videoDesc || !videoSaveForm.videoName || !videoSaveForm.videoUrl"
                block type="primary"
                @click="uploadVideoHandle">上传</van-button>
  </div>
</template>

<style scoped>
.commonCard {
  background: #fff; margin-top: 1rem; height: auto;
  padding-left: 1rem;
  padding-top: 0px;
  padding-bottom: 10px;
}
</style>