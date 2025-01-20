<script lang="ts" setup>
import router from '@/router';
import { reactive } from 'vue'
import { showNotify } from 'vant';
import HttpUtil from '@/utils/HttpUtil';
import { useUserStore } from '@/stores/userStore';
import httpUtil from "@/utils/HttpUtil";

const userStore = useUserStore();

const form = reactive({
    username: 'weizhilong',
    password: 'wzlwzl200114'
})

const login = async () => {
  if (!form.username || !form.password) {
    showNotify({
      message: '请输入内容',
      type: 'warning'
    })
    return ;
  }
  const resp = await HttpUtil.post('/user/login', form);
  if (resp.code === '200') {
    showNotify({
      message: '登录成功',
      type: 'success'
    })
    userStore.isLogin = true;
    await httpUtil.addToken(resp.data);
    await router.push('/');
    localStorage.setItem('token', resp.data);
  } else {
    showNotify({
      message: resp.msg,
      type: 'danger'
    })
  }
}

</script>

<template>
<van-nav-bar
  title="登录"
  left-text="返回"
  left-arrow
  @click-left="router.back()"
/>
<van-cell-group inset style="margin-top: 1rem;">
  <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" />
  <van-field v-model="form.password" label="密码" placeholder="请输入用户名" type="password" />
  <van-button block @click="login" type="primary">登录</van-button>
</van-cell-group>
<div style="display: flex;flex-direction: row-reverse;margin-right: 1rem;margin-top: 1rem;">
  <van-button size="small" @click="router.push('/register')">点击注册</van-button>
</div>
</template>

<style scoped>

</style>