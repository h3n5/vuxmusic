import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
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
      component: (resolve) => require(['./views/music.vue'], resolve)
    },
    {
      path: '/friend',
      name: 'friend',
      component: (resolve) => require(['./views/friend.vue'], resolve)
    },
    {
      path: '/accout',
      name: 'accout',
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
  next()
})
export default router