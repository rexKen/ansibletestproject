import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../view/home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login'),
    meta: {
      isAuth: false, // 鉴权参数
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // 路由拦截 如登录、鉴权等功能
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router;
