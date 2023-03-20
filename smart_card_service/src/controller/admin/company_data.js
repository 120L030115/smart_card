const Base = require('./base.js');

module.exports = class extends Base {
    
    async companyTotalAction() {
        let company_id = this.get('company_id')
        var dataArr = [];
        var data = new Date();
        data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
        for (var i = 0; i < 6; i++) {
            data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
            var m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            dataArr.push(data.getFullYear() + "-" + m);
        }
        let year_month_x = dataArr.reverse();
        let year_month_liked = [];
        let year_month_communicated = [];
        let year_month_saved = [];
        let year_month_forwarded = [];
        for (var i in year_month_x) {
            let likedSum = await think.model('personal_data')
                .join('personal_info on personal_data.personal_id=personal_info.id')
                .join('account on personal_info.account_id=account.id')
                .where({ year_month: year_month_x[i],company_id: company_id })
                .sum('liked');
            if (think.isEmpty(likedSum)) {
                year_month_liked.push(0)
            } else {
                year_month_liked.push(likedSum)
            }
            let communicatedSum = await think.model('personal_data')
                .join('personal_info on personal_data.personal_id=personal_info.id')
                .join('account on personal_info.account_id=account.id')
                .where({ year_month: year_month_x[i], company_id: company_id })
                .sum('communicated');
            if (think.isEmpty(communicatedSum)) {
                year_month_communicated.push(0)
            } else {
                year_month_communicated.push(communicatedSum)
            }
            let savedSum = await think.model('personal_data')
                .join('personal_info on personal_data.personal_id=personal_info.id')
                .join('account on personal_info.account_id=account.id')
                .where({ year_month: year_month_x[i], company_id: company_id })
                .sum('saved');
            if (think.isEmpty(savedSum)) {
                year_month_saved.push(0)
            } else {
                year_month_saved.push(savedSum)
            }

            
            let forwardedSum = await think.model('personal_data')
                .join('personal_info on personal_data.personal_id=personal_info.id')
                .join('account on personal_info.account_id=account.id')
                .where({ year_month: year_month_x[i], company_id: company_id })
                .sum('forwarded');

            if (think.isEmpty(forwardedSum)) {
                year_month_forwarded.push(0)
            } else {
                year_month_forwarded.push(forwardedSum)
            }
           
        }
        let res = {
            year_month_x: year_month_x,
            year_month_liked: year_month_liked,
            year_month_saved: year_month_saved,
            year_month_communicated: year_month_communicated,
            year_month_forwarded: year_month_forwarded
        };
        return this.success(res)
    };
};
