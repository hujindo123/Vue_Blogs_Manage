import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor';
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

import main from '@/views/index';
import register from '@/views/user/register';
import login from '@/views/user/login';
import addType from '@/views/art/addType';
import addArt from '@/views/art/addArt';

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
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/art/addType',
      component: addType
    },
    {
      path: '/addArt',
      component: addArt
    }
  ]
});
