import Axios from 'axios';
import Qs from 'qs';

// 模拟jQuery Form提交
const formAxios = Axios.create({
    baseURL: process.env.BASE_URL,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        return Qs.stringify(data);
    }]
});

let axiosInstance = process.env.NODE_ENV === 'production' ? formAxios : Axios;

export default {
    post: (url, params) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, params)
                .then(res => {
                    if (res.data && res.data.status === 'OK') {
                        resolve(res.data.data);
                    } else {
                        reject(res.data.data);
                    }
                }, err => {
                    reject(err.message);
                });
        });
    }
};