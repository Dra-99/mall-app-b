<template>
  <div class="home">
    <menu-list :key="key" />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <main-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuList from './components/menuList.vue';
import mainHeader from './components/mainHeader.vue';

export default {
  components: {
    menuList,
    mainHeader,
  },
  // 这个时间戳是给到menuList组件，用来改变对应的菜单选项的
  // 为什么可以重新进行改变菜单选项呢？
  // 我们给的时间戳是一个不断变化的响应式数据，当时间戳发生改变的时候
  // 此时该组件响应式数据会使其重新渲染，而默认打开的和选中的菜单中的选项也会发生改变
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>
