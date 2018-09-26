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
      component: (resolve) => require(['./views/index.vue'], resolve),
    },
    {
      path: '/video',
      name: 'video',
      component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
      path: '/music',
      name: 'music',
      meta: {
        sort: 2
      },
      component: (resolve) => require(['./views/music.vue'], resolve)
    },
    {
      path: '/friend',
      meta: {
        sort: 3
      },
      name: 'friend',
      component: (resolve) => require(['./views/friend.vue'], resolve)
    },
    {
      path: '/accout',
      name: 'accout',
      meta: {
        sort: 4
      },
      component: (resolve) => require(['./views/accout.vue'], resolve)
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