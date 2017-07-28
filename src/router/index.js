import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.use(Router);
import main from '@/views/index';
import register from '@/views/user/register';

export default new Router({
  mode: 'history',
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      component: main
    },
    {
      path: '/register',
      component: register
    }
  ]
});
