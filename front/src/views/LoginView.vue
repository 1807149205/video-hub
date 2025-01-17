<script lang="ts" setup>
import router from '@/router';
import { reactive } from 'vue'
import { showNotify } from 'vant';
import HttpUtil from '@/utils/HttpUtil';

const form = reactive({
    username: '',
    password: ''
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
  console.log(resp);
  
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