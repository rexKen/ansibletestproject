<template>
  <div>
    <van-field v-model="account" label="账号" />
    <van-field v-model="passwordHash" label="密码" />
    <van-button type="default" @click="login">登录</van-button>
    <img :src="imageUrl('test.jpg')" alt="" srcset="">
  </div>
</template>

<script>
import imageUrl from '../utils/image-url';
import md5 from 'js-md5';
import { login } from '../api/auth';
export default {
  name: 'login',
  data () {
    return {
      account: '',
      passwordHash: ''
    }
  },
  methods: {
    login () {
      const hash = md5(this.passwordHash);
      this.$http({
        method: 'post',
        url: login,
        data: {
          account: this.account,
          passwordHash: hash
        }
      }).then(res => {
        const data = res.data || {};
        window.sessionStorage.setItem('accessToken', data.accessToken || '');
        window.sessionStorage.setItem('refreshToken', data.refreshToken || '');
        window.sessionStorage.setItem('userId', data.userId || '');
        console.log('------设置用户code')
        window.sessionStorage.setItem('account', data.account || '');
        this.$store.commit('setLoginInfo', data);
        this.$router.push({
          path: '/sub-app-template/'
        })
      }).catch(err => {
        console.error(err);
      })
    },
    imageUrl (image) {
      return imageUrl(image);
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  background-color: red;
}
</style>
