<script setup lang="ts">

import router from "@/router";
import {onMounted, ref} from "vue";
import HttpUtil from "@/utils/HttpUtil.ts";
import {showNotify} from "vant";

const actionOpen = ref('');
const tagTree = ref([]);
const pActionShow = ref(false);
const openPId = ref('');
const cActionShow = ref(false);
const pTagName = ref('');

const loadTags = async () => {
  const { data, code } = await HttpUtil.get('/videoTag/getAllTag');
  if (code === '200') {
    tagTree.value = data;
  }
}

const addTag = async (tagName: string, pId: string) => {
  const { data, code } = await HttpUtil.post('/videoTag/saveTag', {
    tagName, pId
  });
  if (code === '200') {
    showNotify({
      message: '添加成功',
      type: 'success'
    })
    pTagName.value = '';
    pActionShow.value = false;
    cActionShow.value = false;
    await loadTags();
  } else {
    showNotify({
      message: '添加失败',
      type: 'danger'
    })
  }
}


onMounted(async () => {
  await loadTags();
})

</script>

<template>
  <van-nav-bar
      title="标签管理"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
  />
  <van-action-sheet v-model:show="pActionShow" title="添加父标签">
    <van-field v-model="pTagName" placeholder="输入标签名称"/>
    <van-button round type="primary" @click="addTag(pTagName, '-1')" block>保存</van-button>
  </van-action-sheet>
  <van-action-sheet v-model:show="cActionShow" title="添加子标签">
    <van-field v-model="pTagName" placeholder="输入标签名称"/>
    <van-button round type="primary" @click="addTag(pTagName, openPId)" block>保存</van-button>
  </van-action-sheet>

  <van-collapse v-model="actionOpen" accordion>
    <van-collapse-item :title="tag.tagName" v-for="tag in tagTree" :key="tag.id">
      <div style="display: flex; flex-wrap: wrap; gap: 10px">
        <van-tag v-for="child in tag.children" :key="child.id" type="primary">{{ child.tagName }}</van-tag>
      </div>
      <van-button size="small" @click="() => { cActionShow = true; openPId = tag.id }">添加子标签</van-button>
    </van-collapse-item>
  </van-collapse>

  <van-button block @click="pActionShow = true">添加父标签</van-button>

</template>

<style scoped>

</style>