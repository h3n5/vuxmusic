<template>
  <div class="page">
    <p class="itemTitle">我创建的歌单</p>
        <group style="margin:0">
            <cell-box  class="pr">
                <img src="../../assets/logo.png" alt="pic" class="icon">
                <div class="mbox">
                    <p class="itemName">我喜欢的音乐</p>
                    <p class="itemNum">共7首</p>
                </div>
            </cell-box>
        </group>
    <p class="itemTitle">我收藏的歌单</p>
        <group style="margin:0">
            <cell-box  class="pr">
                <img src="../../assets/logo.png" alt="pic" class="icon">
                <div class="mbox">
                    <p class="itemName">我喜欢的音乐</p>
                    <p class="itemNum">共7首</p>
                </div>
            </cell-box>
        </group>
  </div>
</template>

<script>
import { Group, CellBox, } from "vux";

export default {
  components: {
    Group,
    CellBox
  },
  data() {
    return {
    };
  }
};
</script>
<style lang="less" scoped>
.page {
  .pr {
    padding-right: 30px;
  }
  .itemTitle{
      padding: 10px;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .mbox{
    .itemName {
        padding-left: 10px;
        flex: 4;
        font-size: 14px;
    }
    .itemNum{
        padding-left: 10px;
        flex: 4;
        font-size: 14px;
    }
  }

  .pm{
      padding-bottom: 0;
  }
}
</style>
