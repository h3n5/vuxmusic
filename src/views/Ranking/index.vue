<template>
  <div class="mContent">
    <div class="songList">
      <div class="listItem">
        <div class="title">
          <p class="title-word">云音乐官方版</p>
          <p class="random"></p>
        </div>
        <rankingList
          @click.native="$router.push('/SongListDetail/' + item.id)"
          v-for="(item, index) in songs"
          :key="index"
          class="content"
          :song="item"
        ></rankingList>
      </div>
    </div>
  </div>
</template>
<script>
import { toplist } from '@/api/api'
import rankingList from '@/components/rankingList'
import { ButtonTab, ButtonTabItem } from 'vux'
export default {
  name: 'mContentRanking',
  data() {
    return {
      imgList: [],
      songs: []
    }
  },
  components: {
    rankingList,
    ButtonTab,
    ButtonTabItem
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      toplist().then(res => {
        this.songs = res.data.list.slice(0, 4)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.mContent {
  .bannerImg {
    height: 100%;
  }
  .tabselected {
    color: #000;
  }
  .songList {
    padding: 5px 5px;
    .tag {
      padding: 15px 40px;
      .icon {
        height: 100%;
        vertical-align: top;
        margin-right: 5px;
      }
    }

    .listItem {
      display: flex;
      flex-flow: row wrap;
      padding: 3px;
      padding-bottom: 10px;
      .title {
        padding-bottom: 15px;
        display: flex;
        .title-word {
          padding-left: 10px;
          flex: 1;
        }
        .random {
          flex: 1;
          text-align: right;
        }
      }
      > div {
        flex-basis: 100%;
        padding: 0 3px;
      }
    }
  }
}
</style>
