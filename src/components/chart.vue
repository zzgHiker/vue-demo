<template>
    <div ref="chart" :style="styleObject"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
            this.setChart();
        },

        beforeDestroy() {
            if (this.chart) {
                window.removeEventListener('resize', this.resize);
                this.chart.dispose();
            }
        },
        props: {
            width: {type: String, default: '100%'},
            height: {type: String, default: '400px'},
            title: {type: String, default: 'Bar Chart'},
            subTitle: {type: String, default: ''},
            options: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            styleObject() {
                return {
                    width: this.width,
                    height: this.height
                };
            }
        },
        methods: {
            initChart() {
                if (!this.chart) {
                    this.chart = echarts.init(this.$refs['chart']);
                    window.addEventListener('resize', this.resize);
                }
            },

            setChart() {
                if (this.options && this.options.series)
                    this.chart.setOption(this.options);
            },

            resize() {
                this.chart && this.chart.resize();
            }
        },

        watch: {
            'options'(nValue) {
                this.chart.setOption(nValue);
            }
        }
    };
</script>