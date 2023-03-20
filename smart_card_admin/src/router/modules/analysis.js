import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'analysis-';

export default {
    path: '/analysis',
    name: 'analysis',
    redirect: {
        name: `${pre}info-manage`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'company_data',
            name: `${pre}company_data`,
            auth: [0, 1],
            meta: {
                ...meta,
                title: '公司数据'
            },
            component: () => import('@/pages/analysis/company_data')
        }, {
            path: 'personal_data',
            name: `${pre}personal_data`,
            auth: [0, 1],
            meta: {
                ...meta,
                title: '名片数据'
            },
            component: () => import('@/pages/analysis/personal_data')
        }
    ]
};
