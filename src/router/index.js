import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';
import store from '@/store/index';
import filterResultRoutes from '@/utils/roleToRoutesName';

Vue.use(VueRouter);

const asyncRoutes = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
    },
    component: () => import('@/views/pages/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
    },
    component: () => import('@/views/pages/ProductAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '商品类目',
    },
    component: () => import('@/views/pages/Category.vue'),
  }],
}];

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
  },
  component: Home,
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
    },
    component: () => import('@/views/pages/Index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登陆',
  },
},
];

const router = new VueRouter({
  routes,
});

let isAdd = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.username && store.state.userInfo.appkey
      && store.state.userInfo.email) {
      if (!isAdd) {
        const menuRoutes = filterResultRoutes(store.state.userInfo.role, asyncRoutes);
        console.log(menuRoutes);
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAdd = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
