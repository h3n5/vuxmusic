<template>
  <div class="page">
    <mhead title="我的音乐"></mhead>
    <!-- 音乐列表 -->
    <musicList></musicList>
    <!-- 歌单列表 -->
    <songListBlock></songListBlock>
  </div>
</template>

<script>
import mhead from '@/components/header-2';
import musicList from '@/components/mMusic/musicList';
import songListBlock from '@/components/mMusic/songListBlock';
export default {
  components: {
    mhead,musicList,songListBlock
  },
  data() {
    return {

    };
  },
  created() {
 
  },
  methods: {
  }
};
</script>

<style lang='less'>
</style>
