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
    hidden: false,
    icon: 'appstore',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'unordered-list',
    },
    component: () => import('@/views/pages/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'plus',
    },
    component: () => import('@/views/pages/ProductAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '商品类目',
      hidden: false,
      icon: 'books',
    },
    component: () => import('@/views/pages/Category.vue'),
  }],
}];

const routes = [{
  path: '/',
  name: 'Home',
  redirect: {
    name: 'Index',
  },
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  component: Home,
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
      hidden: false,
      icon: 'area-chart',
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
    hidden: true,
    icon: 'user',
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
        // console.log(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAdd = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
