export default {
  $getLoginInfo: (state) => {
    return state.loginInfo || {};
  },
  $getUserInfo: (state) => {
    return state.userInfo || {};
  },
  $getMenuList: (state) => {
    return state.menuList || {};
  },
}
