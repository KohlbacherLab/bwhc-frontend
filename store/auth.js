import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    secret: null,
    hasToken: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
    secret(state) {
      return state.token;
    },
    // this function is necessary for the sidebar menu
    hasToken(state) {
      if (state.token) return true;
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, data) {
      state.user = data;
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      let response = await axios.post(
        process.env.baseUrl + process.env.port + `/bwhc/user/api/login`,
        credentials
      );
      return dispatch("attempt", response.data.access_token);
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      if (!state.token) {
        return;
      }

      let response = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );
    },

    logout({ commit }) {
      commit("SET_TOKEN", null), commit("SET_USER", null);
    },
  },
};
