import BasicLayout from '@/layouts/basic-layout';

export default {
    path: '/account',
    component: BasicLayout,
    auth: [0, 1],
    children: [
        {
            path: '/account/list',
            name: '用户管理',
            meta: {
                title: '用户管理'
            },
            component: () => import('@/pages/account/list')
        }
    ]
};
