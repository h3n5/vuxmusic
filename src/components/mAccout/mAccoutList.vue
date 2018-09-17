<template>
  <div class="page">
    <group>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">我的音乐</p>
        <span class="itemNum"></span>
      </cell-box>
    </group>
    <group>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">会员中心</p>
        <span class="itemNum"></span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">商城</p>
        <span class="itemNum"></span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">在线听歌免流量</p>
        <span class="itemNum"></span>
      </cell-box>
    </group>
    <group>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">设置</p>
        <span class="itemNum"></span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">扫一扫</p>
        <span class="itemNum"></span>
      </cell-box>
      <cell-box is-link class="pr">
        <img src="../../assets/music.png" alt="pic" class="icon">
        <p class="itemName">主题换肤</p>
        <span class="itemNum"></span>
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
    background-color: #f0f0f0;
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
