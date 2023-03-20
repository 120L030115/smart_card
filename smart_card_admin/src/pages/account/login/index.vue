<template>
    <div class="page-account">
        <div class="page-account-container">
            <div class="page-account-top">
                <p class="logo_title">智慧名片管理系统</p>
                <!-- <div class="page-account-top-logo">
                    <img src="@/assets/images/logo.png" alt="logo">
                </div> -->
                <!-- <div class="page-account-top-desc">智慧名片管理系统 企业级中台前端/设计解决方案</div> -->
            </div>
            <Login @on-submit="handleSubmit">
                <UserName name="account" />
                <Password name="password" enter-to-submit />
                <!-- <div class="page-account-auto-login">
                    <Checkbox v-model="autoLogin" size="large"><span style="color:#fff">{{ $t('page.login.remember') }}</span></Checkbox>
                </div> -->
                <Submit>{{ $t('page.login.submit') }}</Submit>
            </Login>
        </div>
        <pointwave/>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import mixins from '../mixins';
    import Pointwave from '@/components/Pointwave'

    export default {
        mixins: [ mixins ],
        components: {
            Pointwave
        },
        data () {
            return {
                autoLogin: true
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                let that = this;
                if (valid) {
                    const { account, password } = values;
                    this.login({
                        account,
                        password,
                        that
                    })
                        .then(() => {
                            // 重定向对象不存在则返回顶层路径
                            this.$router.replace(this.$route.query.redirect || '/');
                    });
                }
            }
            // getQueryString (key) {
            //     var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            //     var r = window.location.search.substr(1).match(reg);
            //     if (r != null) return unescape(r[2]);
            //     return null;
            // }
        },
        created () {
            let params = this.$route.query;
            if (params.account && params.password) {
                let that = this;
                this.login({
                    account: params.account,
                    password: params.password,
                    that
                })
                    .then(() => {
                        // 重定向对象不存在则返回顶层路径
                        this.$router.replace(this.$route.query.redirect || '/');
                });
            }
        }
    };
</script>
<style>
.logo_title{
    font-size:25px;
    font-weight: bolder;
    color: #fff;
    padding:0px 20px
}
.page-account{
    display: block
}
.page-account-container{
    width:23%;
    height:350px;
    padding:0% 2.6%;
    border-radius:10px;
    background-color:rgba(255,255,255,0.1);
    box-shadow: inset 0 0 10px #0a54ea;
    position:absolute;
    z-index: 99;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    margin:auto
}
#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
