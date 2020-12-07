import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isProduction: process.env.NODE_ENV === 'production',
    systemId: '1275356418387689473',
    loginInfo: {
      accessToken: window.sessionStorage.getItem('accessToken') || '',
      refreshToken: window.sessionStorage.getItem('refreshToken') || '',
      userId: window.sessionStorage.getItem('userId') || '',
      account: window.sessionStorage.getItem('account') || ''
    },
    userInfo: {
      account: '',
      department: '',
      enable: false,
      id: '',
      idCard: '',
      mobile: '',
      name: '',
      phone: '',
      position: '',
      type: 0
    },
    menuList: {}, // 菜单权限
  },
  getters,
  mutations
})

export default store;
