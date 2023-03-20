import request from '@/plugins/request';

export function analysisHome () {
    return request({
        url: '/analysis/home'
    });
}