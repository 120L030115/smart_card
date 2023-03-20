const Base = require('./base.js');

module.exports = class extends Base {
  //登录
  async loginAction(){
    let data=this.post();
    let password=think.md5(data.password);
    let info = await think.model('account')
                .where({ 'account': data.account, 'password':password})
                .find();
    if(think.isEmpty(info)){
        return this.fail(100,'登录失败,请检查账户密码是否正确')
    }else{
        if(info.status==1){
            return this.fail(100,'账号被禁用，请联系管理员')
        };
        const jwt = think.service('jwt');
        let token = jwt.sign_generateToken({
            id: info.id,
            role_id:info.role_id,
            company_id:info.company_id,
            name:info.name
        });
        let data={
            'id':info.id,
            'name':info.name,
            'role_id':info.role_id,
            'company_id':info.company_id,
            'token':token
        }
        return this.success(data);
    }
  }
  async listAction() {
    let page=this.get('page');
    let search = '%' + this.get('name') + '%';
    let role_id = this.account_info.role_id;
    let list=[];
    if(role_id==1){
      list=await think.model('account')
      .join('role on account.role_id=role.id')
      .join('company_info on account.company_id=company_info.id')
      .where({'account.name':['like',search]})
      .field('account.*,role.name role_name,company_info.company_name company_name')
      .page(page)
      .countSelect()
    }else{
      list=await think.model('account')
      .join('role on account.role_id=role.id')
      .join('company_info on account.company_id=company_info.id')
      .where({'account.name':['like',search],'company_info.id':this.account_info.company_id})
      .field('account.*,role.name role_name,company_info.company_name company_name')
      .page(page)
      .countSelect()
    }
    
      return this.success(list)
  }

  async getAction() {
    let list=await think.model('account')
      .field('account.*')
      .select()
      return this.success(list)
  }

  async addAction(){
    let params=this.post();
    params.password=think.md5(params.password);
    let info=await think.model('account')
        .where({account:params.account})
        .find();
    if(think.isEmpty(info)){
      let res=await think.model('account').add(params);
      if(res){
        return this.success('添加成功')
      }else{
        return this.fail(100,'添加失败')
      }
    }else{
      return this.fail(100,'账户已存在')
    }
  }

  async deleteAction(){
    let id=this.get('id')
    let res=await think.model('account').where({id:id}).delete();
    if(res){
      return this.success('删除成功')
    }else{
      return this.fail(100,'删除失败')
    }
  }

  async updateAction(){
    let params=this.post();
    params.password=think.md5(params.password);
    let res=await think.model('account')
        .where({id:params.id})
        .update(params)
    if(res){
      return this.success('更新成功')
    }else{
      return this.fail('更新失败')
    }
  }
  
};
