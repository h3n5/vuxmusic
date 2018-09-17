<template>
  <div>
    <tabbar class="footer" style="position:fixed">
      <tabbar-item selected link="/index">
        <img slot="icon" src="../assets/music.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item show-dot link="/music">
        <img slot="icon" src="../assets/music214.png">
        <span slot="label">音乐</span>
      </tabbar-item>
      <tabbar-item  link="/friend">
        <img slot="icon" src="../assets/friend.png">
        <span slot="label">朋友</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/accout">
        <img slot="icon" src="../assets/account.png">
        <span slot="label">账号</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: '',
  components:{
      Tabbar,TabbarItem
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.footer{
    bottom: 0;
}
</style>
