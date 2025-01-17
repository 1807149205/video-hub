<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import HttpUtil from '@/utils/HttpUtil';
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const baseUrl = ref('');
const changeBaseUrlActionSheetShow = ref(false);

const setBaseUrlHandle = () => {
    HttpUtil.setBaseUrl(baseUrl.value);
    changeBaseUrlActionSheetShow.value = false;
    showToast({
        message: '设置成功！'
    })
}

onMounted(async () => {
    baseUrl.value = await HttpUtil.getBaseUrl();
    await HttpUtil.get('/user/getAll');
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
    <div style="border-radius: 1rem; border: #e3e3e3 solid 1px;height: 100%;">
        <template v-if="userStore.isLogin">

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
        <van-cell title="单元格" value="内容" />
        <van-cell title="设置服务器" is-link @click="changeBaseUrlActionSheetShow = true"/>
    </van-cell-group>
</div>
</template>

<style scoped>

</style>