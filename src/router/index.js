import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import shop from '@/components/shop/shop';
import banner from '@/components/banner/banner';
Vue.use(ElementUI);
Vue.use(Router);
export default new Router({
  mode: 'history',
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      component: shop
    },
    {
      path: '/banner',
      component: banner
    }
  ]
});
