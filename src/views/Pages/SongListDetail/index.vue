<template>
  <div>
    <mheader title="歌单"></mheader>
    <SongListInfo
      :creator="creator"
      :coverImgUrl="playlist.coverImgUrl"
      :name="playlist.name"
    ></SongListInfo>
    <SongList :tracks="tracks"></SongList>
  </div>
</template>

<script>
import mheader from '@/components/header-3'
import SongList from './SongList'
import SongListInfo from './SongListInfo'
import { playlistDetail } from '@/api/api'
export default {
  name: 'SongListDetail',
  components: {
    mheader,
    SongList,
    SongListInfo
  },
  props: {
    id: {
      require: true
    }
  },
  data() {
    return {
      playlist: {
        coverImgUrl: '',
        name: ''
      },
      creator: {},
      tracks: []
    }
  },
  created() {
    this.getplaylistDetail(this.id)
  },
  methods: {
    getplaylistDetail(id) {
      playlistDetail({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.playlist = res.data.playlist
          this.creator = res.data.playlist.creator
          this.tracks = res.data.playlist.tracks
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      document.querySelector('.uheight') &&
        document.querySelector('.uheight').classList.remove('uheight')
    })
  },
  beforeRouteLeave(to, from, next) {
    next(() => {
      document.querySelector('.uheight') &&
        document.querySelector('.router').classList.add('uheight')
    })
  }
}
</script>

<style lang='less' scoped>
</style>
