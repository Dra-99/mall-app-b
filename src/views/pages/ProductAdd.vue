<template>
  <div class="product-add">
    <a-steps class="step-title" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form" />
      <sale-detail
        v-else-if="current === 1"
        @prev="prev"
        @submit="next"
        :form="form"
      />
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/BasicDetail.vue';
import SaleDetail from '@/components/SaleDetail.vue';
import api from '@/api/product';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      api.getProductDetail(id).then((res) => {
        // console.log(res);
        this.form = res;
      });
    }
  },
  methods: {
    next(formData) {
      // console.log(formData);
      this.form = {
        ...this.form,
        formData,
      };
      if (this.current === 1) {
        // 提交数据
        // console.log('submmit');
        if (this.$route.params.id) {
          api.productEdit(formData).then(() => {
            this.$router.push({
              name: 'ProductList',
            });
            this.$message.success('修改成功');
          });
        } else {
          // console.log(formData);
          api.addProduct(formData).then(() => {
            // console.log(res);
            this.$router.push({
              name: 'ProductList',
            });
            this.$message.success('添加商品成功');
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less">
.product-add {
  .step-title {
    width: 50%;
    margin: 30px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
