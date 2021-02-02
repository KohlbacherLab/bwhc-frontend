
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

export default ({
    namespaced: true,

    state: {
        token: null,
        user: null,
        secret: null,
        hasToken: null,
        admin: null,
        documentarist: null,
        global: null,
        local: null,
        mtb: null,
        researcher: null
    },

    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        secret(state) {
            return state.token
        },
        // this function is necessary for the sidebar menu
        hasToken(state) {
            if (state.token)
                return true
        },
        admin(state) {
            return state.admin
        },
        documentarist(state) {
            return state.documentarist
        },
        global(state) {
            return state.global
        },
        local(state) {
            return state.local
        },
        mtb(state) {
            return state.mtb
        },
        researcher(state) {
            return state.researcher
        }

    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },

        SET_USER(state, data) {
            state.user = data
        },

        SET_ADMIN(state, data) {
            state.admin = data
        },

        SET_DOCUMENTARIST(state, data) {
            state.documentarist = data
        },

        SET_GLOBAL(state, data) {
            state.global = data
        },

        SET_LOCAL(state, data) {
            state.local = data
        },

        SET_MTB(state, data) {
            state.mtb = data
        },

        SET_RESEARCHER(state, data) {
            state.researcher = data
        }

    },

    actions: {

        async login({ dispatch }, credentials) {
            //alert("login function");
            //alert("Credentials: "+JSON.stringify(credentials));
            let response = await axios.post(process.env.baseUrl + process.env.port + `/bwhc/user/api/login`, credentials)
            //alert("Token: "+ JSON.stringify(response.data.access_token));
            return dispatch('attempt', response.data.access_token)
        },

        async attempt({ commit, state }, token) {

            if (token) {
                commit('SET_TOKEN', token)
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            } else {
                axios.defaults.headers.common['Authorization'] = null
            }
            if (!state.token) {
                return
            }

            let response = await axios.get(
                process.env.baseUrl + process.env.port + process.env.me
            )


            if (response.data.roles.includes("Admin"))
                commit('SET_ADMIN', true);
            if (response.data.roles.includes("Documentarist"))
                commit('SET_DOCUMENTARIST', true);
            if (response.data.roles.includes("GlobalZPMCoordinator"))
                commit('SET_GLOBAL', true);
            if (response.data.roles.includes("LocalZPMCoordinator"))
                commit('SET_LOCAL', true);
            if (response.data.roles.includes("ReseaMTBCoordinatorrcher"))
                commit('SET_MTB', true);
            if (response.data.roles.includes("Researcher"))
                commit('SET_RESEARCHER', true);
            commit('SET_USER', response.data.roles);

            /*
    
                try {
    
                    if (response.data.roles.includes("Admin"))
                        commit('SET_ADMIN', true);
                    if (response.data.roles.includes("Documentarist"))
                        commit('SET_DOCUMENTARIST', true);
                    if (response.data.roles.includes("GlobalZPMCoordinator"))
                        commit('SET_GLOBAL', true);
                    if (response.data.roles.includes("LocalZPMCoordinator"))
                        commit('SET_LOCAL', true);
                    if (response.data.roles.includes("ReseaMTBCoordinatorrcher"))
                        commit('SET_MTB', true);
                    if (response.data.roles.includes("Researcher"))
                        commit('SET_RESEARCHER', true);
                    commit('SET_USER', response.data.roles);
    
                } catch (e) {
                    console.log('Failed');
                    commit('SET_USER', null)
                } */
        },

        logout({ commit }) {
            /*
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null) 
            })
            */
            commit('SET_TOKEN', null),
                commit('SET_USER', null)
        }
    }
}) 