import axios from 'axios';
import requestInterceptors from './request-interceptors';
// 初始化实例
const instance = axios.create();
// 设置超时时间
instance.defaults.timeout = 10000;
// 添加请求拦截器
instance.interceptors.request.use(requestInterceptors, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data && Number(response.data.code) === 1000) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance;
