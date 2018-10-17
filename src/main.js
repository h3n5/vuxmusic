import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: 'img/player-bar.png',
  loading: 'img/player-bar.png',
  attempt: 1
})
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {
  name: 'v-touch'
})

VueTouch.config.swipe = {

  threshold: 100 //手指左右滑动距离

}



Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')