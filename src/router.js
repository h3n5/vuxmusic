import Vue from 'vue'
import Router from 'vue-router'
import store from "./vuex"


Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      meta: {
        sort: 1
      },
      component: () =>
        import('./views/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import('./views/index.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () =>
        import('./views/index.vue')
    },
    {
      path: '/music',
      name: 'music',
      meta: {
        sort: 2
      },
      component: () =>
        import('./views/music.vue')
    },
    {
      path: '/friend',
      meta: {
        sort: 3
      },
      name: 'friend',
      component: () =>
        import('./views/friend.vue')
    },
    {
      path: '/accout',
      name: 'accout',
      meta: {
        sort: 4
      },
      component: () =>
        import('./views/accout.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import('./components/mSearch/search.vue')
    },
    {
      path: '/play/:id',
      name: 'play',
      component: () =>
        import('./components/dPlay/play.vue')
    },
    {
      path: '/SongListDetail/:id',
      name: 'SongListDetail',
      component: () =>
        import('./views/SongListDetail')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.fullPath.includes("/play")) {
    store.commit("menu/toggleFoot", false)
  } else {
    store.commit("menu/toggleFoot", true)
  }
  next()
})
export default router