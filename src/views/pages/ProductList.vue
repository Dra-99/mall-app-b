<template>
  <div>
      <!-- 搜索列表 -->
      <search @submit="searchSubmit" />
  </div>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
  components: {
    Search,
  },
  methods: {
    searchSubmit(formVal) {
      console.log(formVal);
    },
  },
};
</script>

<style>

</style>
