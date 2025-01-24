<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import HttpUtil from '@/utils/HttpUtil';
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const baseUrl = ref('');
const changeBaseUrlActionSheetShow = ref(false);
const user = ref({
  id: '',
  username: ''
});

const setBaseUrlHandle = () => {
    HttpUtil.setBaseUrl(baseUrl.value);
    changeBaseUrlActionSheetShow.value = false;
    showToast({
        message: '设置成功！'
    })
    window.localStorage.setItem('baseUrl', baseUrl.value);
}

const loadUserInfo = async () => {
  const resp = await HttpUtil.get('/user/getCurrentUser');
  if (resp.code === '200') {
    user.value = resp.data;
  } else {
    userStore.isLogin = false;
  }
}

const logout = () => {
  localStorage.removeItem('token');
  userStore.isLogin = false;
}

onMounted(async () => {
    baseUrl.value = await HttpUtil.getBaseUrl();
    await loadUserInfo();
})

</script>

<template>

<van-action-sheet v-model:show="changeBaseUrlActionSheetShow" title="设置服务器">
    <van-cell-group inset style="margin-top: 1rem;">
        <van-field v-model="baseUrl" label="服务器url" placeholder="服务器url" />
        <van-button block @click="setBaseUrlHandle" type="primary">设置</van-button>
    </van-cell-group>
</van-action-sheet>


<div style="height: 100px; padding: 2rem;">
    <div style="border-radius: 1rem; border: #e3e3e3 solid 1px;height: 100%;display: flex;flex-direction: column;justify-content: center;">
        <template v-if="userStore.isLogin">
          <div style="display: flex;padding-left: 1rem">
            <div>
              <van-image
                  round
                  width="3rem"
                  height="3rem"
                  fit="cover"
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
            </div>
            <div style="margin-left: 1rem">
              <span style="line-height: 3rem; font-size: 17px; color: rgb(100,100,100)">{{ user.username }}</span>
            </div>
          </div>
        </template>
        <template v-else>
            <div @click="router.push('/login')" style="height: 100%;">
                <div style="font-weight: bold; text-align: center;margin-top: 1rem;">当前未登录，点击登录</div>
            </div>
        </template>
    </div>
</div>

<div>

    <van-cell-group inset>
      <van-cell v-if="userStore.isLogin" title="上传视频" value="" is-link @click="router.push('/videoUpload')" icon="guide-o"/>
        <van-cell v-if="userStore.isLogin" title="我的上传" value="" is-link @click="router.push('/myUploadVideo')" icon="video-o" />
        <van-cell title="设置服务器" is-link @click="changeBaseUrlActionSheetShow = true" icon="hotel-o"/>
        <van-cell v-if="userStore.isLogin" title="登出" is-link @click="logout" icon="down"/>
    </van-cell-group>
</div>

  <div style="margin-top: 2rem;">
    <p style="text-align: center; color: rgb(150,150,150); font-size: 13px">power by video-center 2025</p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'upload-icon';
  src: ;
}
</style>