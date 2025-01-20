import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SearchView from '@/views/SearchView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VideoUploadView from "@/views/VideoUploadView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/settings',
      component: SettingsView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/videoUpload',
      component: VideoUploadView
    }
  ],
})

export default router
