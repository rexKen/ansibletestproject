import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import http from './http';
import './assets/main.scss';
import {
  Field,
  Button
} from 'vant';
Vue.use(Field);
Vue.use(Button);

// 挂载http工具实例
Vue.prototype.$http = http;

new Vue({
  el: '#sub-app-template',
  router,
  store,
  render: h => h(App)
});
