import axiosHelper from './base';

export const login = params => {
    return axiosHelper.post('/login', params);
};