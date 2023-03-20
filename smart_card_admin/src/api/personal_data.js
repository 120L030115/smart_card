import request from '@/plugins/request';

export function personalTotal (data) {
    return request({
        url: '/personal_data/personalTotal',
        method: 'get',
        params: data
    });
}