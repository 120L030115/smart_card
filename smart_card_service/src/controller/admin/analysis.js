const Base = require('./base.js');

module.exports = class extends Base {
    async homeAction() {
        let opinionData0 = [];
        let opinionData1 = [];
        let opinionDataX=this.getday2();
        let sum_personal = await think.model('personal_info').count('id');
        let sum_company = await think.model('company_info').count('id');
        let sum_forward = await think.model('personal_data').sum('forwarded');
        let sum_saved = await think.model('personal_data').sum('saved');
        for(let i in opinionDataX) {
            let company_count=await think.model('company_info').where({'add_time':['like','%'+opinionDataX[i]+'%']}).count('id');
            opinionData0.push(company_count);
            let personal_count=await think.model('personal_info').where({'add_time':['like','%'+opinionDataX[i]+'%']}).count('id');
            opinionData1.push(personal_count)
        }
        let params = {
            opinionData0:opinionData0,
            opinionData1:opinionData1,
            opinionDataX:opinionDataX,
            sum_personal:sum_personal,
            sum_company:sum_company,
            sum_forward:sum_forward,
            sum_saved:sum_saved
        }
        return this.success(params)
    }

    getday2() {
    var date = new Date();
    var base = Date.parse(date); // 转换为时间戳
    var year = date.getFullYear(); //获取当前年份
    var mon = date.getMonth() + 1; //获取当前月份
    var day = date.getDate(); //获取当前日
    var oneDay = 24 * 3600 *1000
        //var daytime = `${year}${mon >= 10 ? mon : '0' + mon}${day >= 10 ? day : '0' + day}`; //今日时间
        //this.$data.daytime = daytime; // 今日时间赋值给变量
                
    var daytimeArr = []
        for (var i = 1; i < 7 ; i++) { //前七天的时间
            var now = new Date(base -= oneDay);
            var myear = now.getFullYear();
            var month = now.getMonth() + 1;
            var mday = now.getDate()
            daytimeArr.push([myear, month >=10 ?month :'0'+ month, mday>=10?mday:'0'+mday].join('-'))
    }
    daytimeArr = daytimeArr.reverse();
		return daytimeArr
    }
};
