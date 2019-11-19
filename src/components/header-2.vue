<template>
  <div class="head">
    <div class="micro" @click="back">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-navigatebefore"></use>
      </svg>
    </div>
    <div class="search">
      <p>{{title}}</p>
    </div>
    <div class="play" @click="show = true"></div>
    <vmodal v-model="show" class="dialog" hide-on-blur>
      <div class="input">
        <div class="group">邮箱登录</div>
        <form>
          <vinput label="邮箱" required type="text" placeholder="请输入邮箱" v-model="form.email"/>
          <vinput label="密码" required type="password" placeholder="请输入密码" v-model="form.password"/>
        </form>
      </div>
      <div class="btn">
        <vbutton class="btn-item" @click.native="loginIn" type="default" :mini="true">登录</vbutton>
        <vbutton class="btn-item" @click.native="show = false" type="default" :mini="true">取消</vbutton>
      </div>
    </vmodal>
  </div>
</template>
<script>
import { loginEmail } from '@/api/api'
import { mapMutations } from 'vuex'
import vbutton from '@/components/vbutton'
import vinput from '@/components/vinput'
import vmodal from '@/components/vmodal'
export default {
  name: 'tabbar',
  components: {
    vbutton,
    vinput,
    vmodal
  },
  props: {
    title: String,
    showMicro: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      form: {
        email: '3384928538@qq.com',
        password: 'chenbinmind'
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    ...mapMutations('user', ['_user']),
    loginIn() {
      loginEmail(this.form).then(res => {
        this.show = false
        if (res.data.code === 200) {
          this._user(res.data.profile)
          this.$toast('登录成功')
        } else {
          this.$toast(res.msg || '登录失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.dialog {
  .input {
    margin-bottom: 10px;
    .group {
      text-align: center;
      margin: 15px 0 10px 0;
      color: #999;
    }
  }
  .btn {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
    .btn-item {
      margin-top: 0;
    }
  }
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: @maincolor;

  > div {
    padding: 0 10px;
  }
  .micro {
    flex: 0 0 50px;
    height: 32px;
    font-size: 28px;
    color: #fff;
    // background: url("../assets/microphone-o.png") center no-repeat;
  }
  .search {
    flex: auto;
    height: 100%;
    p {
      text-align: center;
      height: 20px;
      line-height: 20px;
      color: #fff;
    }
  }
  .play {
    flex: 0 0 50px;
    height: 32px;
    background: url('../assets/lines.png') center no-repeat;
  }
}
</style>

