<style scoped>
    .card-box {
        padding: 20px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        background-color: #F9FAFC;
        margin: 180px auto;
        width: 400px;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .title h3 {
        font-size: 18px;
    }
</style>


<template>
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
        <FormItem class="title">
            <h3>系统登陆</h3>
        </FormItem>
        <FormItem prop="username">
            <Input size="large" v-model="formLogin.username" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input size="large" v-model="formLogin.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <CheckboxGroup v-model="formLogin.remember">
                <Checkbox label="记住密码"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem>
            <Row>
                <Col :xs="{span: 4, offset: 6}">
                <Button type="primary" @click="submit()">登陆</Button>
                </Col>
                <Col :xs="{span: 4, offset: 6}">
                <Button type="primary" @click="reset()">重置</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        data() {
            return {
                formLogin: {
                    username: '',
                    password: '',
                    remember: []
                },

                formLoginRules: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写登陆密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }
            };
        },

        mounted() {
            this.formLogin.username = JSON.parse(localStorage.getItem('username'));
            this.formLogin.password = JSON.parse(localStorage.getItem('password'));
        },

        methods: {
            submit() {
                this.$refs['formLogin'].validate(valid => {
                    if (valid) {
                        localStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        this.$Message.success('验证成功');

                        setTimeout(() => {
                            this.$router.push('dashboard');
                        }, 500);
                    } else {
                        this.$Message.error('验证失败');
                    }

                    if (valid && this.formLogin.remember.indexOf('记住密码') !== -1) {
                        localStorage.setItem('password', JSON.stringify(this.formLogin.password));
                    } else {
                        localStorage.removeItem('password');
                    }
                });
            },

            reset() {
                this.$refs['formLogin'].resetFields();
            }
        }
    };
</script>