import axiosHelper from './base';

export const login = params => {
    return axiosHelper.post('/rest/account/userlogin', params);
};