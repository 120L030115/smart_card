<template>
    <div>
        <div class="i-layout-page-header">
            <PageHeader title="实时视频监控" hidden-breadcrumb>
                <div slot="content">
                    <!--  <Avatar class="dashboard-workplace-header-avatar" :src="info.avatar" />

                   <div class="dashboard-workplace-header-tip">
                            <p class="dashboard-workplace-header-tip-title">早安，{{ info.name }}，开始您一天的工作吧！</p>
                            <p class="dashboard-workplace-header-tip-desc">
                                  <Icon type="md-rainy" /> 今日阴转小雨，22℃ - 32℃，出门记得带伞哦。
                            </p>
                   </div>
                -->
                </div>
                <!--
            <div slot="extra" class="dashboard-workplace-header-extra">
                <Row type="flex" justify="center" align="middle" :gutter="12">
                    <Col span="8">
                        <p>
                            <Avatar icon="md-apps" size="small" v-color="'#40a9ff'" v-bg-color="'#e6f7ff'" />
                            <span>项目数</span>
                        </p>
                         <p>12</p>
                    </Col>
                    <Col span="8">
                        <p>
                            <Avatar icon="md-checkbox-outline" size="small" v-color="'#ffa940'" v-bg-color="'#fff7e6'" />
                            <span>待办项</span>
                        </p>
                        <p>
                            <Tooltip placement="top" content="待办：3 / 总计：24">
                                3 / 24
                            </Tooltip>
                        </p>
                    </Col>
                    <Col span="8">
                        <p>
                            <Avatar icon="logo-usd" size="small" v-color="'#73d13d'" v-bg-color="'#f6ffed'" />
                            <span>积分</span>
                        </p>
                        <p>
                            <Numeral :value="1689" format="'0,'" />
                        </p>
                    </Col>
                </Row>
            </div>
                            -->
            </PageHeader>
        </div>
        <Row :gutter="24" class="ivu-mt">
            <Col :xl="16" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="6" class="ivu-mb">
                <div slot="title">
                    <Avatar icon="md-apps" size="small" v-color="'#1890ff'" v-bg-color="'#e6f7ff'" />
                    <span class="ivu-pl-8" size=100>植物图片</span>
                </div>
                <p>
                    <img width="600" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.3gbizhi.com%2F2021%2F0602%2F20210602081407239.jpg&refer=http%3A%2F%2Fpic.3gbizhi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669448632&t=e750ebcc6e3e3cb8789e160271bf40bb">
                </p>
                <!----     <my-apps />
            -->
            </Card>
            <Card :bordered="false" dis-hover>
                <div slot="title">
                    <Avatar icon="md-bulb" size="small" v-color="'#722ed1'" v-bg-color="'#f9f0ff'" />
                    <span class="ivu-pl-8">监控视频</span>
                </div>      <!--
            <feeds />
                  -->
            </Card>
            </Col>
        </Row>
        <vedio controls size="200" src="https://vd3.bdstatic.com/mda-nisaex5qtp3dvc50/hd/cae_h264/1664264008206186153/mda-nisaex5qtp3dvc50.mp4">
        </vedio>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import myApps from './my-apps';
    import shortcut from './shortcut';
    import feeds from './feeds';
    import todo from './todo';
    import member from './member';

    export default {
        name: 'dashboard-workplace',
        components: { myApps, shortcut, feeds, todo, member },
        data () {
            return {

            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ])
        }
    }
</script>
<style lang="less">
    .dashboard-workplace{
        &-header{
            &-avatar{
                width: 64px;
                height: 64px;
                border-radius: 50%;
                margin-right: 16px;
            }
            &-tip{
                display: inline-block;
                vertical-align: middle;
                &-title{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }
                &-desc{
                    color: #808695;
                }
            }
            &-extra{
                .ivu-col{
                    p{
                        text-align: right;
                    }
                    p:first-child{
                        span:first-child{
                            margin-right: 4px;
                        }
                        span:last-child{
                            color: #808695;
                        }
                    }
                    p:last-child{
                        font-size: 22px;
                    }
                }
            }
        }
    }
</style>
