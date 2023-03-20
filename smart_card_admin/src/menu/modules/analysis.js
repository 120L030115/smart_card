const pre = '/analysis/';

export default {
    path: '/analysis',
    title: '统计分析',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-editor',
    icon: 'ios-analytics',
    auth: [0, 1],
    children: [
        {
            path: `${pre}company_data`,
            title: '公司数据'
        }, {
            path: `${pre}personal_data`,
            title: '名片数据'
        }
    ]
}
