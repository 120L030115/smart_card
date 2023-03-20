<template>
    <div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Input v-if="role_id2===1" style="width:300px;float:left;margin-right:20px" v-model="name" placeholder="请输入公司名称关键字"  search enter-button @on-search="getData()"/>
            <Button type="primary" icon="md-add" @click="handleOpenAdd" v-if="role_id2===1">新建</Button>
            <br>
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
                        <Button type="error" size="small" @click="remove(row.id,row.company_name)" v-if="row.id>=1">删除</Button>
                    </template>
                </Table>
                <div class="ivu-mt ivu-text-center" slot="footer">
                    <Page :current.sync="page" :total="count" :pageSize="pageSize" show-total show-elevator :simple="isMobile" @on-change="getData()"></Page>
                </div>
            </List>
        </Card>
        <Modal v-model="showModel" :title="title" :loading="creating" @on-ok="actionCompany_info" :transfer="false">
            <Form ref="infoData" :model="infoData" :rules="addRules" :label-width="80">
                <FormItem label="公司名称：" prop="company_name">
                    <Input v-model="infoData.company_name" placeholder="请输入公司名称" />
                </FormItem>
                <FormItem label="公司地址：" prop="address">
                    <Input v-model="infoData.address" placeholder="请输入公司地址" />
                </FormItem>
                <FormItem label="员工数量：" prop="number_of_employees">
                    <Input v-model="infoData.number_of_employees" placeholder="请输入员工数量" />
                </FormItem>
                <FormItem label="客户数量：" prop="number_of_clients">
                    <Input v-model="infoData.number_of_clients" placeholder="请输入客户数量" />
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="changeac" title="编辑信息"  @on-ok="cP" :transfer="false">
            <Form ref="changeAccount" :model="infoData" :label-width="80" :rules="addRules">
                <FormItem label="公司名称：" prop="company_name">
                    <Input v-model="infoData.company_name" placeholder="请输入公司名称" />
                </FormItem>
                <FormItem label="公司地址：" prop="address">
                    <Input v-model="infoData.address" placeholder="请输入公司地址" />
                </FormItem>
                <FormItem label="员工数量：" prop="number_of_employees">
                    <Input v-model="infoData.number_of_employees" placeholder="请输入员工数量" />
                </FormItem>
                <FormItem label="客户数量：" prop="number_of_clients">
                    <Input v-model="infoData.number_of_clients" placeholder="请输入客户数量" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { accountGet } from '@api/account';
    import { company_infoList, company_infoAdd, company_infoDelete, company_infoUpdate } from '@api/company_info';

    export default {
        name: 'account_list',
        data () {
            return {
                accountData:[],
                role_id2:'',
                id: '',
                changeac: false,
                data: [],
                loading: false,
                name: '',
                page: 1,
                count: 0,
                pageSize: 10,
                columns: [
                    {
                        show: true,
                        title: '公司ID',
                        key: 'id'
                    },
                    {
                        show: true,
                        title: '公司名称',
                        key: 'company_name'
                    },
                    {
                        show: true,
                        title: '公司地址',
                        key: 'address'
                    },
                    {
                        show: true,
                        title: '员工数量',
                        key: 'number_of_employees'
                    },
                    {
                        show: true,
                        title: '客户数量',
                        key: 'number_of_clients'
                    },
                    {
                        show: true,
                        title: '添加时间',
                        key: 'add_time'
                    },
                    {
                        show: true,
                        title: '更新时间',
                        key: 'update_time'
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
                    company_name:'',
                    address:'',
                    number_of_employees:'',
                    number_of_clients:''
                },
                addRules: {
                    company_name: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入公司地址', trigger: 'blur' }
                    ],
                    number_of_employees: [
                        { required: true, message: '请输入员工数量', trigger: 'blur' }
                    ],
                    number_of_clients: [
                        { required: true, message: '请输入客户数量', trigger: 'blur' }
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
                let res = await company_infoList(params);
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
                this.title = '添加公司';
                this.infoData = {
                    company_name:'',
                    address:'',
                    number_of_employees:'',
                    number_of_clients:''
                };
                this.showModel = true;
            },
            async actionCompany_info () {
                this.$refs.infoData.validate(async (valid) => {
                    if (valid) {
                        // 新建
                        let res = await company_infoAdd(this.infoData);
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
            remove (id, company_name) {
                this.$Modal.confirm({
                    title: '删除公司',
                    content: '确定删除公司' + company_name + '吗？',
                    onOk: async () => {
                        let res = await company_infoDelete({ id: id });
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
                this.infoData=info;
                this.changeac = true;
            },
            async cP () {
                    let params = {
                        id: this.infoData.id,
                        company_name:this.infoData.company_name,
                        address:this.infoData.address,
                        number_of_employees: this.infoData.number_of_employees,
                        number_of_clients: this.infoData.number_of_clients
                    };
                    let res = await company_infoUpdate(params);
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
            this.role_id2=parseInt(sessionStorage.getItem('role_id'));
            this.getAccount();
            this.getData();
        }
    }
</script>

