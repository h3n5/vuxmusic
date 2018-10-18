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
    <x-dialog v-model="show" class="dialog" hide-on-blur>
      <div class="input">
        <group title="邮箱登录">
          <x-input title="邮箱" type="text" placeholder="请输入邮箱" required v-model="form.email" is-type="email"></x-input>
          <x-input title="密码" type="password" placeholder="请输入密码" required v-model="form.password"></x-input>
        </group>
      </div>
      <div class="btn">
        <x-button class="btn-item" @click.native="loginIn" type="default" :mini='true'>登录</x-button>
        <x-button class="btn-item" @click.native="show = false" type="default" :mini='true'>取消</x-button>
      </div>
      
    </x-dialog>
    <toast v-model="showtoast" type="text">{{message}}</toast>
  </div>
</template>
<script>
import { XHeader, XDialog, XInput, Group, XButton, Toast } from "vux";
import { loginEmail } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  name: "tabbar",
  components: {
    XHeader,
    XDialog,
    XInput,
    Group,
    XButton,
    Toast
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
        email: "3384928538@qq.com",
        password: "chenbinmind"
      },
      showtoast: false,
      message: "登录中^"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    ...mapMutations("user", ["_user"]),
    loginIn() {
      loginEmail(this.form).then(res => {
        this.show = false;
        if (res.data.code === 200) {
          this._user(res.data.profile);
          this.message = "登录成功";
          this.showtoast = true;
        } else {
          this.message = res.msg || "登录失败";
          this.showtoast = true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dialog {
  .input {
    margin-bottom: 10px;
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
  background: #db2523;

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
    background: url("../assets/lines.png") center no-repeat;
  }
}
</style>

