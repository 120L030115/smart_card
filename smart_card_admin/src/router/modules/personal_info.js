import BasicLayout from '@/layouts/basic-layout';

export default {
    path: '/personal_info',
    component: BasicLayout,
    auth: [0, 1],
    children: [
        {
            path: '/personal_info/list',
            name: '名片管理',
            meta: {
                title: '名片管理'
            },
            component: () => import('@/pages/personal_info/list')
        }
    ]
};