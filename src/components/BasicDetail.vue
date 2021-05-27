<template>
  <div class="basicDetail">
    <a-form-model
      class="basicDetail"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item ref="name" required label="标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_items" placeholder="请选择商品子类目">
          <a-select-option v-for="c in categoryItem" :value="c" :key="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="请选择标签"
          :default-value="['包邮, 次日达']"
          v-model="form.tags"
        >
          <a-select-option :key="key"> 包邮，次日达 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label=" " class="next">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/category';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
      },
      key: Math.random().toString(16).substr(2, 7),
      rules: {},
      categoryList: [],
      categoryItem: [],
    };
  },
  created() {
    api.getCategory().then((res) => {
      //   console.log(res);
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(e) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === e) {
          this.categoryItem = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        alert('请将必填项补充完整');
        return false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.next {
  text-align: center;
}
</style>
