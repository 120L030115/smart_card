import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};
const pre = '/dashboard';
// const pre = 'dashboard-';

export default {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {
        name: `主页`
    },
    meta,
    component: BasicLayout,
    auth: [0, 1],
    children: [
        {
            path: 'console',
            name: `主页`,
            meta: {
                ...meta,
                title: '主页',
                closable: false
            },
            component: () => import('@/pages/dashboard/console')
        },
        {
            path: 'workplace',
            name: `${pre}workplace`,
            meta: {
                ...meta,
                title: '实时视频监控'
            },
            component: () => import('@/pages/dashboard/workplace')
        }
    ]
};
