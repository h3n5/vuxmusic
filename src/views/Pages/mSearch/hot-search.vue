<template>
  <div>
    <p class="hotTitle">热门搜索</p>
    <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="4" v-for="(item, index) in list" :key="index" @click.native="reset(item.first)">
          <div class="flex-demo">{{item.first}}</div>
        </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { gethotSearch } from '@/api/api';
export default {
  name: '',
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
        list:[]
    }
  },
    created(){
        this.gethot()
    },
  methods: {
      async gethot(){
          let res = await gethotSearch()
          this.list = res.data.result.hots
      },
      reset(v){
          this.$store.commit("music/updateMessage",v)
          this.$emit("goSearch")
      }
  }
}
</script>

<style lang='less' scoped>
@import '~vux/src/styles/1px.less';
.hotTitle{
    padding: 10px
}
.flex-demo {
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  background-clip: padding-box;
  padding: 5px 10px;
  margin: 5px;
  color: #999;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
