import axios from '@/axios';

export default {
  getProductList(params) {
    return axios.get('/products/all', { params });
  },
};
