<template>
  <a-form-model
    class="searchForm"
    layout="inline"
    :model="formSearch"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字">
      <a-input v-model="formSearch.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
          show-search
          placeholder="选择类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id">
               {{c.name}}
            </a-select-option>
        </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  data() {
    return {
      formSearch: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    handleSubmit() {
    //   console.log();
      this.$emit('submit', this.formSearch);
    },
    handleChange(val) {
    //   console.log(val);
      this.formSearch.category = val;
    },
  },

  created() {

  },
};
</script>

<style lang="less" scoped>
.searchForm {
  padding: 10px 30px;
}
</style>
