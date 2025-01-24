<script lang="ts" setup>
import router from '@/router';
import { reactive, ref } from 'vue'
import {showNotify} from "vant";
import HttpUtil from "@/utils/HttpUtil.ts";

const repeatPassword = ref('');

const form = reactive({
    username: '',
    password: ''
})

const register = async () => {
  if (!form.username || !form.password || !repeatPassword.value) {
    showNotify({
      message: '请输入内容'
    })
    return;
  }
  if (form.password !== repeatPassword.value) {
    showNotify({
      message: '两次密码输入不一致'
    })
    return;
  }
  const {code} = await HttpUtil.post('/user/save', form);
  if (code === '200') {
    showNotify({
      message: '注册成功',
      type: 'success'
    })
    await router.push('/login');
  } else {
    showNotify({
      message: '注册失败',
      type: 'danger'
    })
  }
}

</script>

<template>
<van-nav-bar
  title="注册"
  left-text="返回"
  left-arrow
  @click-left="router.back()"
/>
<van-cell-group inset style="margin-top: 1rem;">
  <van-field required v-model="form.username" label="用户名" placeholder="请输入用户名" />
  <van-field required v-model="form.password" label="密码" placeholder="请输入用密码" type="password" />
  <van-field required v-model="repeatPassword" label="再次输入密码" placeholder="请再次输入密码" type="password" />
  <van-button block @click="register" type="primary">登录</van-button>
</van-cell-group>
</template>

<style scoped>

</style>