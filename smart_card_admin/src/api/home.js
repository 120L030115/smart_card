import request from '@/plugins/request';

export function baseinfoCount (data) {
    return request({
        url: '/home/baseinfoCount',
        method: 'get',
        params: data
    });
}

export function list (data) {
    return request({
        url: '/home/list',
        method: 'get',
        params: data
    });
}
