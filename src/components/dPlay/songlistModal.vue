<template>
  <div>
    <Actionsheet v-model="showList" :menus="{}" show-cancel cancel-text="关闭" >
      <ul slot="header">
        <li v-for="(item, index) in songList" :key="index" class="songlist vux-1px-b">{{item.name}} - <span>{{item.artists[0].name}}</span></li>
      </ul>
    </Actionsheet>
  </div>
</template>

<script>
import { Actionsheet } from "vux";
import {mapState} from 'vuex';
export default {
name: '',
props:{
    value:Boolean,
},
watch:{
    value(v){
        if(v){
            this.showList = v
        }
    },
    showList(v){
        if(!v){
            this.$emit("cb")
        }
    }
},
components:{Actionsheet},
data () {
    return {
        showList:false
    }
  },
computed:{
    ...mapState("music", ["songList",
    ]),
},
methods: {}
}
</script>

<style lang='less' scoped>
.songlist{
    font-size: 14px;
    text-align: left;
    margin: 5px 0;
    padding: 5px 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    span{
        color: #888;
        font-size: 12px;
    }
}
</style>
