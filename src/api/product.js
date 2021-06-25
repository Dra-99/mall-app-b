import axios from '@/axios';

export default {
  getProductList(params) {
    return axios.get('/products/all', { params });
  },
  removeProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  // uploadProduct(params) {
  //   return axios.post('/upload/images', params);
  // },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  getProductDetail(id) {
    return axios.get(`/products/${id}`);
  },
  productEdit(params) {
    return axios.put('/products/edit', params);
  },
};
