import BasicLayout from '@/layouts/basic-layout';

export default {
    path: '/platform_data',
    component: BasicLayout,
    auth: [0],
    children: [
        {
            path: '/platform_data/list',
            name: '平台数据',
            meta: {
                title: '平台数据'
            },
            component: () => import('@/pages/platform_data/list')
        }
    ]
}