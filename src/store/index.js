import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';

import api from '../api';


Vue.use(Vuex);

const debugMode = process.env.NODE_ENV !== 'production';

console.log(process.env);
export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        user: state => {
            return state.user;
        }
    },
    mutations: {
        init: state => {
            state.user = JSON.parse(localStorage.getItem('UserInfo')) || {};
        },

        save: state => {
            localStorage.setItem('UserInfo', JSON.stringify(state.user));
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

                    dispatch('updateUser', {
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
            dispatch('clearUser')
                .then(() => {
                    commit('save');
                });
        }

    },
    modules: {
        user
    },
    strict: debugMode
});