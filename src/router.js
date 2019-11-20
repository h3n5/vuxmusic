import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import index from './views/index.vue'
import accout from './views/Pages/accout.vue'
import search from './views/Pages/mSearch/search.vue'
import play from './components/dPlay/play.vue'
import SongListDetail from './views/Pages/SongListDetail'
import Recomment from './views/Pages/Recomment'
let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        sort: 1
      },
      component: index
    },
    {
      path: '/accout',
      name: 'accout',
      meta: {
        sort: 3
      },
      component: accout
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/play/:id',
      name: 'play',
      props: true,
      component: play
    },
    {
      path: '/SongListDetail/:id',
      name: 'SongListDetail',
      props: true,
      component: SongListDetail
    },
    {
      path: '/recomment',
      name: 'Recomment',
      props: true,
      component: Recomment
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
export default router
