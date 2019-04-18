<template>
  <div class="page">
    <cell
      is-link
      class="pr"
    >
      <img
        :src="require('@/assets/music.png')"
        alt="pic"
        class="icon"
      >
      <p class="itemName">最近播放</p>
      <span class="itemNum">{{this.history.length}}</span>
    </cell>
    <songListBlock :playlist="playlist"></songListBlock>

    <group style="margin:10px 0;">
      <cell-box
        class="pr"
        @click.native="showlogoutConfirm = true"
      >
        <p class="itemName logout">退出登录</p>
      </cell-box>
      <div v-transfer-dom>
        <confirm
          v-model="showlogoutConfirm"
          :close-on-confirm="false"
          title="退出登录"
          @on-confirm="logoutConfirm"
        ></confirm>
      </div>
    </group>
  </div>
</template>

<script>
import TransferDom from '@/utils/directive/tranform.js'
import { Group, CellBox, Confirm } from 'vux'
import songListBlock from './songListBlock'
import { userPlaylist, userRecord, logout } from '@/api/api'

import { mapState, mapMutations } from 'vuex'
import cell from '@/components/cell'
export default {
  components: {
    Group,
    CellBox,
    Confirm,
    songListBlock,
    cell
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      playlist: [],
      history: [],
      type: 1,
      showlogoutConfirm: false
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  created() {
    this.getuserPlaylist()
    this.getuserRecord()
  },
  methods: {
    ...mapMutations('user', ['_user']),
    getuserPlaylist() {
      let params = {
        uid: this.user.userId
      }
      userPlaylist(params).then(res => {
        if (res.data.code === 200) {
          this.playlist = res.data.playlist
        }
      })
    },
    getuserRecord() {
      let params = {
        uid: this.user.userId,
        type: this.type
      }
      userRecord(params).then(res => {
        if (res.data.code === 200) {
          this.history = this.type === 0 ? res.data.allData : res.data.weekData
        }
      })
    },
    logoutConfirm() {
      logout().then(res => {
        if (res.data.code === 200) {
          this.$toast('退出成功')
          this._user({})
          this.showlogoutConfirm = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  background-color: #f0f0f0;
  .pr {
    padding-right: 30px;
    display: flex;
    flex-flow: row nowrap;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .itemName {
    padding-left: 10px;
    flex: 4;
    font-size: 14px;
  }
  .logout {
    text-align: center;
    color: @maincolor;
  }
  .itemNum {
    flex: 1;
    text-align: right;
    color: #666;
  }
}
</style>
