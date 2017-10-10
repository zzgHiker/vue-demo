import Vue from 'vue';
import Vuex from 'vuex';

import loginUser from './modules/login-user'
import user from './modules/user';

import api from '../api';


Vue.use(Vuex);

const debugMode = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {},
    getters: {
        loginUser: state => {
            return state.loginUser;
        },
        user: state => {
            return state.user;
        }
    },
    mutations: {
        init: state => {
            state.loginUser = JSON.parse(localStorage.getItem('UserInfo')) || {};
        },

        save: state => {
            localStorage.setItem('UserInfo', JSON.stringify(state.loginUser));
        }
    },
    actions: {
        init: ({commit}) => {
            commit('init');
        },

        login: ({dispatch, commit}, user) => {
            return new Promise((resolve, reject) => {

                api.user.login({
                    clientid: 'mobileerp',
                    ...user
                }).then(data => {
                    if (user.remember.length === 0)
                        delete user['password'];

                    dispatch('updateLoginUser', {
                        ...user,
                        ...data
                    }).then(() => {
                        commit('save');
                        resolve();
                    });
                }, error => {
                    reject(error);
                });
            });

        },

        logout: ({dispatch, commit}) => {
            dispatch('clearLoginUser')
                .then(() => {
                    commit('save');
                });
        }

    },
    modules: {
        user,
        loginUser
    },
    strict: debugMode
});