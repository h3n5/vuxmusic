<template>
  <div class="main">
    <v-head></v-head>
    <!-- 标签 -->
    <vtab v-model="index" :list="mainTab" auto></vtab>
    <!-- 轮播 + 推荐 -->
    <scroll class="wrapper" ref="scroll" @pullingDown="pullingDown" @pullingUp="pullingUp">
      <component
        :is="tabIndex"
        @pulldowncallback="pulldowncallback"
        @pullupcallback="pullupcallback"
        @loadEnd=" loadEnd = false"
      ></component>
    </scroll>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import vHead from '@/components/vHead'
import commend from '@/views/Commend'
import songList from '@/views/SongList'
import ranking from '@/views/Ranking'
import scroll from '@/components/Scroll/index'
import vtab from '@/components/vtab'
export default {
  name: 'index',
  components: {
    vHead,
    commend,
    songList,
    ranking,
    scroll,
    vtab
  },
  data() {
    return {
      list: ['commend', 'songList', 'ranking'],
      tabIndex: 'commend',
      loadEnd: true,
      index: 1
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.index = this.mainIndex
      this.tabIndex = this.list[this.index]
    })
  },
  watch: {
    index(v){
      this.tabIndex = this.list[v]
    },
    tabIndex(v) {
      this.Set_mainIndex(this.mainTab.findIndex(item => item.type === v))
    }
  },
  computed: {
    ...mapState('menu', ['mainTab', 'mainIndex'])
  },
  methods: {
    ...mapMutations('scroll', [
      'pullingDownFlagChange',
      'pullingUpFlagChange',
      'tabIndexChange'
    ]),
    ...mapMutations('menu', ['Set_mainIndex']),
    pullingDown() {
      if (!this.loadEnd) {
        this.loadEnd = !this.loadEnd
      }
      this.pullingDownFlagChange()
      this.tabIndexChange(this.tabIndex)
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(false)
      })
    },
    pullingUp() {
      if (this.loadEnd) {
        this.pullingUpFlagChange()
        this.tabIndexChange(this.tabIndex)
      }
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(this.loadEnd)
      })
    },
    pulldowncallback() {
      this.$refs.scroll._reboundPullDown()
      this.pullingDownFlagChange(false)
    },
    pullupcallback() {
      // this.$refs.scroll._PullUpFinish()
      this.pullingUpFlagChange(false)
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  display: flex;
  flex-flow: column nowrap;
  .wrapper {
    flex: 1;
  }
}
</style>
