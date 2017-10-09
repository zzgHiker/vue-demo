<style>
    .ivu-table table {
        width: 100% !important;
    }
</style>
<template>
    <Table border stripe :columns="columns" :data="data"></Table>
</template>
<script>
    import api from '../api';

    export default {
        data() {
            return {
                columns: [
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
                    }
                ],
                data: []
            };
        },

        mounted() {
            api.user.users()
                .then(data => {
                    this.data = data;
                }, error => {
                    this.$Message.error(error);
                });
        }
    };
</script>