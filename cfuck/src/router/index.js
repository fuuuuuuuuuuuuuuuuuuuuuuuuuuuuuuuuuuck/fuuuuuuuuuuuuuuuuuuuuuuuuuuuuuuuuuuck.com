import Vue from 'vue';
import Router from 'vue-router';

/* login */
import Login from '../views/login/';
import Layout from '../views/layout/Layout';

const dashboard = () => import('../views/dashboard/index');



Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
     { path: '/login', component: Login, hidden: true },
     {
         path: '/',
         component: Layout,
         redirect: '/dashboard',
         name: '首页',
         hidden: true,
         children: [{ path: 'dashboard', component: dashboard }]
     }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true }
];
