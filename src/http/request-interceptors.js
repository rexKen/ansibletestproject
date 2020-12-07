import store from '../store';
import qs from 'qs';

/**
 * 请求的拦截器，用于给请求头部和请求体配置参数
 * @param config
 * @returns {Promise<never>|Promise<unknown>}
 */
export default (config) => {
  // console.log('---------axios request ----------------');
  // console.log(config);
  if (store.getters.$getLoginInfo) {
    // 该系统在权限系统的id
    const systemId = store.state.systemId;
    // token
    const accessToken = store.getters.$getLoginInfo.accessToken || window.sessionStorage.getItem('accessToken');
    const refreshToken = store.getters.$getLoginInfo.refreshToken || window.sessionStorage.getItem('refreshToken');
    // 用户的userid
    const userId = store.getters.$getLoginInfo.userId || window.sessionStorage.getItem('userId');

    // 添加必要的请求头信息
    config.headers['systemId'] = systemId;
    config.headers['accessToken'] = accessToken;
    config.headers['refreshToken'] = refreshToken;
    config.headers['userId'] = userId;
    config.headers['sibat_logid'] = new Date().getTime();

    // 自动添加userId到参数上，用于兼容旧版userId作为参数放置在请求体中
    let contentType = config.headers['content-type'] || config.headers['Content-Type'] || config.headers['ContentType'];

    if (contentType) {
      contentType = contentType.toLowerCase();
      // 表单方式
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        // 参数为对象，未字符串化
        if (typeof config.data === 'object' && config.data !== null) {
          config.data = qs.stringify({
            userId: userId,
            ...config.data
          })
        } else if (typeof config.data === 'string') {
          config.data += `&userId=${userId}`;
        } else {
          config.data = `userId=${userId}`;
        }
      } else if (contentType.indexOf('application/json') > -1) {
        // 显式声明为json格式
        config.data = config.data ? {
          userId: userId,
          ...config.data
        } : {userId: userId}
      } else if (contentType.indexOf('multipart/form-data') > -1) {
        // console.log('添加userId-------------------------')
        config.data.userId = userId;
      } else {
        // 声明为其他内容
        config.data = {
          userId: userId,
          ...config.data
        }
      }
    } else{
      // 隐式默认为json
      config.data = {
        userId: userId,
        ...config.data
      }
    }
  } else {
    return Promise.reject(new Error('vuex配置异常，请在getters添加$getLoginInfo方法'));
  }
  return Promise.resolve(config)
}
