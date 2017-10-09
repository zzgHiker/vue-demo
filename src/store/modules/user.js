const state = {
    ticket: '',
    username: '',
    password: '',
    remember: [],
    name: ''
};

const getters = {
    username: state => state.username,
    password: state => state.password,
    remember: state => state.remember
};

const actions = {
    updateUser: ({commit}, data) => {
        commit('updateUser', data);
    },

    clearUser: ({commit}) => {
        commit('clearUser');
    }
};

const mutations = {
    clearUser: state => {
        state.ticket = '';
        state.username = '';
        state.password = '';
        state.remember = [];
        state.name = '';
    },

    updateUser: (state, data) => {
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