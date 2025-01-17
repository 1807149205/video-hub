import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: '',
    username: '',
    password: '',
    avatar: '',
    createDate: '',
    updateDate: ''
  })

  const isLogin = ref(false);

  return { user, isLogin }
})
