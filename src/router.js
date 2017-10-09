const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/dashboard',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/dashboard.vue'], resolve),
        children: [
            {
                path: '',
                component: (resolve) => require(['./views/users.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];
export default routers;