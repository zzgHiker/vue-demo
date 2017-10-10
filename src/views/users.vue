<style>
    .ivu-table table {
        width: 100% !important;
    }
</style>
<template>
    <div>
        <div>
            <Button style="margin: 10px;" @click="addNewUser">Add New</Button>
        </div>
        <Table border stripe size="small" :columns="columns" :data="data"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total"
                      :current="current"
                      :page-size="pageSize"
                      @on-change="changePageIndex"
                      @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import api from '../api';

    export default {
        data() {
            return {
                current: 1,
                pageSize: 10,

                columns: [
                    {
                        title: '序号',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            let index = parseInt((this.current - 1 ) * this.pageSize) + params.row._index + 1;
                            return h('span', index);
                        }
                    },
                    {
                        title: 'UserName',
                        key: 'username',
                        sortable: true
                    },
                    {
                        title: 'DisplayName',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: 'BirthDay',
                        key: 'birth'
                    },
                    {
                        title: '操作',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeItem(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            };
        },

        computed: {
            data() {
                let start = (this.current - 1) * this.pageSize;
                return this.user.all.slice(start, start + this.pageSize);
            },
            total() {
                return this.user.all.length;
            },
            pageCount() {
                let m = parseInt(this.total % this.pageSize);
                let p = parseInt(this.total / this.pageSize);
                return m > 0 || p === 0 ? p + 1 : p;
            },
            ...mapGetters(['user'])
        },

        mounted() {
            api.user.users()
                .then(data => {
                    this.$store.dispatch('updateUser', data);
                }, error => {
                    this.$Message.error(error);
                });
        },

        methods: {
            changePageIndex(index) {
                this.current = index;
            },

            changePageSize(pageSize) {
                this.pageSize = pageSize;
            },

            addNewUser() {
                this.$store.dispatch('addNewUser')
                    .then(() => {
                        this.current = this.pageCount;
                    });
            },

            removeItem(index) {
                this.$store.dispatch('removeUser', index)
                    .then(() => {
                        if (this.current > this.pageCount) this.current = this.pageCount;
                    });
            }
        }
    };
</script>