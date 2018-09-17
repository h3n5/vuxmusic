import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu';
import scroll from './scroll'
import music from './music'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menu,
        scroll,
        music
    },
})