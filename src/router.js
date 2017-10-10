const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/dashboard',
        meta: {
            title: 'Dashboard'
        },
        component: (resolve) => require(['./views/dashboard.vue'], resolve),
        children: [
            {
                path: '',
                meta: {
                    title: '用户列表'
                },
                component: (resolve) => require(['./views/users.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: '用户登陆'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];
export default routers;