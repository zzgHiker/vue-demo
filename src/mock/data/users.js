import Mock from 'mockjs';

const AuthUsers = [
    {
        username: 'admin',
        password: 'admin',
        name: '管理员',
        ticket: Mock.Random.guid()
    },
    {
        username: 'zhangshan',
        password: '123456',
        name: '张三',
        ticket: Mock.Random.guid()
    },
    {
        username: 'lisi',
        password: '123456',
        name: '李四',
        ticket: Mock.Random.guid()
    }
];

const Users = [];

for (let i = 0; i < 100; i++) {
    Users.push({
        id: Mock.mock('@increment'),
        username: Mock.Random.name(),
        name: Mock.Random.cname(),
        birth: Mock.Random.date(),
        sex: Mock.Random.boolean()
    });
}

export {AuthUsers};