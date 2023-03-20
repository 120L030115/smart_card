import BasicLayout from '@/layouts/basic-layout';

export default {
    path: '/company_info',
    component: BasicLayout,
    auth: [0, 1],
    children: [
        {
            path: '/company_info/list',
            name: '公司管理',
            meta: {
                title: '公司管理'
            },
            component: () => import('@/pages/company_info/list')
        }
    ]
};