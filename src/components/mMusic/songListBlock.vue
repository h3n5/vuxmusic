<template>
  <div class="page">
    <p class="itemTitle">
      <x-icon
        type="ios-arrow-down"
        size="16"
        class="itemNum-icon"
      ></x-icon><span class="word">我创建的歌单</span>
    </p>

    <cell
      class="pr"
      v-for="(item) in myplaylist"
      :key="item.id"
    >
      <img
        :src="item.coverImgUrl"
        alt="pic"
        class="icon"
      >
      <div class="mbox">
        <p class="itemName">{{item.name}}</p>
        <p class="itemNum">
          <x-icon
            type="ios-checkmark"
            size="14"
            class="itemNum-icon"
          ></x-icon><span class="word">共{{item.trackCount}}首</span>
        </p>
      </div>
    </cell>

    <p class="itemTitle">
      <x-icon
        type="ios-arrow-down"
        size="16"
        class="itemNum-icon"
      ></x-icon><span class="word">我收藏的歌单</span>
    </p>

    <cell
      class="pr"
      v-for="(item) in otherplaylist"
      :key="item.id"
    >
      <img
        :src="item.coverImgUrl"
        alt="pic"
        class="icon"
      >
      <div class="mbox">
        <p class="itemName">{{item.name}}</p>
        <p class="itemNum">
          <x-icon
            type="ios-checkmark"
            size="14"
            class="itemNum-icon"
          ></x-icon><span class="word">共{{item.trackCount}}首</span>
        </p>
      </div>
    </cell>

  </div>
</template>

<script>
import cell from '@/components/cell'
export default {
  components: {
    cell
  },
  computed: {
    myplaylist() {
      return this.playlist.filter(v => !v.subscribed)
    },
    otherplaylist() {
      return this.playlist.filter(v => v.subscribed)
    }
  },
  props: {
    playlist: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.weui-cells {
  margin-top: 0 !important;
}
.vux-x-icon {
  fill: #99b4f3;
}
</style>

<style lang="less" scoped>
.page {
  color: #333;
  .pr {
    padding-right: 30px;
    display: flex;
    flex-flow: row nowrap;
    background-color: #fff;
  }
  .itemTitle {
    padding: 10px;
    font-size: 12px;
    color: #333;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .itemNum-icon {
    vertical-align: middle;
  }
  .word {
    margin-left: 5px;
    vertical-align: middle;
  }
  .mbox {
    .itemName {
      padding-left: 10px;
      flex: 4;
      font-size: 14px;
    }
    .itemNum {
      padding-left: 10px;
      flex: 4;
      font-size: 14px;
    }
  }

  .pm {
    padding-bottom: 0;
  }
}
</style>
