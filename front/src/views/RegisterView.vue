<script lang="ts" setup>
import router from '@/router';
import { reactive, ref } from 'vue'

const repeatPassword = ref('');

const form = reactive({
    username: '',
    password: ''
})

const register = async () => {
    console.log(form)
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
  <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" />
  <van-field v-model="form.password" label="密码" placeholder="请输入用密码" type="password" />
  <van-field v-model="repeatPassword" label="再次输入密码" placeholder="请再次输入密码" type="password" />
  <van-button block @click="register" type="primary">登录</van-button>
</van-cell-group>
</template>

<style scoped>

</style>