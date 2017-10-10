const state = {
    ticket: '',
    username: '',
    password: '',
    remember: [],
    name: ''
};

const getters = {
};

const actions = {
    updateLoginUser: ({commit}, data) => {
        commit('updateLoginUser', data);
    },

    clearLoginUser: ({commit}) => {
        commit('clearLoginUser');
    }
};

const mutations = {
    clearLoginUser: state => {
        state.ticket = '';
        state.username = '';
        state.password = '';
        state.remember = [];
        state.name = '';
    },

    updateLoginUser: (state, data) => {
        if (data && typeof data === 'object')
            for (let k in data) {
                if (data.hasOwnProperty(k) && state.hasOwnProperty(k)) {
                    state[k] = data[k];
                }
            }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};