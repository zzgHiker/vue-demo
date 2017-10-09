import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {AuthUsers} from './data/users';

export default {
    bootstrap() {
        let mock = new MockAdapter(axios);

        mock.onGet('/success')
            .reply(200, {
                status: 'OK',
                data: ''
            });


        mock.onGet('/error')
            .reply(500, {
                status: 'FAIL',
                data: 'Error Occurs'
            });

        // Login
        mock.onPost('/login')
            .reply(request => {
                console.log(request);
                let {username, password} = JSON.parse(request.data);
                return new Promise((resolve, reject) => {
                    let loginUser = null;
                    let hasUser = AuthUsers.some(user => {
                        if (user.username === username && user.password === password) {
                            loginUser = JSON.parse(JSON.stringify(user));
                            delete loginUser['password'];
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {status: 'OK', data: loginUser}]);
                    } else {
                        resolve([200, {status: 'FAIL', data: 'User or password not correct'}]);
                    }

                });
            });

    }
};