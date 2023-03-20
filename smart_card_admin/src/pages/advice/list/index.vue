<template>
    <div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Input  style="width:300px;float:left;margin-right:20px" v-model="name" placeholder="请输入反馈内容关键字"  search enter-button @on-search="getData()"/>
            <Button type="primary" icon="md-add" @click="handleOpenAdd">新建</Button>
            <div class="ivu-inline-block ivu-fr">
                <Dropdown trigger="click">
                    <Tooltip class="ivu-ml" content="列设置" placement="top">
                        <i-link>
                            <Icon type="md-options" />
                        </i-link>
                    </Tooltip>
                    <DropdownMenu slot="list">
                        <div class="ivu-p-8">
                            <Row>
                                <Col span="12">列展示</Col>
                                <Col span="12" class="ivu-text-right">
                                    <i-link link-color @click.native="handleResetColumn">重置</i-link>
                                </Col>
                            </Row>
                        </div>
                        <Divider size="small" class="ivu-mt-8 ivu-mb-8" />
                        <li class="ivu-dropdown-item" v-for="item in columns" :key="item.title"  @click="item.show = !item.show">
                            <Checkbox v-model="item.show"></Checkbox>
                            <span>{{ item.title }}</span>
                        </li>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <List item-layout="vertical" style="margin-top:20px">
                <Table  :columns="tableColumns" border :data="data" :loading="loading">
                    <template slot-scope="{ row }" slot="area">
                        {{row.province}}{{row.city}}{{row.county}}
                    </template>
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="changeAccount(row)">编辑</Button>
                        <Button type="error" size="small" @click="remove(row.id)" v-if="row.id>=1">删除</Button>
                    </template>
                </Table>
                <div class="ivu-mt ivu-text-center" slot="footer">
                    <Page :current.sync="page" :total="count" :pageSize="pageSize" show-total show-elevator :simple="isMobile" @on-change="getData()"></Page>
                </div>
            </List>
        </Card>
        <Modal v-model="showModel" :title="title" :loading="creating" @on-ok="actionAccount" :transfer="false">
            <Form ref="infoData" :model="infoData" :rules="addRules" :label-width="80">
                <FormItem label="用户：" prop="account_id">
                   <Select v-model="infoData.account_id" style="width:200px" placeholder="请选择用户">
                        <Option v-for="(item,index) in accountData" :key="index" :value="item.id">{{ item.name }}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="反馈内容：" prop="remark">
                    <Input v-model="infoData.remark" placeholder="请输入反馈内容" />
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="changeac" title="编辑信息"  @on-ok="cP" :transfer="false">
            <Form ref="changeAccount" :model="infoData" :rules="addRules" :label-width="80">
                <FormItem label="用户：" prop="account_id">
                   <Select v-model="infoData.account_id" style="width:200px" placeholder="请选择用户">
                        <Option v-for="(item,index) in accountData" :key="index" :value="item.id">{{ item.name }}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="反馈内容：" prop="remark">
                    <Input v-model="infoData.remark" placeholder="请输入反馈内容" />
                </FormItem>
                <FormItem label="处理状态：" prop="status_id">
                    <Select v-model="infoData.status_id" style="width:200px">
                    <Option :value="1">待回复</Option>
                    <Option :value="2">已回复</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { adviceList, adviceAdd, adviceDelete, adviceUpdate } from '@api/advice';
    import { accountGet } from '@api/account';
    export default {
        name: 'account_list',
        data () {
            return {
                accountData:[],
                id: '',
                name:'',
                changeac: false,
                data: [],
                loading: false,
                page: 1,
                count: 0,
                pageSize: 10,
                columns: [
                {
                        show: true,
                        title: '反馈ID',
                        key: 'id'
                    },
                    {
                        show: true,
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        show: true,
                        title: '用户电话',
                        key: 'phone'
                    },
                    {
                        show: true,
                        title: '反馈内容',
                        key: 'remark'
                    },
                    {
                        show: true,
                        title: '反馈时间',
                        key: 'time',
                        width:180
                    },
                    {
                        show: true,
                        title: '处理状态',
                        key: 'status_name'
                    },
                    {
                        show: true,
                        title: '操作',
                        slot: 'action',
                        width: 180
                    }
                ],
                showModel: false,
                title: '',
                infoData: {
                    id:'',
                    account:'',
                    remark:'',
                    status_id:''
                },
                addRules: {
                    account_id: [
                        { required: true, message: '请选择用户'}
                    ],
                    remark: [
                        { required: true, message: '请输入反馈内容', trigger: 'blur' }
                    ],
                    status_id: [
                        { required: true, message: '请输入密码'}
                    ]
                },
                creating: true
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ]),
            // 动态设置列
            tableColumns () {
                const columns = [...this.columns];
                return columns.filter(item => item.show);
            }
        },
        methods: {
            //获取用户列表
            async getAccount(){
                let res = await accountGet();
                if(res.errno === 0) {
                    this.accountData=res.data
                }else {
                    this.$Message['error']({
                        content: res.errmsg,
                        duration: 3
                    });
                }
            },
            // 列表
            async getData () {
                this.loading = true;
                let params = {
                    page: this.page,
                    name: this.name
                };
                let res = await adviceList(params);
                if (res.errno === 0) {
                    let data = res.data.data;
                    for (var i in data) {
                        if (data[i].status === 0) {
                            data[i].status = true
                        } else {
                            data[i].status = false
                        };
                    };
                    this.data = data;
                    this.count = res.data.count;
                    this.pageSize = res.data.pageSize;
                } else {
                    this.$Message['error']({
                        content: res.errmsg,
                        duration: 3
                    });
                };
                this.loading = false;
            },
            // 添加
            handleOpenAdd () {
                this.title = '添加反馈建议';
                this.infoData = {
                    id:'',
                    account:'',
                    remark:'',
                    status_id:''
                };
                this.showModel = true;
            },
            async actionAccount () {
                this.$refs.infoData.validate(async (valid) => {
                    if (valid) {
                        // 新建
                        let res = await adviceAdd(this.infoData);
                        if (res.errno === 0) {
                            this.$Message.success(res.data);
                            this.showModel = false;
                            this.getData()
                        } else {
                            this.$Message.error(res.errmsg);
                        }
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    } else {
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    }
                });
            },
            // 删除
            remove (id) {
                this.$Modal.confirm({
                    title: '删除反馈',
                    content: '确定删除反馈' + id + '吗？',
                    onOk: async () => {
                        let res = await adviceDelete({ id: id });
                        if (res.errno === 0) {
                            this.$Message.success(res.data);
                            this.getData()
                        } else {
                            this.$Message.error(res.errmsg);
                        }
                    }
                });
            },
            // 重置表格列设置
            handleResetColumn () {
                this.columns = this.columns.map(item => {
                    const newItem = item;
                    newItem.show = true;
                    return newItem;
                });
            },
            // 修改账户
            changeAccount (info) {
                this.infoData = info;
                this.changeac = true;
            },
            async cP () {
                    let params = {
                        id: this.infoData.id,
                        account_id:this.infoData.account_id,
                        remark: this.infoData.remark,
                        status_id: this.infoData.status_id
                    };
                    let res = await adviceUpdate(params);
                    if (res.errno === 0) {
                        this.$Message.success(res.data);
                        this.changeac = false;
                        this.getData()
                    } else {
                        this.$Message.error(res.errmsg);
                    }
            }
        },
        mounted () {
            this.getAccount();
            this.getData();
        }
    }
</script>
