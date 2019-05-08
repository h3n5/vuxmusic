<template>
  <vActionsheet
    v-model="showList"
    :list="songList"
    :id="audio.id"
    @click="play"
  >
  </vActionsheet>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vActionsheet from '@/components/vActionsheet'
export default {
  name: '',
  props: {
    value: Boolean
  },
  watch: {
    value(v) {
      if (v) {
        this.showList = v
      }
    },
    showList(v) {
      if (!v) {
        this.$emit('cb')
      }
    }
  },
  components: { vActionsheet },
  data() {
    return {
      showList: false
    }
  },
  computed: {
    ...mapState('music', ['songList', 'audio'])
  },
  methods: {
    name(item) {
      return item.name
    },
    ...mapActions('music', ['AddAndPlay']),
    play(v) {
      let song = {
        id: v.id,
        name: v.name,
        artists: v.artists,
        albumPic: '@/assets/play/player-bar.png',
        album: v.album,
        location: `https://music.163.com/song/media/outer/url?id=${v.id}.mp3 `
      }
      this.AddAndPlay(song)
      this.$emit('callback')
    }
  }
}
</script>
