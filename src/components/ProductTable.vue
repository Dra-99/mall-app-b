<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
        <a-button @click="edit(record)">编辑</a-button>
        <a-button @click="remove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['listData', 'page'],
  computed: {
    tableData() {
      return this.listData.map((it) => ({
        ...it,
        key: it.id,
      }));
    },
  },
  methods: {
    changePage(e) {
    //   console.log(e);
      this.$emit('change', e);
    },
    edit(record) {
      // console.log(record);
      this.$emit('editProduct', record);
    },
    remove(record) {
      this.$confirm({
        title: '确认删除吗?',
        content: `确认删除标题为${record.title}的商品吗?`,
        onOk: () => {
          this.$emit('removeProduct', record);
        },
        onCancel() {},
        cancelText: '取消',
        okText: '确认',
      });
    },
  },
};
</script>
