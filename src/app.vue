<style>
    .app {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>

<template>
    <div class="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        mounted() {
            this.$store.dispatch('init');
        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>