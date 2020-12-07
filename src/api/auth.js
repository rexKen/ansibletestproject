const baseUrl = window.BASE_URL || '';
// 获取用户拥有的系统菜单资源
const userListMenu = baseUrl + '/auth/v1/user_owned/list_menu';
// 登录接口
const login = baseUrl + '/auth/v1/login/pwd';
// 获取用户信息接口
const userInfo = baseUrl + '/auth/v1/user/get';

export {
  userListMenu,
  login,
  userInfo
}
