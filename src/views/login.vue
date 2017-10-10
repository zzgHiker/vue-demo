<style scoped>
    .background, .card-box:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url('../assets/img/bg.jpeg') 0 / cover fixed;
    }

    .card-box {
        padding: 20px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        background: hsla(0, 0%, 100%, .8);
        margin: 180px auto;
        width: 400px;
    }

    .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .title h3 {
        font-size: 18px;
    }
</style>


<template>
    <div class="background">
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
                <Input type="password" size="large" v-model="formLogin.password" placeholder="密码">
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
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

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
                        {type: 'string', min: 5, message: '密码长度不能小于5位', trigger: 'blur'}
                    ]
                }
            };
        },

        computed: {
            ...mapGetters(['loginUser'])
        },

        mounted() {
        },

        methods: {
            submit() {
                this.$refs['formLogin'].validate(valid => {
                    if (valid) {
                        this.$store.dispatch('login',
                            {
                                username: this.formLogin.username,
                                remember: this.formLogin.remember,
                                password: this.formLogin.password
                            }
                        ).then(() => {
                            this.$Message.success('验证成功');
                            this.$router.push('dashboard');
                        }, error => {
                            this.$Message.error(error);
                        });
                    } else {
                        this.$Message.error('验证失败');
                    }
                });
            },

            reset() {
                this.$refs['formLogin'].resetFields();
            }
        }
    };
</script>