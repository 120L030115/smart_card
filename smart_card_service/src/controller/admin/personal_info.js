const Base = require('./base.js');

module.exports = class extends Base {
    
    async listAction() {
        let page = this.get('page');
        let search = '%' + this.get('name') + '%';
        let role_id = this.account_info.role_id;
        let list=[];
        if(role_id==1){
            list = await think.model('personal_info')
            .join('account on personal_info.account_id=account.id')
            .join('company_info on account.company_id=company_info.id')
            .where({ 'personal_info.name': ['like', search] })
            .field('personal_info.*,company_info.company_name, account.name account_name')
            .page(page)
            .countSelect()
        }else{
            list = await think.model('personal_info')
            .join('account on personal_info.account_id=account.id')
            .join('company_info on account.company_id=company_info.id')
            .where({ 'personal_info.name': ['like', search],'account.company_id':this.account_info.company_id })
            .field('personal_info.*,company_info.company_name, account.name account_name')
            .page(page)
            .countSelect()
        }
        
        return this.success(list)
    }

    async addAction() {
        let params = this.post();
        let info = await think.model('personal_info')
            .where({ id: params.id })
            .find();
        if (think.isEmpty(info)) {
            let res = await think.model('personal_info').add(params);
            if (res) {
                return this.success('添加成功')
            } else {
                return this.fail(100, '添加失败')
            }
        } else {
            return this.fail(100, '添加失败，该名片已存在')
        }
    }

    async getAction() {
        let role_id = this.account_info.role_id;
        let list = [];
        if(role_id == 1){
            list=await think.model('personal_info')
            .field('id,name')
            .select()
        }
        else{
            list=await think.model('personal_info')
            .join('account on personal_info.account_id=account.id')
            .where({'account.company_id':this.account_info.company_id})
            .field('personal_info.id,personal_info.name')
            .select()
        }
          return this.success(list)
    }

    async deleteAction() {
        let delete_id = this.get('id')
        let res = await think.model('personal_info').where({ id: delete_id }).delete();
        if (res) {
            return this.success('删除成功')
        } else {
            return this.fail(100, '删除失败')
        }
    }

    async updateAction() {
        let params = this.post();
        let res = await think.model('personal_info')
            .where({ id: params.id })
            .update(params)
        if (res) {
            return this.success('更新成功')
        } else {
            return this.fail('更新失败')
        }
    }

};
