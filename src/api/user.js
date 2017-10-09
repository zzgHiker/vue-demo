import axiosHelper from './base';

export const login = params => {
    return axiosHelper.post('/login', params);
};

export const users = params => {
    return axiosHelper.post('/users', params);
};