import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SearchView from '@/views/SearchView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VideoUploadView from "@/views/VideoUploadView.vue";
import VideoDetailView from '@/views/VideoDetailView.vue'
import MyUploadVideo from "@/views/MyUploadVideo.vue";
import TagEditView from "@/views/TagEditView.vue";

const router = createRouter({
  history: createWebHistory('/video-hub/'),
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
    },
    {
      path: '/videoDetail',
      component: VideoDetailView
    },
    {
      path: '/myUploadVideo',
      component: MyUploadVideo
    },
    {
      path: '/tagEdit',
      component: TagEditView
    }
  ],
})

export default router
