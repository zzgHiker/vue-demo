<style></style>
<template>
    <Table border :columns="columns" :data="data"></Table>
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