import axios from '@/axios';

export default {
  getProductList(params) {
    return axios.get('/products/all', { params });
  },
  removeProduct(params) {
    return axios.delete(`products/${params.id}`);
  },
};
