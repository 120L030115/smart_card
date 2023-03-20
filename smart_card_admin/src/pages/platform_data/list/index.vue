<template>
    <div>
        <br>
        <div class="i-layout-page-header">
            <PageHeader title="运营整体情况" hidden-breadcrumb>
            </PageHeader>
        </div>
        <Row :gutter="0">
            <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>总用户数</span>
                </p>
                <Tag slot="extra" color="green">人</Tag>
                <div>
                    <Numeral :value="this.sum_personal" format="0,0" v-font="30" />
                    <Divider style="margin: 8px 0" />
                </div>
            </Card>
            </Col>

            <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>总公司数</span>
                </p>
                <Tag slot="extra" color="green">个</Tag>
                <div>
                    <Numeral :value="this.sum_company" format="0,0" v-font="30" />
                    <Divider style="margin: 8px 0" />
                </div>
            </Card>
            </Col>
            <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>转发名片数</span>
                </p>
                <Tag slot="extra" color="green">次</Tag>
                <div>
                    <Numeral :value="this.sum_forward" format="0,0" v-font="30" />
                    <Divider style="margin: 8px 0" />
                </div>
            </Card>
            </Col>
            <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>保存名片数</span>
                </p>
                <Tag slot="extra" color="green">次</Tag>
                <div>
                    <Numeral :value="this.sum_saved" format="0,0" v-font="30" />
                    <Divider style="margin: 8px 0" />
                </div>
            </Card>
            </Col>
        </Row>
        <div id="app">
            <!--为echarts准备一个具备大小的容器dom-->
            <div id="main" style=" height: 400px"></div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import {analysisHome} from '@api/analysis';
    export default {
        data () {
            return {
                grid: {
                    xl: 6,
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 24
                },
                charts: "",
                opinionData0: [],//折线上每个点的数据
                opinionData1: [],
                opinionDataX: [],
                sum_personal:'',
                sum_company:'',
                sum_forward:'',
                sum_saved:''
            }
        },
        mounted () {
            this.getData();
        },
        methods: {
            async getData(){
                this.loading = true;
                let res = await analysisHome();
                if (res.errno === 0) {
                    this.opinionData0=res.data.opinionData0;
                    this.opinionData1=res.data.opinionData1;
                    this.opinionDataX=res.data.opinionDataX;
                    this.sum_personal=res.data.sum_personal;
                    this.sum_company=res.data.sum_company;
                    this.sum_forward=res.data.sum_forward;
                    this.sum_saved=res.data.sum_saved;
                    this.drawLine();
                } else {
                    this.$Message['error']({
                        content: res.errmsg,
                        duration: 3
                    });
                };
                this.loading = false;
                },

            drawLine() {
                let charts = echarts.init(document.getElementById('main'));
                charts.setOption({
                    title: {
                    text: '近七日新增情况'
                    },
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                        backgroundColor: '#6a7985'
                        }
                    }
                    },
                    legend: {
                    data: ['新增公司', '新增用户']
                    },
                    toolbox: {
                    },
                    grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                    },
                    xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.opinionDataX
                    }
                    ],
                    yAxis: [
                    {
                        type: 'value'
                    }
                    ],
                    series: [
                    {
                        name: '新增公司',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        smooth: true,
                        emphasis: {
                        focus: 'series'
                        },
                        data: this.opinionData0
                    },
                    {
                        name: '新增用户',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        smooth: true,
                        emphasis: {
                        focus: 'series'
                        },
                        data: this.opinionData1
                    }
                    ]
                });
            }
        },
        
    }
</script>
