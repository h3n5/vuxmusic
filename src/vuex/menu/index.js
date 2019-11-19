import { getAllTag } from '@/api/api'
import CssVariable from '@/utils/cssvariable'

let cssFactory = new CssVariable()

const state = {
  mainTab: [
    {
      type: 'commend',
      name: '个性推荐'
    },
    {
      type: 'songList',
      name: '歌单'
    },
    {
      type: 'ranking',
      name: '排行榜'
    }
  ],
  mainContentTab: [
    { name: '每日推荐', icon: 'icon-calendar', route: '/recomment' },
    { name: '私人FM', icon: 'icon-FM1', route: '/recomment' },
    { name: '排行榜', icon: 'icon-ic_mymatch_ranking', route: '/recomment' },
    { name: '电台', icon: 'icon-FM', route: '/recomment' },
    { name: '直播', icon: 'icon-moviefilter', route: '/recomment' }
  ],
  mainTag: [],
  showFoot: true,
  alive: ['search', 'Search'],
  mainIndex: 0,
  css: {
    '--primary': '#D33A31'
  },
  color: [
    {
      name: '深色',
      value: '#24292e'
    },
    {
      name: '浅色',
      value: '#22D59C'
    },
    {
      name: '红色',
      value: '#D33A31'
    }
  ]
}
Object.keys(state.css).forEach(v => {
  cssFactory.set(v, state.css[v])
})
export default {
  namespaced: true,
  state: state,
  getters: {
    mainTab: state => {
      return state.mainTab
    },
    mainContentTab: state => {
      return state.mainContentTab
    },
    mainTag: state => {
      return state.mainTag
    }
  },
  mutations: {
    Set_mainIndex(state, value) {
      state.mainIndex = value
    },
    GET_TAG_SUCCESS(state, tags) {
      state.mainTag = tags
    },
    toggleFoot(state, value) {
      state.showFoot = value
    },
    _css(state, { key, value }) {
      state.css[key] = value
      cssFactory.set(key, value)
    }
  },
  actions: {
    async action_getAllTag({ commit }, params) {
      let res = await getAllTag(params)
      let sort = sortRandom(res.data.sub).splice(1, 3)
      //let sort = getRandomArr(res.data.sub, 3)
      commit('GET_TAG_SUCCESS', sort)
    }
  }
}

function sortRandom(arr = []) {
  return arr.sort(() => {
    return Math.random() > 0.5 ? true : false
  })
}
