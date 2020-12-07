const mutations = {
  // 设置登录信息 一般登录后设置
  setLoginInfo (state, loginInfo) {
    for (let key in state.loginInfo) {
      state.loginInfo[key] = loginInfo[key] || state.loginInfo[key];
    }
  },
  setUserInfo (state, userInfo) {
    for (let key in state.userInfo) {
      state.userInfo[key] = userInfo[key] || state.userInfo[key];
    }
  },
  // 设置用户的菜单权限信息
  setMenuList (state, menuList) {
    state.menuList = menuList;
  }
}

export default mutations;
