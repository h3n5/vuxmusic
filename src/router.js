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
      path: '/music',
      name: 'music',
      meta: {
        sort: 2
      },
      component: () =>
        import('./views/Pages/music.vue')
    },
    {
      path: '/accout',
      name: 'accout',
      meta: {
        sort: 3
      },
      component: () =>
        import('./views/Pages/accout.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import('./views/Pages/mSearch/search.vue')
    },
    {
      path: '/play/:id',
      name: 'play',
      props: true,
      component: () =>
        import('./components/dPlay/play.vue')
    },
    {
      path: '/SongListDetail/:id',
      name: 'SongListDetail',
      props: true,
      component: () =>
        import('./views/Pages/SongListDetail')
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