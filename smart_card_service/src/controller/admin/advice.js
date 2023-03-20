const Base = require('./base.js');

module.exports = class extends Base {
 
    async listAction() {
        let page=this.get('page');
        let search = '%' + this.get('name') + '%';
        let list=await think.model('advice')
          .join('status on advice.status_id=status.id')
          .join('account on advice.account_id=account.id')
          .where({'advice.remark':['like',search]})
          .field('advice.*,status.name status_name, account.name name, account.phone phone')
          .page(page)
          .countSelect()
        
        return this.success(list)
      }

    async addAction() {
        let params = this.post();
        let info = await think.model('advice')
            .where({ remark: params.remark })
            .find();
        if (think.isEmpty(info)) {
            let res = await think.model('advice').add(params);
            if (res) {
                return this.success('添加成功')
            } else {
                return this.fail(100, '添加失败')
            }
        } else {
            return this.fail(100, '添加失败，已存在该反馈')
        }
    }

    async deleteAction() {
        let delete_rank = this.get('id')
        let res = await think.model('advice').where({ id:delete_rank }).delete();
        if (res) {
            return this.success('删除成功')
        } else {
            return this.fail(100, '删除失败')
        }
    }

    async updateAction() {
        let params = this.post();
        let res1 = await think.model('advice')
            .where({id: params.id })
           .update(params)
        
        if (res1) {
            return this.success('更新成功')
        } else {
            return this.fail('更新失败')
        }
    }

};
