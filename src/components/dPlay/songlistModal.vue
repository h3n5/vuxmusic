<template>
  <div>
    <Actionsheet v-model="showList" :menus="{}" show-cancel cancel-text="关闭">
      <ul slot="header">
        <li
          v-for="(item, index) in songList"
          :key="index"
          class="songlist vux-1px-b"
          @click="play(item)"
        >
          {{item.name}} -
          <span>{{item.artists[0].name}}</span>
        </li>
      </ul>
    </Actionsheet>
  </div>
</template>

<script>
import { Actionsheet } from "vux";
import { mapState,mapActions } from "vuex";
export default {
  name: "",
  props: {
    value: Boolean
  },
  watch: {
    value(v) {
      if (v) {
        this.showList = v;
      }
    },
    showList(v) {
      if (!v) {
        this.$emit("cb");
      }
    }
  },
  components: { Actionsheet },
  data() {
    return {
      showList: false
    };
  },
  computed: {
    ...mapState("music", ["songList"])
  },
  methods: {
      ...mapActions("music",["AddAndPlay"]),
        play(v) {
          let song ={
                id: v.id,
                name: v.name,
                artists: v.artists,
                albumPic: '@/assets/play/player-bar.png',
                album: v.album
          }
          this.AddAndPlay(song);
        }
      
  }
};
</script>

<style lang='less' scoped>
.songlist {
  font-size: 14px;
  text-align: left;
  margin: 5px 0;
  padding: 5px 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  span {
    color: #888;
    font-size: 12px;
  }
}
</style>
