import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Shmoo from '@/components/Shmoo'
import Forum from '@/components/Forum'
import Home from '@/components/Home'
import Playlist from '@/components/Playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/shmoo',
      name: 'Shmoo',
      component: Shmoo
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist
    }
  ]
})
