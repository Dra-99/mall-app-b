<template>
  <div class="productList">
      <!-- 搜索列表 -->
      <search @submit="searchSubmit" :categoryList="categoryList"/>
      <!-- 新增商品按钮 -->
      <a-button class="add">
        <router-link :to="{name: 'ProductAdd'}">新增商品</router-link>
      </a-button>
      <!-- 商品列表 -->
      <product-table :listData="listData"
        :page="page" @change="changePage"
        :categoryList="categoryList"
        @editProduct="editProduct"
        @removeProduct="removeProduct"/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import ProductTable from '@/components/ProductTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  components: {
    Search,
    ProductTable,
  },

  data() {
    return {
      searchForm: {},
      listData: [],
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },

  async created() {
    await categoryApi.getCategory().then((res) => {
    //   console.log(res);
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item.name;
      });
    });
    // console.log(this.categoryList);
    this.getProductsList();
  },

  methods: {
    searchSubmit(formVal) {
      // console.log(formVal);
      this.searchForm = formVal;
      this.getProductsList();
    },
    getProductsList() {
      api.getProductList({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        // console.log(res);
        this.page.total = res.total;
        this.listData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category],
        }));
      });
    },
    changePage(e) {
      this.page = e;
      this.getProductsList();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      api.removeProduct({
        id: record.id,
      }).then((res) => {
        console.log(res);
        this.getProductsList();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.productList{
  position: relative;
  .add{
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
