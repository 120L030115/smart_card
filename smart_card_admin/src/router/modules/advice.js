import BasicLayout from '@/layouts/basic-layout';

export default {
    path: '/advice',
    component: BasicLayout,
    auth: [0],
    children: [
        {
            path: '/advice/list',
            name: '反馈建议',
            meta: {
                title: '反馈建议'
            },
            component: () => import('@/pages/advice/list')
        }
    ]
};