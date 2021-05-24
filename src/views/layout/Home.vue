<template>
  <div class="home">
    <menu-list />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <main-header />
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
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>
