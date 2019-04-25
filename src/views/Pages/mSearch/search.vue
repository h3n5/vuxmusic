<template>
  <div>
    <v-head>
      <template #left>
        <i></i>
      </template>
      <template #center>
        <div class="searchinput">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
          <input
            type="text"
            placeholder="请输入邮箱"
            :value="search"
            @input="updatesearch"
            @click.enter="searchClick"
          >
        </div>
      </template>
      <div slot='right' class="cancel" @click="back">取消</div>
    </v-head>
    <!-- 热门搜索 -->
    <hotsearch @goSearch="searchClick"></hotsearch>
    <!-- 搜索列表 -->
    <searchlist :songs="songs"></searchlist>
  </div>
</template>

<script>
import hotsearch from './hot-search.vue'
import searchlist from './search-list.vue'
import { searchMusic } from '@/api/api'
import { mapState } from 'vuex'
import lodash from '@/util'
import vHead from '@/components/vHead'
export default {
  name: 'search',
  components: {
    searchlist,
    hotsearch,
    vHead
  },
  computed: {
    ...mapState('music', ['search'])
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    updatesearch: lodash.throttle(function(e) {
      this.searchClick()
      this.$store.commit('music/updateMessage', e.target.value)
    }, 1000),
    async searchClick() {
      //console.log(this.search);
      let res = await searchMusic(this.search)
      //console.log(res.data.result.songs);
      this.songs = res.data.result.songs
    },
    back() {
      this.$router.push('/index')
    }
  }
}
</script>

<style lang='less' scoped>
.cancel {
  padding-left: 5px;
}
.searchinput {
  flex: auto;
  height: 100%;
  position: relative;
  .icon {
    position: absolute;
    color: #ddd;
    left: 10px;
    font-size: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: rgba(221, 221, 221, 0.37);
    border-radius: 15px;
    padding: 0 30px;
    color: #ddd;
  }
}
</style>
