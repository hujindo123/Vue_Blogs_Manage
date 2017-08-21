import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor';
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

import main from '@/views/index';
// import register from '@/views/user/register';
import login from '@/views/user/login';
import addType from '@/views/art/addType';
import addArt from '@/views/art/addArt';
import verifyList from '@/views/art/verifyList';
import verifyLog from '@/views/art/verifyLog'; // 审核记录
import NotFoundComponent from '@/views/NotFoundComponent';

export default new Router({
  mode: 'history',
  linkActiveClass: 'link-active',
  routes: [
  /*  {
      path: '/register',
      component: register
    }, */
    { path: '*', component: NotFoundComponent },
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: main,
      redirect: '/art/addType',
      children: [
        {
          path: '/art/addType',
          component: addType
        },
        {
          path: '/art/addArt',
          component: addArt
        },
        {
          path: '/art/verifyList',
          component: verifyList
        },
        {
          path: '/art/verifyLog',
          component: verifyLog
        }
      ]
    }
  ]
});
