const Base = require('./base.js');

module.exports = class extends Base {
    async listAction() {
    let page=this.get('page');
    let search = '%' + this.get('name') + '%';
    let list=await think.model('good')
      .where({'good.name':['like',search]})
      .field('good.*')
      .page(page)
      .countSelect()
    
    return this.success(list)
  }

  async addAction(){
    let params=this.post();
    let res=await think.model('device').add(params);
      if(res){
        return this.success('添加成功')
      }else{
        return this.fail(100,'添加失败')
      }
  }

  async deleteAction(){
    let id=this.get('id')
    let res=await think.model('device').where({id:id}).delete();
    if(res){
      return this.success('删除成功')
    }else{
      return this.fail(100,'删除失败')
    }
  }

  async updateAction(){
    let params=this.post();
    let res=await think.model('device')
        .where({id:params.id})
        .update(params)
    if(res){
      return this.success('更新成功')
    }else{
      return this.fail('更新失败')
    }
  }
  
};
