import Axios from 'axios';
import Qs from 'qs';

const formAxios = Axios.create({
    baseURL: process.env.BASE_URL,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        return Qs.stringify(data);
    }]
});

export default {
    post: (url, params) => {
        return new Promise((resolve, reject) => {
            formAxios.post(url, params)
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