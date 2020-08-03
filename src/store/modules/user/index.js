import http from '@/plugins/http';

const localState = {
  userList: [],
};

const getters = {};

const mutations = {
  setList(state, payload) {
    state.userList = payload;
  },
};

const actions = {
  getList({ commit }) {
    return new Promise((resolve, reject) => {
      http.get('/users').then(
        (response) => {
          commit('setList', response.data);
          resolve(response.data);
        },
        (error) => {
          commit('setList', []);
          reject(error);
        },
      );
    });
  },
};

export default {
  namespaced: true,
  state: localState,
  getters,
  mutations,
  actions,
};
