<template>
  <div class="sub-app-template">
    <keep-alive :exclude="[]">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {
  userInfo
} from './api/auth';
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
    getUserInfo (userId) {
      this.$http({
        method: 'post',
        url: userInfo,
        data: {
          id: userId
        }
      }).then(res => {
        const data = res.data;
        this.$store.commit('setUserInfo', data);
      }).catch(err => {
        console.log('获取用户信息失败-----------');
        console.error(err);
      })
    }
  },
  created () {
    const userId = window.sessionStorage.getItem('userId');
    if (userId) {
      this.getUserInfo(userId);
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-app-template {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

