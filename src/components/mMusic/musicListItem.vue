<template>
  <div class="page">
    <group>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">本地音乐</p>
        <span class="itemNum">2</span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">最近播放</p>
        <span class="itemNum">333</span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">我的电台</p>
        <span class="itemNum">23</span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">我的收藏</p>
        <span class="itemNum">1111</span>
      </cell-box>
    </group>
  </div>
</template>

<script>
import { Group,  CellBox } from 'vux'

export default {
  components: {
    Group,
    CellBox
  }
}
</script>
<style lang="less" scoped>
.page{
    .pr{
        padding-right: 30px;
    }
    .icon{  
        width: 20px;
        height: 20px;
    }
    .itemName{
        padding-left: 10px;
        flex: 4;
        font-size: 14px;
    }
    .itemNum{
       flex: 1;
       text-align: right;
    }
}
</style>
