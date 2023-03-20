
    module.exports = class extends think.Controller {
      async __before() {
        let host_url = this.ctx.url;
        if(host_url==='/admin/account/login') {
            console.log('pass host')
        }else {
            let token = this.header('authorization');
            const jwt = think.service('jwt');
            if (token) {
                let data = await jwt.parseToken(token);
                if (!data.is_err) {
                    this.account_info=data;
                } else {
                    return this.fail(99,'token已过期,请重新登录');
                }
            }else {
                return this.fail(99,'token不存在，请重新登录')
            }
        }
      }
    };

