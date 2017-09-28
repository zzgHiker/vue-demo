<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-logo-left {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #464c5b;
        padding: 15px auto;
        text-align: center;
        vertical-align: middle;
    }

    .layout-header {
        height: 60px;
        background: #464c5b;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
        color: white;
    }

    .layout-header .ivu-btn {
        line-height: 60px;
    }

    .layout-header .ivu-btn-text {
        color: lightgray;
    }

    .layout-header .ivu-btn-text:hover {
        color: white;
    }

    .layout-content {
        min-height: 200px;
        margin-top: 15px;
        margin-left: 15px;
        margin-right: 15px;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .logo-sm {
        display: none;
    }

    .side-mini .ivu-menu-item {
        text-align: center;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }

    .user-info {
        display: inline-block;
        float: right;
        line-height: 60px;
        margin-right: 25px;
    }

    .ivu-avatar {
        vertical-align: middle;
    }
</style>

<template>
    <div class="layout" :class="{'side-mini': toggleState}">
        <Row type="flex">
            <Col :span="spanLeft">
            <div class="layout-logo-left">
                <span v-if="toggleState"><b>A</b>LT</span>
                <span v-else><b>Admin</b>LTE</span>
            </div>
            </Col>

            <Col :span="spanRight">
            <div class="layout-header">
                <Button type="text" @click="toggle">
                    <Icon type="navicon" size="32"></Icon>
                </Button>

                <div class="user-info">
                    <Dropdown placement="bottom-end">
						<span>
							asdfa
							<Avatar icon="person"></Avatar>
							<Icon type="arrow-down-b" color="lightgray"></Icon>
						</span>

                        <Dropdown-menu slot="list">
                            <DropdownItem @click.native="modifyPassword">
                                <Icon type="key"></Icon>
                                <span>修改密码</span>
                            </DropdownItem>
                            <DropdownItem divided @click.native="logout">
                                <Icon type="log-out" color="red"></Icon>
                                <span>退出</span>
                            </DropdownItem>
                        </Dropdown-menu>
                    </Dropdown>
                </div>
            </div>
            </Col>
        </Row>
        <Row type="flex" class="main">
            <Col :span="spanLeft" class="layout-menu-left">
            <Menu theme="dark" width="auto">
                <MenuItem name="1">
                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                    <span class="layout-text" v-if="!toggleState">选项 1</span>
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                    <span class="layout-text" v-if="!toggleState">选项 2</span>
                </MenuItem>
            </Menu>
            </Col>
            <Col :span="spanRight">
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem href="#">首页</BreadcrumbItem>
                    <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                    <BreadcrumbItem>某应用</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">内容区域</div>

            </div>
            <div class="layout-copy">
                2017-2018 &copy; Delta
            </div>
            </Col>
        </Row>


        <Modal v-model="modal1" title="修改密码" @on-ok.prevent="comfirm" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="原密码" prop="oldPassword">
                    <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="confirmPassword">
                    <Input v-model="formValidate.confirmPassword" placeholder="请再次输入新密码"></Input>
                </FormItem>
            </Form>
        </Modal>


        <BackTop></BackTop>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                toggleState: false,
                modal1: false,
                formValidate: {
                    oldPassword: '1',
                    newPassword: '2',
                    confirmPassword: '3'
                },
                ruleValidate: {
                    oldPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                }
            };
        },
        computed: {
            spanLeft() {
                return this.toggleState ? 2 : 5;
            },
            spanRight() {
                return this.toggleState ? 22 : 19;
            },
            iconSize() {
                return this.toggleState ? 24 : 14;
            }

        },
        methods: {
            toggle() {
                this.toggleState = !this.toggleState;
            },

            modifyPassword() {
                this.modal1 = true;
            },

            comfirm() {
                return false;
            },
            cancel() {
                this.modal1 = false;
                this.$Message.info('点击了取消');
            },
            logout() {
                this.$router.push('login');
            }
        }
    };
</script>