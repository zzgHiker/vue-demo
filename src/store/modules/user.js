import Mock from 'mockjs';

const state = {
    all: []
};

const getters = {};

const actions = {
    updateUser: ({commit}, data) => {
        commit('updateUser', data);
    },

    clearUser: ({commit}) => {
        commit('clearUser');
    },

    addNewUser: ({commit}) => {
        commit('addNewUser');
    },

    removeUser: ({commit}, index) => {
        commit('removeUser', index);
    }
};

const mutations = {
    clearUser: state => {
        state.all = [];
    },

    updateUser: (state, data) => {
        state.all = data;
    },

    addNewUser: state => {
        state.all.push({
            id: Mock.mock('@increment'),
            username: Mock.Random.name(),
            name: Mock.Random.cname(),
            birth: Mock.Random.date(),
            sex: Mock.Random.boolean()
        });
    },

    removeUser: (state, index) => {
        state.all.splice(index, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};