<template>
    <div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Input  style="width:300px;float:left;margin-right:20px" v-model="name" placeholder="请输入用户名关键字"  search enter-button @on-search="getData()"/>
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
                        <Button type="primary" size="small" style="margin-right: 5px" @click="changeAccountPassword(row.id)">修改密码</Button>
                        <Button type="error" size="small" @click="remove(row.id,row.name)" v-if="row.id>1">删除</Button>
                    </template>
                </Table>
                <div class="ivu-mt ivu-text-center" slot="footer">
                    <Page :current.sync="page" :total="count" :pageSize="pageSize" show-total show-elevator :simple="isMobile" @on-change="getData()"></Page>
                </div>
            </List>
        </Card>
        <Modal v-model="showModel" :title="title" :loading="creating" @on-ok="actionAccount" :transfer="false">
            <Form ref="infoData" :model="infoData" :rules="addRules" :label-width="80">
                <FormItem label="用户名：" prop="name">
                    <Input v-model="infoData.name" placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="账号：" prop="account">
                    <Input v-model="infoData.account" placeholder="请输入账号" />
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="infoData.password" placeholder="请输入密码" />
                </FormItem>
                <FormItem label="电话：" prop="phone">
                    <Input v-model="infoData.phone" placeholder="请输入电话" />
                </FormItem>
                <FormItem label="所属公司：" prop="company_id" v-if="role_id2===1">
                   <Select v-model="infoData.company_id" style="width:200px" placeholder="请选择所属公司">
                        <Option v-for="(item,index) in companyData" :key="index" :value="item.id">{{ item.company_name }}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="角色：" prop="role_id" v-if="role_id2===1">
                    <Select v-model="infoData.role_id" style="width:200px">
                    <Option :value="1">超级管理员</Option>
                    <Option :value="2">企业管理员</Option>
                    <Option :value="3">普通用户</Option>
                    </Select>
                </FormItem>
                <FormItem label="角色：" prop="role_id" v-if="role_id2===2">
                    <Select v-model="infoData.role_id" style="width:200px">
                    <Option :value="2">企业管理员</Option>
                    <Option :value="3">普通用户</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="changeac" title="编辑信息"  @on-ok="cP" :transfer="false">
            <Form ref="changeAccount" :model="infoData" :label-width="80" :rules="addRules">
                <FormItem label="用户名：" prop="name">
                    <Input v-model="infoData.name" placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="账号：" prop="account">
                    <Input v-model="infoData.account" placeholder="请输入账户" />
                </FormItem>
                <FormItem label="电话：" prop="phone">
                    <Input v-model="infoData.phone" placeholder="请输入电话" />
                </FormItem>
                <FormItem label="所属公司：" prop="company_id" v-if="role_id2===1">
                   <Select v-model="infoData.company_id" style="width:200px" placeholder="请选择所属公司">
                        <Option v-for="(item,index) in companyData" :key="index" :value="item.id">{{ item.company_name }}</Option>
                   </Select> 
                </FormItem>
                <FormItem label="角色：" prop="role_id" v-if="role_id2===1">
                    <Select v-model="infoData.role_id" style="width:200px">
                    <Option :value="1">超级管理员</Option>
                    <Option :value="2">企业管理员</Option>
                    <Option :value="3">普通用户</Option>
                    </Select>
                </FormItem>
                <FormItem label="角色：" prop="role_id" v-if="role_id2===2">
                    <Select v-model="infoData.role_id" style="width:200px">
                    <Option :value="2">企业管理员</Option>
                    <Option :value="3">普通用户</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="changepassword" title="修改密码"  @on-ok="cP1" :transfer="false">
            <Form ref="changeAccountPassword" :label-width="80">
                <FormItem label="新密码：" prop="password">
                    <Input v-model="password1" placeholder="请输入新密码" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { accountList, accountAdd,accountDelete, accountUpdate } from '@api/account';
    import { company_infoGet } from '@api/company_info';

    export default {
        name: 'account_list',
        data () {
            return {
                companyData:[],
                role_id2:'',
                company_id2:'',
                id: '',
                password1:'',
                changeac: false,
                changepassword: false,
                data: [],
                loading: false,
                name: '',
                page: 1,
                count: 0,
                pageSize: 10,
                columns: [
                    {
                        show: true,
                        title: '用户ID',
                        key: 'id'
                    },
                    {
                        show: true,
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        show: true,
                        title: '账号',
                        key: 'account'
                    },
                    {
                        show: true,
                        title: '用户电话',
                        key: 'phone'
                    },
                    {
                        show: true,
                        title: '角色',
                        key: 'role_name'
                    },
                    {
                        show: true,
                        title: '所属公司',
                        key: 'company_name'
                    },
                    {
                        show:true,
                        title:'注册时间',
                        key:'register_time',
                        width:180
                    },
                    {
                        show: true,
                        title: '操作',
                        slot: 'action',
                        width: 220
                    }
                ],
                showModel: false,
                title: '',
                infoData: {
                    name: '',
                    account: '',
                    password: '',
                    phone: '',
                    role_id: '',
                    company_id: '',
                    register_time: ''
                },
                addRules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请输入账户', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' }
                    ],
                    company_id: [
                        { required: true, message: '请选择所属公司',}
                    ],
                    role_id: [
                        { required: true, message: '请选择账户角色',}
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
            //获取公司列表
            async getCompany(){
                let res = await company_infoGet();
                if(res.errno === 0) {
                    this.companyData=res.data
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
                let res = await accountList(params);
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
                this.title = '添加账户';
                this.infoData = {
                    name: '',
                    account: '',
                    password: '',
                    phone: '',
                    role_id: '',
                    company_id: ''
                };
                this.showModel = true;
            },
            async actionAccount () {
                console.log(this.infoData)
                this.$refs.infoData.validate(async (valid) => {
                    if (valid) {
                        // 新建
                        if(this.role_id2==2)
                        {
                            this.infoData.company_id = this.company_id2;
                        }
                        let res = await accountAdd(this.infoData);
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
            remove (id, name) {
                this.$Modal.confirm({
                    title: '删除用户',
                    content: '确定删除用户' + name + '吗？',
                    onOk: async () => {
                        let res = await accountDelete({ id: id });
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
                this.infoData=info
                this.changeac = true;
            },
            async cP () {
                    let params = {
                        id: this.infoData.id,
                        name:this.infoData.name,
                        account:this.infoData.account,
                        phone: this.infoData.phone,
                        company_id: this.infoData.company_id,
                        role_id: this.infoData.role_id
                    };
                    console.log(params);
                    let res = await accountUpdate(params);
                    if (res.errno === 0) {
                        this.$Message.success(res.data);
                        this.changeac = false;
                        this.getData()
                    } else {
                        this.$Message.error(res.errmsg);
                    }
            },
            //修改密码
            changeAccountPassword (id) {
                this.id = id;
                this.password1 = '';
                this.changepassword = true;
            },
            async cP1 () {
                    let params = {
                        id: this.id,
                        password: this.password1
                    };
                    let res = await accountUpdate(params);
                    if (res.errno === 0) {
                        this.$Message.success(res.data);
                        this.changepassword = false;
                        this.getData()
                    } else {
                        this.$Message.error(res.errmsg);
                    }
            },
        },
        mounted () {
            this.role_id2=parseInt(sessionStorage.getItem('role_id'));
            this.company_id2=parseInt(sessionStorage.getItem('company_id'));
            this.getCompany();
            this.getData();
        }
    }
</script>
