import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookie, getUserCookie, removeUserCookie } from '@/utils/userCookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: getUserCookie(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    loginOut(state) {
      state.userInfo = {
        appkey: '',
        email: '',
        role: '',
        username: '',
      };
    },
  },
  actions: {
    changeCollapsed(state) {
      state.commit('changeCollapsed');
    },
    changeUserInfo({ commit }, userInfo) {
      commit('changeUserInfo', userInfo);
      setUserCookie(userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
      removeUserCookie();
    },
  },
  modules: {
  },
});
