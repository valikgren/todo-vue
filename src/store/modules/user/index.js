import http from '@/plugins/http';

const localState = {
  userList: [],
};

const getters = {};

const mutations = {
  setList(state, payload) {
    state.userList = payload;
  },
  addUser(state, payload) {
    state.userList.unshift({
      ...payload,
      id: Math.random().toString(36).substr(2, 9),
    });
  },
  deleteUser(state, user) {
    const elementIndex = state.userList.indexOf(user);
    state.userList.splice(elementIndex, 1);
  }
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
