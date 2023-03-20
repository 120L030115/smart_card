const Base = require('./base.js');

module.exports = class extends Base {

    async listAction() {
        let page = this.get('page');
        let search = '%' + this.get('name') + '%';
        let role_id = this.account_info.role_id;
        let list=[];
        if(role_id==1){
            list = await think.model('company_info')
            .where({ 'company_info.company_name': ['like', search] })
            .field('company_info.*')
            .page(page)
            .countSelect()
        }else{
            list = await think.model('company_info')
            .where({ 'company_info.company_name': ['like', search],'company_info.id':this.account_info.company_id})
            .field('company_info.*')
            .page(page)
            .countSelect()
        }
        return this.success(list)
    }

    async getAction() {
        let list = await think.model('company_info')
            .field('company_info.*')
            .select();
        let length = list.length;
        console.log(list[0].longitude);
        for (var i = 0; i < length; i++) {
            list[i]['position'] = [list[i].longitude, list[i].latitude];
        }
        return this.success(list)
    }

    async addAction() {
        let params = this.post();
        let info = await think.model('company_info')
            .where({ company_name: params.company_name })
            .find();
        if (think.isEmpty(info)) {
            let res = await think.model('company_info').add(params);
            if (res) {
                return this.success('添加成功')
            } else {
                return this.fail(100, '添加失败')
            }
        } else {
            return this.fail(100, '添加失败，该公司已存在')
        }
    }

    async deleteAction() {
        let id = this.get('id')
        let res = await think.model('company_info').where({ id: id }).delete();
        if (res) {
            return this.success('删除成功')
        } else {
            return this.fail(100, '删除失败')
        }
    }

    async updateAction() {
        let params = this.post();
        params.password = think.md5(params.password);
        let res = await think.model('company_info')
            .where({ id: params.id })
            .update(params)
        if (res) {
            return this.success('更新成功')
        } else {
            return this.fail('更新失败')
        }
    }

};
