import request from '@/plugins/request';

export function companyTotal (data) {
    return request({
        url: '/company_data/companyTotal',
        method: 'get',
        params: data
    });
}

